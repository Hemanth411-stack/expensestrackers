import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const IncomeExpenseCards = () => {
  // Get summary data from Redux store
  const { summary } = useSelector(state => state.transactions);
  
  // Use actual values from Redux or fallback to 0
  const totalIncome = summary?.totalIncome || 0;
  const totalExpense = summary?.totalExpenses || 0;

  return (
    <View style={styles.container}>
      {/* Income Card */}
      <View style={[styles.card, styles.incomeCard]}>
        <Text style={styles.label}>Income</Text>
        <Text style={styles.incomeAmount}>{totalIncome.toFixed(2)}</Text>
      </View>

      {/* Expense Card */}
      <View style={[styles.card, styles.expenseCard]}>
        <Text style={styles.label}>Expenses</Text>
        <Text style={styles.expenseAmount}>{totalExpense.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 16,
    gap: 15,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  incomeCard: {
    backgroundColor: '#f0fdf4', // Light green background
  },
  expenseCard: {
    backgroundColor: '#fef2f2', // Light red background
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  incomeAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981', // Green
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef4444', // Red
  },
});

export default IncomeExpenseCards;