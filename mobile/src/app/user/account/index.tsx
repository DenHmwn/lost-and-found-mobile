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

const localStyles = StyleSheet.create({
  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "70%",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 24,
    marginVertical: 6,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#2f80ed",
  },
  buttonPrimaryText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  buttonSecondary: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#2f80ed",
  },
  buttonSecondaryText: {
    color: "#2f80ed",
    fontWeight: "600",
  },
});
