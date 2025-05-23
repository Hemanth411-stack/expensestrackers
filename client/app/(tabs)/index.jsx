import React, { useEffect } from 'react';
import { ScrollView, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import DateBalance from "../../components/DateBalance";
import IncomeExpenseCards from "../../components/IncomeExpenseCards";
import ExpenseBreakdown from "../../components/ExpenseBreakdown";
import RecentTransactions from "../../components/RecentTransactions";
import MonthlyTrend from "../../components/MonthlyTrend";
import { fetchTransactions } from '../../Redux/slices/transactionSlice'; 

const App = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.transactions);
  
 
  useEffect(() => {
    const currentDate = new Date();
    dispatch(fetchTransactions({
      month: currentDate.getMonth() + 1, 
      year: currentDate.getFullYear()
    }));
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <Header/>
      <DateBalance />
      <IncomeExpenseCards/>
      <ExpenseBreakdown/>
      
      
      {status === 'loading' ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          <MonthlyTrend/>
          <RecentTransactions showHeader={true} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200, 
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#FEE2E2',
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
  },
});

export default App;
