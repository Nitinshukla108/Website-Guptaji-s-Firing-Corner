import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export const ReviewCard = ({ name, comment }) => (
  <View style={styles.reviewCard}>
    <Text>⭐⭐⭐⭐⭐</Text>
    <Text style={styles.reviewComment}>"{comment}"</Text>
    <Text style={styles.reviewUser}>- {name}</Text>
  </View>
);

const styles = StyleSheet.create({
  reviewCard: { backgroundColor: '#111', width: '100%', padding: 25, borderRadius: 20, borderWidth: 1, borderColor: '#222', marginBottom: 10 },
  reviewComment: { color: '#FFF', fontStyle: 'italic', marginVertical: 12, lineHeight: 22, fontSize: 14 },
  reviewUser: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14, textAlign: 'right' },
});