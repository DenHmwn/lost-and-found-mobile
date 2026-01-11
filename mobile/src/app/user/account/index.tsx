// File: LostItemPage.tsx
import { styles } from "@/style/styles";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

export default function AccountPageUser() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //     const loadTokenAndUser = async () => {
  //     const storedToken = await SecureStore.getItemAsync("refreshToken");
  //     setToken(storedToken);
      
  //     if (!storedToken) return;
  //     };
  //     loadTokenAndUser();
  // }, []);
 
  console.log("User Token:", SecureStore.getItemAsync("refreshToken"));
  const handleUserLogin = () => {
          router.replace('/user/account/login')
      };

  const handleUserRegister = () => {
          router.replace('/user/account/register')
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
            onPress={handleUserRegister}
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
