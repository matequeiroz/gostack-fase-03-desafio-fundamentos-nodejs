import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let totalIncome = 0;
    let totaloutcome = 0;

    this.transactions.map(transaction => {
      transaction.type === 'income'
        ? (totalIncome += transaction.value)
        : (totaloutcome += transaction.value);
    });

    const balance: Balance = {
      income: totalIncome,
      outcome: totaloutcome,
      total: totalIncome - totaloutcome,
    };

    return balance;
  }

  public getTotalAvailable(): number {
    const { total } = this.getBalance();
    return total;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
