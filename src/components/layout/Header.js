import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../../constants/Theme';

export default function Header({ onTabChange, activeTab }) {
  const tabs = ['Home', 'Menu', 'Location', 'Contact'];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onTabChange('Home')}>
        <Text style={styles.logo}>VIJAY GUPTA'S</Text>
      </TouchableOpacity>
      
      <View style={styles.nav}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => onTabChange(tab)}>
            <Text style={[
              styles.link, 
              activeTab === tab && { color: Theme.colors.primary, fontWeight: '900' }
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.8)', 
    position: 'absolute',
    top: 0, left: 0, right: 0,
    zIndex: 100,
  },
  logo: { color: Theme.colors.primary, fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  nav: { flexDirection: 'row', gap: 15 },
  link: { color: '#FFF', fontSize: 13, fontWeight: '500' }
});