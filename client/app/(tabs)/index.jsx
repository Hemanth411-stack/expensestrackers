import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../../components/Header';
import DateBalance from "../../components/DateBalance"
import IncomeExpenseCards from "../../components/IncomeExpenseCards"
import ExpenseBreakdown from "../../components/ExpenseBreakdown"
import RecentTransactions from "../../components/RecentTransactions"
const App = () => {
 
   

  return (
    <ScrollView>
    <View style={{ flex: 1 }}>
      <Header/>
      <DateBalance />
      <IncomeExpenseCards/>
      <ExpenseBreakdown/>

<RecentTransactions 
  showHeader={true} 
/>
</View>
    </ScrollView>
  );
};

export default App;