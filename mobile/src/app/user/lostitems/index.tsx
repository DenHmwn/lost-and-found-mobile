// File: LostItemPage.tsx
import { styles } from "@/style/styles";
import React from "react";
import { View, Text } from "react-native";
import { Appbar } from "react-native-paper";

export default function LostItemPage() {
  return (
    <View>
      <Appbar.Header style={styles.header}>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Content title="Lost & Found" style={{ alignItems: "center" }} />
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
        {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
      </Appbar.Header>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Halaman List Kehilangan Barang</Text>
      </View>
    </View>
  );
}
