import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "@/style/styles";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function LoginPage({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try{
    const res = await axios.post("http://localhost:3001/api/auth/login", {
      email,
      password,
    },{
        withCredentials: true,
    });
    console.log("Login successful:", res.data.message);
    await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);
  } catch (error) {
    console.error("Login failed:", error);
    }
  }
  const goToRegister = () => {
    navigation.navigate("RegisterPage");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7ff" }}>
     
      <Appbar.Header style={styles.appBar} elevated>
        <Appbar.Content title="Login" titleStyle={styles.appBarTitle} />
      </Appbar.Header>

      
      <View style={localStyles.container}>
        <View style={localStyles.formCard}>
          <Text style={localStyles.label}>Email</Text>
          <TextInput
            style={localStyles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Masukkan email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={localStyles.label}>Password</Text>
          <TextInput
            style={localStyles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Masukkan password"
            secureTextEntry
          />

          <TouchableOpacity
            style={localStyles.buttonPrimary}
            onPress={handleLogin}
          >
            <Text style={localStyles.buttonPrimaryText}>Login</Text>
          </TouchableOpacity>

          <View style={localStyles.bottomTextWrapper}>
            <Text style={localStyles.smallText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={goToRegister}>
              <Text style={localStyles.linkText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",     
    paddingHorizontal: 24,
  },
  formCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5f5",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f9fafb",
    fontSize: 13,
  },
  buttonPrimary: {
    marginTop: 24,
    backgroundColor: "#2f80ed",
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  bottomTextWrapper: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  smallText: {
    fontSize: 12,
    color: "#6b7280",
  },
  linkText: {
    fontSize: 12,
    color: "#2f80ed",
    fontWeight: "600",
  },
});
