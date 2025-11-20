import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LostItemPage from '../lostitems';
import FoundItemPage from '../founditems';
import AccountPageUser from '../account';

// Halaman HomePage
const HomeRoute = () => (
  <View style={{ flex: 1, justifyContent: "flex-start" }}>
    <Text style={[styles.warna_bg, { fontSize: 25, textAlign: "center" }]}>
      Lost and Found
    </Text>
    {/* Konten Home lainnya bisa ditaruh di sini */}
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ini Halaman Home</Text>
    </View>
  </View>
);

// Halaman barang hilang
// const LostRoute = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>Halaman Barang Hilang</Text>
//   </View>
// );

// Halaman akun
// const AccountRoute = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>Halaman Akun</Text>
//   </View>
// );

export default function HomePageUser() {
  // State untuk menyimpan tab
  const [index, setIndex] = useState(0);

  // Definisi rute/tab
  const [routes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'lost', title: 'lost', focusedIcon: 'help-box', unfocusedIcon: 'box-variant' },
    { key: 'found', title: 'found', focusedIcon: 'briefcase-check', unfocusedIcon: 'briefcase-check-outline' },
    { key: 'account', title: 'Account', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ]);

  // Mapping tampilan berdasarkan key rute
  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    lost: LostItemPage,
    found: FoundItemPage,
    account: AccountPageUser,
  });

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          // Opsi tambahan untuk warna
          barStyle={{ backgroundColor: '#f0f0f0' }} 
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  warna_bg: {
    backgroundColor: "gray",
    paddingBottom: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    color: 'white',
    fontWeight: 'bold'
  },
});