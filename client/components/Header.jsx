import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../Redux/slices/themeSlice';

const Header = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <View style={[styles.headerContainer, darkMode ? styles.darkHeader : styles.lightHeader]}>
        <Text style={[styles.headerText, darkMode ? styles.darkText : styles.lightText]}>
          Expense Tracker
        </Text>
        <TouchableOpacity 
          onPress={() => dispatch(toggleTheme())} 
          style={styles.themeToggle}
        >
          {/* <Icon 
            name={darkMode ? 'sun' : 'moon'} 
            size={20} 
            color={darkMode ? '#f59e0b' : '#4b5563'} 
          /> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  lightHeader: {
    backgroundColor: '#ffffff',
  },
  darkHeader: {
    backgroundColor: '#1f2937',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  lightText: {
    color: '#111827',
  },
  darkText: {
    color: '#ffffff',
  },
  themeToggle: {
    padding: 8,
    borderRadius: 20,
  },
});

export default Header;