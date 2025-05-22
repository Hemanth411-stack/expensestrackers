import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = ({ darkMode, toggleDarkMode }) => {
  return (
    <SafeAreaView 
      style={[
        styles.safeArea, 
        darkMode && styles.darkSafeArea
      ]}
      edges={['top', 'left', 'right']}
     
    >
      <View style={[styles.container, darkMode && styles.darkContainer]}>
        <Text style={[styles.title, darkMode && styles.darkText]}>Settings</Text>

        <View style={[styles.card, darkMode && styles.darkCard]}>
          
          <View style={[
            styles.settingItem, 
            darkMode && styles.darkSettingItem
          ]}>
            
            
        </View>

       
        <View style={styles.settingItem}>
          <View>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>Currency</Text>
            <Text style={[styles.settingSubtitle, darkMode && styles.darkSubtext]}>
              Indian Rupee
            </Text>
          </View>
          
        </View>

        
        <View style={styles.settingItem}>
          <View>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>Notifications</Text>
            <Text style={[styles.settingSubtitle, darkMode && styles.darkSubtext]}>
              Enabled
            </Text>
          </View>
          
        </View>

     

       
        <View style={styles.settingItem}>
          <View>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>About</Text>
            <Text style={[styles.settingSubtitle, darkMode && styles.darkSubtext]}>
              Version 1.0.0
            </Text>
          </View>
          
        </View>
      </View>
    </View>
    
    
  </SafeAreaView>
    
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  darkSafeArea: {
    backgroundColor: '#111827',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSubtext: {
    color: '#D1D5DB',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  darkCard: {
    backgroundColor: '#1F2937',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  darkSettingItem: {
    borderBottomColor: '#374151',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default Settings;