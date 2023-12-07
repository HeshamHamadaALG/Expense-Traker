import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
  id: string;
  item: string;
  category: string;
  cost: number;
  date: string;
  notes: string;
}

export interface TransactionState {
  TransactionItems: Transaction[];
  FilteredTransactions: Transaction[];
  Balance: number;
  InCome: number;
  OutCome: number;
  MonthlyBudget: number;
}

const initialState: TransactionState = {
  TransactionItems: [],
  FilteredTransactions: [],
  Balance: 0,
  InCome: 0,
  OutCome: 0,
  MonthlyBudget: 0,
};

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransactionItem: (state, action: PayloadAction<Transaction>) => {
      state.TransactionItems.unshift(action.payload);
      state.FilteredTransactions.unshift(action.payload);
    },
    deleteTransactionItem: (state, action: PayloadAction<Transaction>) => {
      state.TransactionItems = state.TransactionItems.filter(
        (obj) => obj.id !== action.payload.id
      );
      state.FilteredTransactions = state.FilteredTransactions.filter(
        (obj) => obj.id !== action.payload.id
      );
    },
    getTotalBalance: (state) => {
      state.Balance = state.FilteredTransactions.reduce(
        (incrementor, transaction) => incrementor + transaction.cost,
        0
      );
    },
    getTotalInCome: (state) => {
      state.InCome = state.FilteredTransactions.reduce(
        (incrementor, transaction) =>
          transaction.cost > 0 ? incrementor + transaction.cost : incrementor,
        0
      );
    },
    getTotalOutCome: (state) => {
      state.OutCome = state.FilteredTransactions.reduce(
        (decrementor, transaction) =>
          transaction.cost < 0 ? decrementor + transaction.cost : decrementor,
        0
      );
    },
    setFilteredTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.FilteredTransactions = action.payload;
    },
    resetFilters: (state) => {
      state.FilteredTransactions = state.TransactionItems;
    },
    setMonthlyBudget: (state, action: PayloadAction<number>) => {
      state.MonthlyBudget = action.payload;
    }
  },
});

export const {
  addTransactionItem,
  deleteTransactionItem,
  getTotalBalance,
  getTotalInCome,
  getTotalOutCome,
  setFilteredTransactions,
  resetFilters,
  setMonthlyBudget,
} = TransactionSlice.actions;
export default TransactionSlice.reducer;
