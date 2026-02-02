import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../constants/Theme'; 

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        <View style={styles.footerBrand}>
          <Text style={styles.footerLogo}>VIJAY GUPTA'S</Text>
          <Text style={styles.footerTagline}>Garma-Garam Swad, Dindoli Ki Pehchan.</Text>
        </View>
        <View style={styles.footerDivider} />
        <View style={styles.footerGrid}>
          <View style={styles.footerInfoBox}>
            <Text style={styles.footerHeader}>TIMINGS</Text>
            <Text style={styles.footerLinkText}>8:00 AM - 10:00 PM</Text>
          </View>
          <View style={styles.footerInfoBox}>
            <Text style={styles.footerHeader}>LOCATION</Text>
            <Text style={styles.footerLinkText}>Dindoli, Surat</Text>
          </View>
        </View>
        <View style={styles.footerBottom}>
          <Text style={styles.copyText}>© 2026 Vijay Gupta Snacks.</Text>
          <Text style={styles.devName}>Developed by Nitin Shukla</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: { backgroundColor: '#0A0A0A', paddingVertical: 30, paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: '#222' },
  footerContent: { maxWidth: 1200, alignSelf: 'center', width: '100%' },
  footerBrand: { alignItems: 'center', marginBottom: 20 },
  footerLogo: { color: COLORS.primary, fontSize: 20, fontWeight: '900' },
  footerTagline: { color: COLORS.muted, fontSize: 12 },
  footerDivider: { height: 1, backgroundColor: '#222', marginVertical: 15 },
  footerGrid: { flexDirection: Platform.OS === 'web' ? 'row' : 'column', justifyContent: 'space-around' },
  footerInfoBox: { alignItems: 'center', marginBottom: 10 },
  footerHeader: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  footerLinkText: { color: COLORS.muted, fontSize: 12 },
  footerBottom: { alignItems: 'center', marginTop: 10 },
  copyText: { color: '#444', fontSize: 10 },
  devName: { color: COLORS.primary, fontSize: 11, fontWeight: 'bold' },
});