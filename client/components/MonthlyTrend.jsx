import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MonthlyTrend = () => {
  
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const incomeData = [1200, 800, 1500, 900];
  const expenseData = [750, 600, 950, 500];
  
  
  const maxValue = Math.max(...incomeData, ...expenseData);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Trend</Text>
      
      <View style={styles.chartContainer}>
        
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4ADE80' }]} />
            <Text style={styles.legendText}>Income</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#F87171' }]} />
            <Text style={styles.legendText}>Expenses</Text>
          </View>
        </View>

      
        <View style={styles.barsContainer}>
          {weeks.map((week, index) => (
            <View key={index} style={styles.weekContainer}>
              <Text style={styles.weekLabel}>{week}</Text>
              
              <View style={styles.barGroup}>
                
                <View style={[styles.bar, styles.incomeBar, { 
                  height: `${(incomeData[index] / maxValue) * 100}%` 
                }]}>
                  <Text style={styles.barValue}>${incomeData[index]}</Text>
                </View>
                
               
                <View style={[styles.bar, styles.expenseBar, { 
                  height: `${(expenseData[index] / maxValue) * 100}%` 
                }]}>
                  <Text style={styles.barValue}>${expenseData[index]}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
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
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#4B5563',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
    paddingTop: 16,
  },
  weekContainer: {
    alignItems: 'center',
    flex: 1,
  },
  weekLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 8,
  },
  barGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: 4,
  },
  bar: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 4,
  },
  incomeBar: {
    backgroundColor: '#4ADE80',
  },
  expenseBar: {
    backgroundColor: '#F87171',
  },
  barValue: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MonthlyTrend;
