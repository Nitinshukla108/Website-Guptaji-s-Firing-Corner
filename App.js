import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, BackHandler, useWindowDimensions, Platform, TouchableOpacity, Text, Image, Linking, TextInput, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Modular Imports
import { COLORS, IMAGES } from './src/constants/Theme'; 
import { MENU_ITEMS, REVIEWS } from './src/constants/data';
import Footer from './src/components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const { height, width } = useWindowDimensions();
  const isMobile = width < 768;

  // --- APP STATES ---
  const [cart, setCart] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false); 
  const [custName, setCustName] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custContact, setCustContact] = useState('');

  useEffect(() => {
    const backAction = () => {
      if (showCartPage) { setShowCartPage(false); return true; }
      if (activeTab !== 'Home') { setActiveTab('Home'); return true; }
      return false;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [activeTab, showCartPage]);

  // --- CART FUNCTIONALITY ---
  const updateQty = (item, action) => {
    const existing = cart.find(i => i.id === item.id);
    if (action === 'add') {
      if (existing) {
        setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      } else {
        setCart([...cart, { ...item, qty: 1 }]);
      }
    } else if (action === 'remove' && existing) {
      if (existing.qty > 1) {
        setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty - 1 } : i));
      } else {
        setCart(cart.filter(i => i.id !== item.id));
      }
    }
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace('₹', ''));
    return sum + (price * item.qty);
  }, 0);

  const sendWhatsAppOrder = () => {
    if (!custName.trim() || !custAddress.trim() || !custContact.trim()) {
      alert("Please provide your name, contact, and address details.");
      return;
    }
    const orderList = cart.map(i => `• *${i.name}* (${i.qty} x ${i.price})`).join('%0A');
    const message = `🔥 *NEW ORDER PLACED* 🔥%0A%0A👤 *Customer:* ${custName}%0A📞 *Contact:* ${custContact}%0A📍 *Address:* ${custAddress}%0A%0A🛒 *Order Details:*%0A${orderList}%0A%0A💰 *Total Amount: ₹${totalPrice}*`;
    
    Linking.openURL(`https://wa.me/917984402809?text=${message}`);

    // --- AUTOMATIC RESET AFTER ORDER ---
    setCart([]);
    setShowCartPage(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Menu':
        return (
          <View style={styles.tabPadding}>
            <View style={styles.menuHeader}>
               <Text style={styles.sectionTitle}>SIGNATURE MENU</Text>
               <TouchableOpacity style={styles.basketBtn} onPress={() => setShowCartPage(true)}>
                  <Text style={{color:'#FFF', fontWeight:'bold'}}>🛒 {cart.length} ITEMS</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View style={styles.cardGrid}>
              {MENU_ITEMS.map(item => {
                const cartItem = cart.find(i => i.id === item.id);
                return (
                  <View key={item.id} style={styles.sigCard}>
                    <Image source={IMAGES[item.img]} style={styles.sigCardImg} />
                    <View style={styles.sigInfo}>
                      <Text style={styles.sigTitle}>{item.name}</Text>
                      <Text style={styles.sigPrice}>{item.price}</Text>
                      {cartItem ? (
                        <View style={styles.mainQtyControl}>
                          <TouchableOpacity onPress={() => updateQty(item, 'remove')} style={styles.circleBtn}><Text style={styles.btnSymbol}>-</Text></TouchableOpacity>
                          <Text style={styles.qtyNum}>{cartItem.qty}</Text>
                          <TouchableOpacity onPress={() => updateQty(item, 'add')} style={styles.circleBtn}><Text style={styles.btnSymbol}>+</Text></TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity style={styles.addBtn} onPress={() => updateQty(item, 'add')}>
                          <Text style={styles.addBtnText}>+ ADD TO CART</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
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
            <Text style={styles.sectionTitle}>OUR LOCATION</Text>
            <View style={styles.divider} />
            <View style={styles.glassCard}>
              <Text style={styles.infoLabel}>MAIN BRANCH</Text>
              <Text style={styles.infoValue}>Shop No. 5, Aradhana Row House, Opp. Police Station, Dindoli, Surat, Gujarat 394210</Text>
              <View style={styles.locationDetailBox}>
                <Text style={styles.detailHeading}>📍 LANDMARK</Text>
                <Text style={styles.detailText}>Opposite Dindoli Police Station, Aradhana Row House.</Text>
                <Text style={styles.detailHeading}>🏠 AMBIANCE</Text>
                <Text style={styles.detailText}>Authentic street food experience with open-air seating.</Text>
              </View>
              <TouchableOpacity style={styles.modernBtn} onPress={() => Linking.openURL('http://maps.google.com/?q=Firing+Corner+Dindoli')}>
                <Text style={styles.btnTextBold}>📍 START NAVIGATION</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'Contact':
        return (
          <View style={styles.tabPadding}>
            <Text style={styles.sectionTitle}>CONTACT US</Text>
            <View style={styles.divider} />
            <View style={styles.glassCard}>
              <Text style={styles.infoLabel}>OWNER & FOUNDER</Text>
              <Text style={styles.infoValue}>Vijay Gupta</Text>
              <View style={styles.contactInfoGrid}>
                <View style={styles.contactItem}><Text style={styles.contactLabel}>📞 DIRECT LINE</Text><Text style={styles.contactValue}>+91 7984402809</Text></View>
              </View>
              <View style={styles.orderNotice}><Text style={styles.orderNoticeTitle}>📦 BULK ORDERS</Text><Text style={styles.orderNoticeDesc}>We accept bulk orders for parties and corporate events.</Text></View>
              <TouchableOpacity style={styles.modernBtn} onPress={() => Linking.openURL('tel:7984402809')}>
                <Text style={styles.btnTextBold}>📞 CALL NOW</Text>
              </TouchableOpacity>
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
      
      {/* --- ORDER SUMMARY MODAL --- */}
      <Modal visible={showCartPage} animationType="slide" transparent={false}>
        <View style={styles.modalContent}>
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowCartPage(false)}><Text style={styles.closeText}>✕ Close</Text></TouchableOpacity>
              <Text style={styles.modalTitle}>🧾 ORDER BILL</Text>
            </View>
            <ScrollView style={{padding: 20}}>
              {cart.length === 0 ? <Text style={styles.emptyText}>Your basket is currently empty.</Text> : (
                <View>
                  {cart.map(item => (
                    <View key={item.id} style={styles.billRow}>
                      <Text style={styles.billName}>{item.name}</Text>
                      <View style={styles.billQtyActions}>
                        <TouchableOpacity onPress={() => updateQty(item, 'remove')}><Text style={styles.billActionBtn}>-</Text></TouchableOpacity>
                        <Text style={styles.billQtyVal}>{item.qty}</Text>
                        <TouchableOpacity onPress={() => updateQty(item, 'add')}><Text style={styles.billActionBtn}>+</Text></TouchableOpacity>
                      </View>
                      <Text style={styles.billPrice}>₹{parseInt(item.price.replace('₹','')) * item.qty}</Text>
                    </View>
                  ))}

                  {/* --- MANUAL RESET BUTTON --- */}
                  <TouchableOpacity onPress={() => setCart([])} style={styles.clearCartBtn}>
                    <Text style={styles.clearCartText}>EMPTY BASKET 🗑️</Text>
                  </TouchableOpacity>

                  <View style={styles.billTotalRow}><Text style={styles.totalLabel}>TOTAL PAYABLE</Text><Text style={styles.totalPrice}>₹{totalPrice}</Text></View>
                  
                  <View style={styles.formCard}>
                    <Text style={styles.formInstructions}>ENTER DELIVERY DETAILS</Text>
                    <TextInput style={styles.modalInput} placeholder="Full Name" placeholderTextColor="#666" onChangeText={setCustName} />
                    <TextInput style={styles.modalInput} placeholder="Contact Number" placeholderTextColor="#666" keyboardType="numeric" onChangeText={setCustContact} />
                    <TextInput style={[styles.modalInput, {height: 60}]} placeholder="Address / Table Number" placeholderTextColor="#666" onChangeText={setCustAddress} />
                    <TouchableOpacity style={styles.finalOrderBtn} onPress={sendWhatsAppOrder}>
                      <Text style={styles.finalOrderText}>PROCEED TO WHATSAPP</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setActiveTab('Home')}><Text style={styles.logo}>Firing Corner</Text></TouchableOpacity>
        {!isMobile && (
          <View style={styles.navLinks}>
            {['Home', 'Menu', 'Reviews', 'Location', 'Contact'].map(t => (
              <TouchableOpacity key={t} onPress={() => setActiveTab(t)}><Text style={[styles.navItem, activeTab === t && {color: COLORS.primary}]}>{t}</Text></TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>{renderContent()}</View>
        <Footer />
      </ScrollView>
      {isMobile && (
        <View style={styles.bottomBar}>
          {[{n:'Home',i:'🏠'}, {n:'Menu',i:'🍽️'}, {n:'Reviews',i:'⭐'}, {n:'Location',i:'📍'}, {n:'Contact',i:'📞'}].map(t => (
            <TouchableOpacity key={t.n} onPress={() => setActiveTab(t.n)} style={styles.tabBtn}>
              <Text style={{fontSize: 20, opacity: activeTab === t.n ? 1 : 0.5}}>{t.i}</Text>
              <Text style={[styles.tabText, activeTab === t.n && {color: COLORS.primary, fontWeight: '900'}]}>{t.n}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

// --- UPDATED STYLES FOR ENGLISH VERSION ---
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
  menuHeader: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' },
  basketBtn: { backgroundColor: COLORS.primary, padding: 12, borderRadius: 15 },
  mainQtyControl: { flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 10, justifyContent: 'center' },
  circleBtn: { backgroundColor: '#222', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.primary },
  btnSymbol: { color: COLORS.primary, fontSize: 18, fontWeight: 'bold' },
  qtyNum: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  addBtn: { backgroundColor: COLORS.primary, paddingVertical: 8, borderRadius: 10, marginTop: 10, alignItems: 'center' },
  addBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  modalContent: { flex: 1, backgroundColor: '#000' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#222' },
  modalTitle: { color: COLORS.primary, fontSize: 20, fontWeight: '900' },
  closeText: { color: '#FFF', fontSize: 16 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 0.5, borderBottomColor: '#333', paddingBottom: 15 },
  billName: { color: '#FFF', fontSize: 14, flex: 1.5 },
  billQtyActions: { flexDirection: 'row', gap: 15, alignItems: 'center', flex: 1, justifyContent: 'center' },
  billActionBtn: { color: COLORS.primary, fontSize: 22, fontWeight: 'bold' },
  billQtyVal: { color: '#FFF', fontWeight: 'bold' },
  billPrice: { color: COLORS.primary, fontWeight: 'bold', flex: 1, textAlign: 'right' },
  clearCartBtn: { padding: 10, marginTop: 5, alignItems: 'center', borderWidth: 1, borderColor: '#ff4444', borderRadius: 10 },
  clearCartText: { color: '#ff4444', fontSize: 12, fontWeight: 'bold' },
  billTotalRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, borderTopWidth: 2, borderTopColor: COLORS.primary, paddingTop: 15 },
  totalLabel: { color: '#FFF', fontSize: 18, fontWeight: '900' },
  totalPrice: { color: COLORS.primary, fontSize: 24, fontWeight: '900' },
  formCard: { backgroundColor: '#111', padding: 20, borderRadius: 20, marginTop: 20, borderWidth: 1, borderColor: '#333' },
  formInstructions: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalInput: { backgroundColor: '#181818', color: '#FFF', padding: 15, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  finalOrderBtn: { backgroundColor: '#25D366', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  finalOrderText: { color: '#FFF', fontWeight: 'bold' },
  emptyText: { color: '#666', textAlign: 'center', marginTop: 50 },
  cardGrid: { width: '100%', maxWidth: 1200, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20 },
  sigCard: { width: Platform.OS === 'web' ? 320 : '100%', height: 380, borderRadius: 25, overflow: 'hidden', backgroundColor: '#111', marginBottom: 15 },
  sigCardImg: { width: '100%', height: '100%', opacity: 0.6 },
  sigInfo: { position: 'absolute', bottom: 0, width: '100%', padding: 25, backgroundColor: 'rgba(0,0,0,0.8)' },
  sigTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  sigPrice: { color: COLORS.primary, fontSize: 26, fontWeight: '900' },
  reviewCard: { backgroundColor: '#111', width: Platform.OS === 'web' ? 350 : '100%', padding: 25, borderRadius: 20, borderWidth: 1, borderColor: '#222', marginBottom: 10 },
  reviewComment: { color: '#FFF', fontStyle: 'italic', marginVertical: 12, fontSize: 14 },
  reviewUser: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14, textAlign: 'right' },
  glassCard: { backgroundColor: '#111', width: '100%', maxWidth: 600, padding: 30, borderRadius: 25, borderWidth: 1, borderColor: '#222', marginTop: 10 },
  infoLabel: { color: COLORS.primary, fontSize: 12, fontWeight: '900' },
  infoValue: { color: '#FFF', fontSize: 18, marginTop: 8 },
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