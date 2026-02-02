import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, BackHandler, useWindowDimensions, Platform, TouchableOpacity, Text, Image, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Modular Imports - No changes here
import { COLORS, IMAGES } from './src/constants/Theme'; 
import { MENU_ITEMS, REVIEWS } from './src/constants/data';
import Footer from './src/components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const { height, width } = useWindowDimensions();
  const isMobile = width < 768;

  useEffect(() => {
    const backAction = () => {
      if (activeTab !== 'Home') { setActiveTab('Home'); return true; }
      return false;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Menu':
        return (
          <View style={styles.tabPadding}>
            <Text style={styles.sectionTitle}>SIGNATURE MENU</Text>
            <View style={styles.divider} />
            <View style={styles.cardGrid}>
              {MENU_ITEMS.map(item => (
                <View key={item.id} style={styles.sigCard}>
                  <Image source={IMAGES[item.img]} style={styles.sigCardImg} />
                  <View style={styles.sigInfo}>
                    <Text style={styles.sigTitle}>{item.name}</Text>
                    <Text style={styles.sigPrice}>{item.price}</Text>
                    <Text style={{color: COLORS.muted, fontSize: 12}}>{item.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
      case 'Reviews':
        return (
          <View style={styles.tabPadding}>
            <Text style={styles.sectionTitle}>1000+ HAPPY CUSTOMERS</Text>
            <View style={styles.divider} />
            <View style={styles.cardGrid}>
              {REVIEWS.map((r, i) => (
                <View key={i} style={styles.reviewCard}>
                  <Text>⭐⭐⭐⭐⭐</Text>
                  <Text style={styles.reviewComment}>"{r.c}"</Text>
                  <Text style={styles.reviewUser}>- {r.n}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      case 'Location':
        return (
          <View style={styles.tabPadding}>
            <Text style={styles.sectionTitle}>FIND US IN SURAT</Text>
            <View style={styles.divider} />
            <View style={styles.glassCard}>
              <Text style={styles.infoLabel}>MAIN BRANCH</Text>
              <Text style={styles.infoValue}>Shop No. 5, Aradhana Row House, Opp. Police Station, Dindoli, Surat, Gujarat 394210</Text>
              <View style={styles.locationDetailBox}>
                <Text style={styles.detailHeading}>📍 LANDMARK</Text>
                <Text style={styles.detailText}>Near Aradhana Row House, Dindoli food hub.</Text>
                <Text style={styles.detailHeading}>🏠 AMBIANCE</Text>
                <Text style={styles.detailText}>Open-air desi street food vibe.</Text>
              </View>
              <TouchableOpacity style={styles.modernBtn} onPress={() => Linking.openURL('http://googleusercontent.com/maps.google.com/7')}>
                <Text style={styles.btnTextBold}>📍 GET LIVE DIRECTIONS</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'Contact':
        return (
          <View style={styles.tabPadding}>
            <Text style={styles.sectionTitle}>GET IN TOUCH</Text>
            <View style={styles.divider} />
            <View style={styles.glassCard}>
              <Text style={styles.infoLabel}>OWNER & FOUNDER</Text>
              <Text style={styles.infoValue}>Vijay Gupta Ji</Text>
              <View style={styles.contactInfoGrid}>
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>📞 DIRECT CALL</Text>
                  <Text style={styles.contactValue}>+91 7984402809</Text>
                </View>
              </View>
              <View style={styles.orderNotice}>
                <Text style={styles.orderNoticeTitle}>📦 BULK ORDERS</Text>
                <Text style={styles.orderNoticeDesc}>Hum party aur office meetings ke liye bulk orders lete hain!</Text>
              </View>
              <View style={{gap: 12, marginTop: 25}}>
                <TouchableOpacity style={styles.modernBtn} onPress={() => Linking.openURL('tel:7984402809')}>
                  <Text style={styles.btnTextBold}>📞 CALL NOW</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modernBtn, {backgroundColor: COLORS.whatsapp}]} onPress={() => Linking.openURL('https://wa.me/917984402809')}>
                  <Text style={styles.btnTextBold}>💬 CHAT ON WHATSAPP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      default:
        return (
          <View>
            <View style={[styles.hero, { minHeight: height - 150 }]}>
              <View style={styles.glowCircle}>
                <Image source={IMAGES.samosa} style={styles.heroImg} />
                <View style={styles.floatingBadge}><Text style={styles.badgeText}>🔥 HOT</Text></View>
              </View>
              <Text style={styles.heroTitle}>Authentic Desi{"\n"}<Text style={{color: COLORS.primary}}>Flavours</Text></Text>
              <TouchableOpacity style={styles.mainActionBtn} onPress={() => setActiveTab('Menu')}>
                <Text style={styles.mainActionText}>EXPLORE MENU</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.priceStrip}>
              <View style={styles.stripItem}><Text style={styles.stripPrice}>₹5</Text><Text style={styles.stripLabel}>CHAI</Text></View>
              <View style={styles.stripItem}><Text style={styles.stripPrice}>₹7</Text><Text style={styles.stripLabel}>SAMOSA</Text></View>
              <View style={styles.stripItem}><Text style={styles.stripPrice}>₹10</Text><Text style={styles.stripLabel}>VADAPAV</Text></View>
            </View>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setActiveTab('Home')}><Text style={styles.logo}>GUPTA JI'S FIRING CORNER</Text></TouchableOpacity>
        {!isMobile && (
          <View style={styles.navLinks}>
            {['Home', 'Menu', 'Reviews', 'Location', 'Contact'].map(t => (
              <TouchableOpacity key={t} onPress={() => setActiveTab(t)}>
                <Text style={[styles.navItem, activeTab === t && {color: COLORS.primary}]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          {renderContent()}
        </View>
        <Footer />
      </ScrollView>
      {isMobile && (
        <View style={styles.bottomBar}>
          {[
            {n:'Home', i:'🏠'}, {n:'Menu', i:'🍽️'}, {n:'Reviews', i:'⭐'}, {n:'Location', i:'📍'}, {n:'Contact', i:'📞'}
          ].map(t => {
            const isActive = activeTab === t.n;
            return (
              <TouchableOpacity key={t.n} onPress={() => setActiveTab(t.n)} style={styles.tabBtn}>
                <Text style={{fontSize: 20, opacity: isActive ? 1 : 0.5}}>{t.i}</Text>
                <Text style={[styles.tabText, isActive && {color: COLORS.primary, fontWeight: '900'}]}>
                  {t.n}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background, paddingTop: Platform.OS === 'android' ? 30 : 0 },
  navbar: { height: 70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 0.5, borderBottomColor: '#222' },
  logo: { color: COLORS.primary, fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  navLinks: { flexDirection: 'row', gap: 20 },
  navItem: { color: COLORS.muted, fontSize: 14, fontWeight: '600' },
  bottomBar: { flexDirection: 'row', height: 80, backgroundColor: '#111', borderTopWidth: 1, borderTopColor: '#222', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10 },
  tabBtn: { alignItems: 'center', flex: 1 },
  tabText: { color: COLORS.muted, fontSize: 10, marginTop: 4, fontWeight: '700' },
  hero: { alignItems: 'center', justifyContent: 'center', padding: 30 },
  glowCircle: { width: 220, height: 220, borderRadius: 110, borderWidth: 2, borderColor: COLORS.primary, overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%' },
  floatingBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15 },
  badgeText: { color: '#FFF', fontWeight: '900', fontSize: 10 },
  heroTitle: { color: '#FFF', fontSize: 36, fontWeight: '900', textAlign: 'center', marginTop: 25 },
  mainActionBtn: { backgroundColor: COLORS.primary, marginTop: 35, paddingHorizontal: 35, paddingVertical: 15, borderRadius: 30 },
  mainActionText: { color: '#FFF', fontWeight: '900' },
  priceStrip: { flexDirection: 'row', backgroundColor: COLORS.primary, padding: 20, justifyContent: 'space-around' },
  stripItem: { alignItems: 'center' },
  stripPrice: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  stripLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: 'bold' },
  tabPadding: { padding: 30, alignItems: 'center' },
  sectionTitle: { color: COLORS.primary, fontSize: 28, fontWeight: '900', textAlign: 'center' },
  divider: { width: 50, height: 4, backgroundColor: COLORS.primary, marginVertical: 15, alignSelf: 'center' },
  cardGrid: { width: '100%', maxWidth: 1200, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20 },
  sigCard: { width: Platform.OS === 'web' ? 320 : '100%', height: 380, borderRadius: 25, overflow: 'hidden', backgroundColor: '#111', marginBottom: 15 },
  sigCardImg: { width: '100%', height: '100%', opacity: 0.6 },
  sigInfo: { position: 'absolute', bottom: 0, width: '100%', padding: 25, backgroundColor: 'rgba(0,0,0,0.8)' },
  sigTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  sigPrice: { color: COLORS.primary, fontSize: 26, fontWeight: '900' },
  reviewCard: { backgroundColor: '#111', width: Platform.OS === 'web' ? 350 : '100%', padding: 25, borderRadius: 20, borderWidth: 1, borderColor: '#222', marginBottom: 10 },
  reviewComment: { color: '#FFF', fontStyle: 'italic', marginVertical: 12, lineHeight: 22, fontSize: 14 },
  reviewUser: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14, textAlign: 'right' },
  glassCard: { backgroundColor: '#111', width: '100%', maxWidth: 600, padding: 30, borderRadius: 25, borderWidth: 1, borderColor: '#222', marginTop: 10 },
  infoLabel: { color: COLORS.primary, fontSize: 12, fontWeight: '900', letterSpacing: 1.5 },
  infoValue: { color: '#FFF', fontSize: 18, marginTop: 8, lineHeight: 26 },
  locationDetailBox: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#333', paddingTop: 15 },
  detailHeading: { color: COLORS.primary, fontSize: 11, fontWeight: 'bold', marginTop: 10 },
  detailText: { color: COLORS.muted, fontSize: 13, marginTop: 4 },
  contactInfoGrid: { marginTop: 20, gap: 15 },
  contactItem: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 15, borderRadius: 12 },
  contactLabel: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold' },
  contactValue: { color: '#FFF', fontSize: 16, marginTop: 5 },
  orderNotice: { marginTop: 25, padding: 15, backgroundColor: 'rgba(255,69,0,0.1)', borderRadius: 15, borderWidth: 1, borderColor: COLORS.primary },
  orderNoticeTitle: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
  orderNoticeDesc: { color: '#DDD', fontSize: 12, marginTop: 5, lineHeight: 18 },
  modernBtn: { backgroundColor: COLORS.primary, paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  btnTextBold: { color: '#FFF', fontWeight: 'bold' },
});