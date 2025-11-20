// File: LostItemPage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LostItemPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ini adalah Halaman Barang Hilang</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});