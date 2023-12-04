import { configureStore } from '@reduxjs/toolkit';
import TransactionReducer from './Reducers/TransactionSlice';
import CategoriesReducer from './Reducers/CategoriesSlice';


export const store = configureStore({
  reducer: {
    transaction: TransactionReducer,
    categories: CategoriesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;