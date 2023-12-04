import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  value: string;
  text: string;
}

export interface CategoriesState {
  Categories: Category[];
}

const initialState: CategoriesState = {
  Categories: [
    { value: "Groceries", text: "Groceries" },
    { value: "Transportation", text: "Transportation" },
    { value: "Entertainment", text: "Entertainment" },
  ],
};
export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.Categories.unshift(action.payload);
    },
  },
});

export const { addCategory } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
