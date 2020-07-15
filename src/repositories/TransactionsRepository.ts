import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): {transactions: Transaction[], balance: Balance} {
    const transactions = {
      transactions: [...this.transactions],
      balance: {...this.getBalance()}
    }
    return transactions;
  }

  public getBalance(): Balance {
    let outcome =   this.transactions.filter(transation => transation.type === 'outcome')
    .map(transation => transation.value).reduce( (sum, current) => sum + current, 0 );
    let income =   this.transactions.filter(transation => transation.type === 'income')
    .map(transation => transation.value).reduce( (sum, current) => sum + current, 0 );

    const balance: Balance = {
      income, outcome, total: income - outcome
    };
    return balance;
  }

  public create(transaction: Transaction): Transaction {
   this.transactions.push(transaction)
   return transaction;
  }
}

export default TransactionsRepository;
