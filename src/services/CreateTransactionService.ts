import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

const { uuid } = require("uuidv4");

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(title : string, value: number, type: 'income'| 'outcome'): Transaction {
    const balance  = this.transactionsRepository.getBalance();
    if(type ==='outcome' && value > balance.total){
      throw Error('transaction without a valid balance');
    }
    const transaction = this.transactionsRepository.create( {
      id: uuid(),title, value, type
    })
    return transaction;
  }
}

export default CreateTransactionService;
