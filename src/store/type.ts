// KEY PERFORMANCE INDICATORS

interface ExpensesByCategoty {
  [index: string]: number;
}

export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  operationalExpenses: number;
  nonOperationalExpenses: number;
}
interface Day {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
}

export interface GetKpisResponse {
  _id: string;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategoty;
  monthlyData: Month[];
  dailyData: Day[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// PRODUCTS

export interface GetProductsResponse {
  id: string;
  _id: string;
  __v: number;
  price: number;
  expense: number;
  transactionIds: string[];
  createdAt: string;
  updatedAt: string;
}

// TRANSACTIONS

export interface GetTransactionsResponse {
  id: string;
  _id: string;
  __v: number;
  buyer: string;
  amount: number;
  productIds: string[];
  createdAt: string;
  updatedAt: string;
}
