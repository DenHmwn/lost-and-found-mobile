// File: LostItemPage.tsx
import { styles } from "@/style/styles";
import React from "react";
import { View, Text } from "react-native";
import { Appbar } from "react-native-paper";

export default function FoundItemPage() {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Appbar.Header style={styles.background}>
        <Appbar.Content
          title="Lost & Found"
          titleStyle={styles.PageTitle}
          style={styles.PageTitle}
        />
      </Appbar.Header>

      <View style={styles.pageTitleContainer}>
        <Text style={styles.PageTitle}>Halaman List Penemuan Barang</Text>
      </View>
    </View>
  );
}
