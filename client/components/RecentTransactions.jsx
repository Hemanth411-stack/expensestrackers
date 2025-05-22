import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const RecentTransactions = () => {
  const navigation = useNavigation();
  const { transactions = [] } = useSelector(state => state.transactions);

  // Sort transactions by date (newest first) and limit to 5 most recent
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.iconContainer}>
        <View style={[
          styles.iconBackground,
          item.type === 'income' ? styles.incomeBg : styles.expenseBg
        ]}>
          <Icon 
            name={item.type === 'income' ? 'arrow-down' : 'arrow-up'} 
            size={16} 
            color={item.type === 'income' ? '#10B981' : '#EF4444'} 
          />
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.categoryText}>{item.category}</Text>
        <Text style={styles.notesText}>{item.notes}</Text>
        <Text style={styles.dateText}>
          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
      </View>
      
      <Text style={[
        styles.amountText,
        item.type === 'income' ? styles.incomeText : styles.expenseText
      ]}>
        {item.type === 'income' ? '+' : '-'}{item.amount.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('all-transactions')}>
  <Text style={styles.seeAll}>See All</Text>
</TouchableOpacity>
      </View>
      
      {recentTransactions.length > 0 ? (
        <FlatList
          data={recentTransactions}
          renderItem={renderTransaction}
          keyExtractor={item => item._id || item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noTransactionsText}>No recent transactions</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  seeAll: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 8,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
    marginRight: 12,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incomeBg: {
    backgroundColor: '#D1FAE5',
  },
  expenseBg: {
    backgroundColor: '#FEE2E2',
  },
  detailsContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  notesText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
  },
  incomeText: {
    color: '#10B981',
  },
  expenseText: {
    color: '#EF4444',
  },
  noTransactionsText: {
    textAlign: 'center',
    color: '#9CA3AF',
    paddingVertical: 16,
  },
});

export default RecentTransactions;