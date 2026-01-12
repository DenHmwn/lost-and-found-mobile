// File: LostItemPage.tsx
import { styles } from "@/style/styles";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { decode as base64Decode } from "base-64";


const decodeJwtPayload = (token: string) => {
  if (!token) throw new Error("Token kosong");
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = base64Decode(base64); 
  return JSON.parse(jsonPayload);
};

export default function AccountPageUser() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
      const loadTokenAndUser = async () => {
        try {
      const storedToken = await SecureStore.getItemAsync("refreshToken");
      setToken(storedToken);
      
      if (!storedToken) return;
      const decoded = decodeJwtPayload(token || "");
      setUser({
          name: decoded.name ?? "",
          email: decoded.email ?? "",
        });
      } catch (err) {
        console.log("Error decode token:", err);
      }
    }
      
      loadTokenAndUser();
  }, []);
  
  
  
 
  // console.log("User Token:", SecureStore.getItemAsync("refreshToken"));
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
        {token && user ? (
            <View style={localStyles.profileContainer}>
            <Text style={localStyles.profileTitle}>Profil</Text>

            <Text style={localStyles.label}>Nama</Text>
            <TextInput
              style={localStyles.input}
              value={user.name || ""}
              editable={false}
              placeholder="Nama"
            />

            <Text style={localStyles.label}>Email</Text>
            <TextInput
              style={localStyles.input}
              value={user.email || ""}
              editable={false}
              placeholder="Email"
            />
          </View>
          ) : ( 
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
          )} 
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
  profileContainer: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
   profileTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
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
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    width: '100%',           
    alignSelf: 'stretch',  
  },
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
