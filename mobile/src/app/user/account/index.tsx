// File: LostItemPage.tsx
import { styles } from "@/style/styles";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

export default function AccountPageUser() {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Appbar.Header style={styles.appBar} elevated>
        <Appbar.Content title="Account" titleStyle={styles.appBarTitle} />
        <Appbar.Action
          icon="bell-outline"
          onPress={() => console.log("Notifikasi")}
          color="#FFFFFF"
        />
      </Appbar.Header>
    </View>
  );
}
