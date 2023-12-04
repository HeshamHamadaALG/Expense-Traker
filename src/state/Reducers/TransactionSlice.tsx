import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
    id: string;
    item: string;
    category: string;
    cost: number;
    date: string;
    notes: string;
};

export interface TransactionState {
    TransactionItems: Transaction[];
};

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
};

export const TransactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        addTransactionItem: (state, action: PayloadAction<Transaction> ) => {
            state.TransactionItems.unshift(action.payload);
        },
        deleteTransactionItem: (state, action: PayloadAction<Transaction> ) => {
            state.TransactionItems = state.TransactionItems.filter(obj => obj.id !== action.payload.id);
        },
    },
});

export const { addTransactionItem, deleteTransactionItem } = TransactionSlice.actions;
export default TransactionSlice.reducer;
