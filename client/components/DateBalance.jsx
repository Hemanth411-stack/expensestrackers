import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../Redux/slices/transactionSlice';

const DateBalance = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);
  const { summary, status } = useSelector(state => state.transactions);
  const [currentDate, setCurrentDate] = React.useState(new Date());


  const monthNames = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"];

  const displayMonth = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  const balance = summary?.balance || 0;

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);

    const monthNumber = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    
    dispatch(fetchTransactions({ month: monthNumber, year }));
  };


  React.useEffect(() => {
    const monthNumber = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    dispatch(fetchTransactions({ month: monthNumber, year }));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => changeMonth('prev')}>
          <Icon name="chevron-left" size={18} color="#4b5563" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{displayMonth}</Text>
        <TouchableOpacity onPress={() => changeMonth('next')}>
          <Icon name="chevron-right" size={18} color="#4b5563" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        {status === 'loading' ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <Text style={[
            styles.balanceAmount,
            balance >= 0 ? styles.positiveBalance : styles.negativeBalance
          ]}>
            {balance.toFixed(2)}
          </Text>
        )}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positiveBalance: {
    color: '#10b981',
  },
  negativeBalance: {
    color: '#ef4444',
  },
  loadingText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});

export default DateBalance;
