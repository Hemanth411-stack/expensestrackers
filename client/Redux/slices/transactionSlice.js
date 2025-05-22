import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Platform } from 'react-native';

const API_BASE = Platform.select({
  web: 'https://expensestracker-5.onrender.com/api',
  default: 'http://192.168.10.52:5000/api'
});

const monthNumberToName = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const monthName = typeof month === 'number' ? monthNumberToName[month] : month;
      const response = await axios.get(`${API_BASE}/transactions`, {
        params: { month: monthName, year }
      });
      return {
        transactions: response.data.transactions || [],
        summary: response.data.summary || {
          totalIncome: 0,
          totalExpenses: 0,
          balance: 0
        }
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: 'Network Error' });
    }
  }
);

export const addNewTransaction = createAsyncThunk(
  'transactions/addNewTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/transactions`, transactionData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: 'Failed to add transaction' });
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/transactions/${transactionId}`);
      return transactionId;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: 'Failed to delete transaction' });
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    summary: {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0
    },
    status: 'idle',
    error: null
  },
  reducers: {
    resetTransactions: (state) => {
      state.transactions = [];
      state.summary = {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload.transactions;
        state.summary = action.payload.summary;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.error || 'Failed to fetch transactions';
      })
      .addCase(addNewTransaction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewTransaction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = [action.payload, ...state.transactions];
        
        // Update summary
        if (action.payload.type === 'income') {
          state.summary.totalIncome += action.payload.amount;
        } else {
          state.summary.totalExpenses += action.payload.amount;
        }
        state.summary.balance = state.summary.totalIncome - state.summary.totalExpenses;
      })
      .addCase(addNewTransaction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.error || 'Failed to add transaction';
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const deletedTransaction = state.transactions.find(t => t._id === action.payload);
        
        if (deletedTransaction) {
          if (deletedTransaction.type === 'income') {
            state.summary.totalIncome -= deletedTransaction.amount;
          } else {
            state.summary.totalExpenses -= deletedTransaction.amount;
          }
          state.summary.balance = state.summary.totalIncome - state.summary.totalExpenses;
          state.transactions = state.transactions.filter(t => t._id !== action.payload);
        }
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.error || 'Failed to delete transaction';
      });
  }
});

export const { resetTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;