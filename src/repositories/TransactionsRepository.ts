/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find();

    const income = this.balance(transactions, 'income');
    const outcome = this.balance(transactions, 'outcome');

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  private balance(
    transactions: Transaction[],
    type: 'income' | 'outcome',
  ): number {
    const totalBalance = transactions.reduce((total, transaction) => {
      // eslint-disable-next-line no-param-reassign
      return transaction.type === type
        ? (total += Number(transaction.value))
        : total;
    }, 0);
    return totalBalance;
  }
}

export default TransactionsRepository;
