// File: LostItemPage.tsx
import { styles } from "@/style/styles";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Appbar} from "react-native-paper";
import { decode as base64Decode } from "base-64";
import { SafeAreaView } from "react-native-safe-area-context";


const decodeJwtPayload = (token: string) => {
  if (!token) throw new Error("Token kosong");
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = base64Decode(base64); 
  return JSON.parse(jsonPayload);
};

export default function AccountPageUser() {
  const [user, setUser] = useState<{ name: string; email: string; notelp: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
      const loadTokenAndUser = async () => {
        try {
      const storedToken = localStorage.getItem("refreshToken");
      console.log("Token:", storedToken);
      setToken(storedToken);
      
      if (!storedToken) return;
      const decoded = decodeJwtPayload(token || "");
      setUser({
          name: decoded.name ?? "",
          email: decoded.email ?? "",
          notelp : decoded.notelp ?? "",
        });
      } catch (err) {
        console.log("Error decode token:", err);
      }
    }
      
      loadTokenAndUser();
  }, [token]);
  
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
      
        {token && user ? (
            <SafeAreaView style={localStyles.root}>
              <ScrollView
              style={localStyles.scroll}
              contentContainerStyle={localStyles.scrollContent}
              >
                <View style={localStyles.container}>
                  <View style={localStyles.header}>
                    <Text style={localStyles.headerTitle}>Ubah Profil</Text>
                    
                    <View style={localStyles.avatarSection}>
                      <Image
                        source={{ uri: 'https://youtube.com' }}
                        style={localStyles.avatar}
                      />
                      <TouchableOpacity>
                        <Text style={localStyles.changePhotoText}>Ubah Foto Profil</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={localStyles.section}>
                      <Text style={localStyles.sectionTitle}>Info profil</Text>

                      <TouchableOpacity style={localStyles.row}>
                        <Text style={localStyles.labell}>Nama</Text>
                        <Text style={localStyles.value}>Dehendy Wijaya</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={localStyles.row}>
                        <Text style={localStyles.labell}>Email</Text>
                        <Text style={localStyles.placeholder}>@gmail.com</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={localStyles.row}>
                        <Text style={localStyles.labell}>No HP</Text>
                        <Text style={localStyles.placeholder}>08239312</Text>
                      </TouchableOpacity>
                    </View>
                 </View>
                </View>
              </ScrollView>
            </SafeAreaView>
           ) : (  
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
           )}  
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
  labell: {
    fontSize: 14,
    color: '#777',
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EEE',
  },
  changePhotoText: {
    marginTop: 8,
    color: '#2200ff',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 14,
    color: '#111',
  },
  placeholder: {
    fontSize: 14,
    color: '#B0B0B0',
  },
});
