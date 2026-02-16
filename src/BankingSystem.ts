// 🏦 Banking System
// 🏧 Create a system where users can create accounts, deposit, withdraw, and check their balance.
//
// 1. Implement a function `createAccount` that adds a new account to the `accounts` array. It should return a `BankAccount` object.
// 2. Implement a function `processTransaction` that allows deposits and withdrawals and stores them in the transactions array. It should return a string.
// 3. Implement a function `getBalance` that returns the balance of a given account number.
// 4. Implement a function `getTransactionHistory` that returns the list of transactions for an account.
// 5. Implement a function `checkActiveStatus` that returns the active status of an account number.
// 6. Implement a function `closeAccount` that removes an account from the array and returns a confirmation string.

enum TransactionType {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
}

type Transaction = {
  accountNo: number;
  amount: number;
  type: TransactionType;
};

type BankAccount = {
  accountNo: number;
  firstname: string;
  lastname: string;
  balance: number;
  isActive: boolean;
  transactions: Transaction[];
};

const accounts: BankAccount[] = [];

function findAccount(accountNo: number): BankAccount | undefined {
  return accounts.find((acc) => acc.accountNo === accountNo);
}

function createAccount(
  accountNo: number,
  firstname: string,
  lastname: string,
  initialDeposit: number,
  isActive: boolean = true,
): BankAccount | string {
  if (initialDeposit < 0) {
    return 'Initial deposit cannot be negative.';
  }

  const newAccount: BankAccount = {
    accountNo,
    firstname,
    lastname,
    balance: initialDeposit,
    isActive,
    transactions: [],
  };

  accounts.push(newAccount);
  return newAccount;
}

function processTransaction(
  accountNo: number,
  amount: number,
  transactionType: TransactionType,
): string {
  const account = findAccount(accountNo);
  if (!account) return `Account number ${accountNo} not found.`;
  if (!account.isActive) return `Account number ${accountNo} is closed.`;
  if (amount <= 0) return 'The amount must be greater than 0.';

  const tt: Transaction = {
    accountNo,
    amount,
    type: transactionType,
  };

  if (transactionType === TransactionType.Deposit) {
    account.balance += amount;
    account.transactions.push(tt);
    return `${amount} deposited into account number ${accountNo}`;
  }

  if (amount > account.balance) {
    return 'Insufficient funds for withdrawal.';
  }

  account.balance -= amount;
  account.transactions.push(tt);
  return `${amount} withdrawn from account number ${accountNo}`;
}

function getBalance(accountNo: number): number | string {
  const account = findAccount(accountNo);
  if (!account) return 'Account not found.';
  return account.balance;
}

function getTransactionHistory(accountNo: number): string | Transaction[] {
  const account = findAccount(accountNo);
  if (!account) return 'Account not found.';
  return account.transactions;
}

function checkActiveStatus(accountNo: number): boolean | string {
  const account = findAccount(accountNo);
  if (!account) return 'Account not found.';
  return account.isActive;
}

function closeAccount(accountNo: number) {
  const account = findAccount(accountNo);
  if (!account) return `Account number ${accountNo} not found.`;
  if (!account.isActive) return `Account ${accountNo} is already closed.`;

  account.isActive = false;
  return `The account number ${accountNo} closed.`;
}

// Test cases (students should add more)
console.log(createAccount(1, 'John', 'Smith', 100)); // { accountNo: 1, firstname: "John", lastname: "Smith", balance: 100, isActive: true, transactions: [] }
console.log(processTransaction(1, 50, TransactionType.Deposit)); // "50 deposited into account number 1"
console.log(processTransaction(1, 20, TransactionType.Withdraw)); // "20 withdrawn from account number 1"
console.log(processTransaction(1, 500, TransactionType.Withdraw)); // "Insufficient funds for withdrawal"
console.log(getBalance(1)); // 130
console.log(getTransactionHistory(1)); // [{ accountNo: 1, amount: 50, type: TransactionType.Deposit }, { accountNo: 1, amount: 20, type: TransactionType.Withdraw }]
console.log(checkActiveStatus(1)); // true
console.log(closeAccount(1)); // "Account number 1 closed"

console.log(createAccount(2, 'Joey', 'Tribbiani', 500));
console.log(processTransaction(2, 0, TransactionType.Deposit));
console.log(processTransaction(2, 198, TransactionType.Withdraw));
console.log(processTransaction(2, 515, TransactionType.Deposit));
console.log(processTransaction(2, 325, TransactionType.Deposit));
console.log(processTransaction(2, 640, TransactionType.Withdraw));
console.log(getBalance(2));
console.log(getTransactionHistory(2));
console.log(checkActiveStatus(2));
console.log(closeAccount(2));
