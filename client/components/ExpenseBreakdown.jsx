import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ExpenseBreakdown = () => {
  const { transactions = [], summary = {} } = useSelector(state => state.transactions);

  const getCategoryColor = (category) => {
    const colors = {
      'Food': '#4ADE80',
      'Transport': '#60A5FA',
      'Shopping': '#F87171',
      'Bills': '#FBBF24',
      'Entertainment': '#A78BFA',
      'Health': '#F472B6',
      'Education': '#34D399',
      'Other': '#94A3B8'
    };
    return colors[category] || '#A78BFA';
  };

  const getCategoryBreakdown = () => {
    if (!Array.isArray(transactions)) return [];

    const categoryMap = {};
    const expenses = transactions.filter(t => t?.type === 'expense');
    const totalExpenses = Number(summary.totalExpenses) || 1; // Make sure this is the correct property name from your reducer

    expenses.forEach(transaction => {
      if (!transaction?.category) return;
      
      const category = transaction.category;
      const amount = Number(transaction.amount) || 0;

      if (!categoryMap[category]) {
        categoryMap[category] = {
          amount: 0,
          color: getCategoryColor(category)
        };
      }
      categoryMap[category].amount += amount;
    });

    return Object.entries(categoryMap)
      .map(([name, data]) => ({
        name,
        amount: data.amount,
        color: data.color,
        percentage: Math.round((data.amount / totalExpenses) * 100)
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  const categories = getCategoryBreakdown();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Breakdown</Text>
      
      {categories.length > 0 ? (
        <View style={styles.chartContainer}>
          {categories.map((category) => (
            <View key={`${category.name}-${category.amount}`} style={styles.barItem}>
              <View style={styles.barLabel}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryAmount}>{category.amount.toFixed(2)}</Text>
              </View>
              <View style={styles.barBackground}>
                <View 
                  style={[
                    styles.barFill, 
                    { 
                      width: `${category.percentage}%`,
                      backgroundColor: category.color
                    }
                  ]}
                />
              </View>
              <Text style={styles.percentageText}>{category.percentage}%</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noDataText}>No expense data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  chartContainer: {
    marginTop: 8,
  },
  barItem: {
    marginBottom: 12,
  },
  barLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  categoryAmount: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  barBackground: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  noDataText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginVertical: 16,
  },
});

export default ExpenseBreakdown;