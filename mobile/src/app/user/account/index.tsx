// File: LostItemPage.tsx
import { styles } from "@/style/styles";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";

export default function AccountPageUser() {
  const handleUserLogin = () => {
          router.replace('/user/account/login')
      };
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
      <View style={localStyles.centerWrapper}>
         <View style={localStyles.buttonContainer}>
          <TouchableOpacity
            style={[localStyles.button, localStyles.buttonPrimary]}
            onPress={handleUserLogin}
          >
            <Text style={localStyles.buttonPrimaryText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[localStyles.button, localStyles.buttonSecondary]}
            onPress={() => console.log("Register")}
          >
            <Text style={localStyles.buttonSecondaryText}>Register</Text>
          </TouchableOpacity>
         </View>
      </View>
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
