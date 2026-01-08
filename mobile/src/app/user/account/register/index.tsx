import { styles } from "@/style/styles";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Appbar, TextInput } from "react-native-paper";

export default function LoginPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleRegister = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/auth/register", {
                name,
                email,
                password,
                confirmPassword,
                notelp : phone,
            }, {
                withCredentials: true,
            });
            if (res.data.success) {
                console.log("Register successful:", res.data.message);
            }else{
                console.error("Register failed:", res.data.message);
            }
           
        } catch (error) {
            console.error("Register failed:", error);
        }
    };

    const handleUserLogin = () => {
              router.replace('/user/account/login')
          };
    return (
       <View style={{ flex: 1, backgroundColor: "#f7f7ff" }}>
            <Appbar.Header style={styles.appBar} elevated>
            <Appbar.Content title="Register" titleStyle={styles.appBarTitle} />
            </Appbar.Header>

            <View style={localStyles.container}>
                <Text style={localStyles.label}>Nama</Text>
                <TextInput
                style={localStyles.input}
                value={name}
                onChangeText={setName}
                placeholder="Masukkan nama"
             />

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

            <Text style={localStyles.label}>Confirm Password</Text>
            <TextInput
            style={localStyles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Masukkan password"
            secureTextEntry
            />

            <Text style={localStyles.label}>No Telepon</Text>
            <TextInput
            style={localStyles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Masukkan no telepon"
            keyboardType="phone-pad"
            />

            <TouchableOpacity
            style={localStyles.buttonPrimary}
                onPress={handleRegister}
            >
            <Text style={localStyles.buttonPrimaryText}>Register</Text>
            </TouchableOpacity>

            <View style={localStyles.bottomTextWrapper}>
                <Text style={localStyles.smallText}>Sudah punya akun? </Text>
                <TouchableOpacity >
                    <Text 
                    style={localStyles.linkText}
                    onPress={handleUserLogin}
                    >Login
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
       </View>
    )
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
