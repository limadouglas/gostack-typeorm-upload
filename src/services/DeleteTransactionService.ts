// import AppError from '../errors/AppError';

import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.find({ id });
    if (!transaction) {
      throw new AppError('transaction does not exist.');
    }
    await transactionRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
