import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../constants/Theme';

const TestCheck = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>☕ Chai-Vadapav App Ready!</Text>
      <Text style={styles.subText}>Senior Dev Architecture Working.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Theme.colors.secondary,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  subText: {
    marginTop: 10,
    color: '#333',
  }
});

export default TestCheck;