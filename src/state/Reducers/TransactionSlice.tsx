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
  Balance: number;
  InCome: number;
  OutCome: number;
}

const initialState: TransactionState = {
  TransactionItems: [
    {
      id: "1",
      item: "Tomato",
      category: "Food",
      cost: -12,
      date: "03/12/2023",
      notes: "Any notes",
    },
    {
      id: "2",
      item: "Salary",
      category: "Job",
      cost: 500,
      date: "03/11/2023",
      notes: "Any notes",
    },
    {
      id: "3",
      item: "Mobile case",
      category: "Tech",
      cost: -200,
      date: "03/12/2023",
      notes: "Any notes",
    },
    {
      id: "4",
      item: "Mobile case",
      category: "Ttech",
      cost: -200,
      date: "03/11/2023",
      notes: "Any notes",
    },
  ],
  Balance: 0,
  InCome: 0,
  OutCome: 0,
};

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransactionItem: (state, action: PayloadAction<Transaction>) => {
      state.TransactionItems.unshift(action.payload);
    },
    deleteTransactionItem: (state, action: PayloadAction<Transaction>) => {
      state.TransactionItems = state.TransactionItems.filter(
        (obj) => obj.id !== action.payload.id
      );
    },
    getTotalBalance: (state) => {
      state.Balance = state.TransactionItems.reduce(
        (incrementor, transaction) => incrementor + transaction.cost,
        0
      );
    },
    getTotalInCome: (state) => {
      state.InCome = state.TransactionItems.reduce(
        (incrementor, transaction) =>
          transaction.cost > 0 ? incrementor + transaction.cost : incrementor,
        0
      );
    },
    getTotalOutCome: (state) => {
      state.OutCome = state.TransactionItems.reduce(
        (decrementor, transaction) =>
          transaction.cost < 0 ? decrementor + transaction.cost : decrementor,
        0
      );
    },
  },
});

export const {
  addTransactionItem,
  deleteTransactionItem,
  getTotalBalance,
  getTotalInCome,
  getTotalOutCome,
} = TransactionSlice.actions;
export default TransactionSlice.reducer;
