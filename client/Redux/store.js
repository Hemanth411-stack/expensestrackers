import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../Redux/slices/transactionSlice';
import themeReducer from "../Redux/slices/themeSlice"
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    transactions: transactionReducer,
  },
});