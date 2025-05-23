import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const MonthlyTrend = () => {
  const { transactions } = useSelector(state => state.transactions);

  const processWeeklyData = () => {
    const weeklyData = {
      'Week 1': { income: 0, expenses: 0 },
      'Week 2': { income: 0, expenses: 0 },
      'Week 3': { income: 0, expenses: 0 },
      'Week 4': { income: 0, expenses: 0 },
    };

    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const dayOfMonth = transactionDate.getDate();
      const weekNumber = Math.min(Math.floor(dayOfMonth / 7) + 1, 4);
      const weekKey = `Week ${weekNumber}`;
      
      if (transaction.type === 'income') {
        weeklyData[weekKey].income += transaction.amount;
      } else {
        weeklyData[weekKey].expenses += transaction.amount;
      }
    });

    return {
      weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      incomeData: Object.values(weeklyData).map(week => week.income),
      expenseData: Object.values(weeklyData).map(week => week.expenses),
    };
  };

  const { weeks, incomeData, expenseData } = processWeeklyData();
  const maxValue = Math.max(...incomeData, ...expenseData, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Trend</Text>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#34D399' }]} />
          <Text style={styles.legendText}>Income</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#F87171' }]} />
          <Text style={styles.legendText}>Expenses</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {/* Grid Lines */}
        <View style={styles.gridContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.gridLine,
                { bottom: `${(index / 4) * 100}%` },
              ]}
            />
          ))}
        </View>

        <View style={styles.barsContainer}>
          {weeks.map((week, index) => (
            <View key={index} style={styles.weekColumn}>
              <View style={styles.barGroup}>
                {/* Income Bar */}
                {incomeData[index] > 0 && (
                  <View style={styles.singleBarContainer}>
                    <LinearGradient
                      colors={['#34D399', '#6EE7B7']}
                      style={[
                        styles.bar,
                        styles.incomeBar,
                        { height: `${(incomeData[index] / maxValue) * 80}%` },
                      ]}
                    />
                    <Text style={[styles.barValue, styles.incomeValue]}>
                      ${incomeData[index].toFixed(0)}
                    </Text>
                  </View>
                )}
                
                {/* Expense Bar */}
                {expenseData[index] > 0 && (
                  <View style={styles.singleBarContainer}>
                    <LinearGradient
                      colors={['#F87171', '#FCA5A5']}
                      style={[
                        styles.bar,
                        styles.expenseBar,
                        { height: `${(expenseData[index] / maxValue) * 80}%` },
                      ]}
                    />
                    <Text style={[styles.barValue, styles.expenseValue]}>
                      ${expenseData[index].toFixed(0)}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.weekLabel}>{week}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: 'System',
    marginBottom: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  chartContainer: {
    height: 280,
    position: 'relative',
  },
  gridContainer: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    top: 30,
  },
  gridLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    opacity: 0.5,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
  },
  weekColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  barGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '90%',
    height: '80%',
    marginBottom: 24,
  },
  singleBarContainer: {
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '80%',
    borderRadius: 6,
    minHeight: 4,
  },
  barValue: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  incomeValue: {
    color: '#34D399',
  },
  expenseValue: {
    color: '#F87171',
  },
  weekLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
});

export default MonthlyTrend;
