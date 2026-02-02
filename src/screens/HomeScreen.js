import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS, IMAGES } from '../constants/theme';

export const HomeScreen = ({ onExplore }) => {
  const { height } = useWindowDimensions();
  return (
    <View>
      <View style={[styles.hero, { minHeight: height - 150 }]}>
        <View style={styles.glowCircle}>
          <Image source={IMAGES.samosa} style={styles.heroImg} />
          <View style={styles.floatingBadge}><Text style={styles.badgeText}>🔥 HOT</Text></View>
        </View>
        <Text style={styles.heroTitle}>Authentic Desi{"\n"}<Text style={{color: COLORS.primary}}>Flavours</Text></Text>
        <Text style={styles.heroSubtext}>Vijay Gupta's Special Chai & Samosas in Dindoli.</Text>
        <TouchableOpacity style={styles.mainActionBtn} onPress={onExplore}>
          <Text style={styles.mainActionText}>EXPLORE MENU</Text>
        </TouchableOpacity>
      </View>
      
      {/* Promise Section & Price Strip (Same as before) */}
      <View style={styles.priceStrip}>
        <View style={styles.stripItem}><Text style={styles.stripPrice}>₹5</Text><Text style={styles.stripLabel}>CHAI</Text></View>
        <View style={styles.stripItem}><Text style={styles.stripPrice}>₹7</Text><Text style={styles.stripLabel}>SAMOSA</Text></View>
        <View style={styles.stripItem}><Text style={styles.stripPrice}>₹10</Text><Text style={styles.stripLabel}>VADAPAV</Text></View>
      </View>
    </View>
  );
};
