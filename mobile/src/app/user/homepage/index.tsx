import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Appbar, BottomNavigation, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles, color } from "@/style/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LostItemPage from "../lostitems";
import FoundItemPage from "../founditems";
import AccountPageUser from "../account";
import ListAdminPage from "../list-admin";

const { width } = Dimensions.get("window");

// Halaman HomePage - Profile Program
const HomeRoute = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar} elevated>
        <Appbar.Content title="Lost & Found" titleStyle={styles.appBarTitle} />
        <Appbar.Action
          icon="information-outline"
          onPress={() => console.log("Info")}
          color="#FFFFFF"
        />
      </Appbar.Header>

      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Profile Program */}
        <View
          style={{
            padding: 24,
            alignItems: "center",
            backgroundColor: color.primary,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "700",
              color: "#FFFFFF",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Lost and Found
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "#FFFFFF",
              opacity: 0.95,
              textAlign: "center",
              lineHeight: 20,
              paddingHorizontal: 20,
            }}
          >
            Platform Digital Pencarian Barang Hilang
          </Text>
        </View>

        {/* About Section */}
        <View style={{ padding: 20 }}>
          <View
            style={{
              backgroundColor: color.cardBg,
              borderRadius: 16,
              padding: 20,
              elevation: 2,
              borderWidth: 1,
              borderColor: color.border,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <MaterialIcons
                name="info-outline"
                size={24}
                color={color.primary}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: color.text,
                  marginLeft: 8,
                }}
              >
                Tentang Program
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: color.textSecondary,
                lineHeight: 22,
              }}
            >
              Lost & Found System adalah aplikasi mobile yang dirancang untuk
              memudahkan pengguna dalam melaporkan dan mencari barang hilang
              atau barang temuan. Sistem ini menyediakan platform yang efisien
              untuk menghubungkan pemilik barang dengan penemu.
            </Text>
          </View>

          {/* Vision & Mission */}
          <View
            style={{
              backgroundColor: color.cardBg,
              borderRadius: 16,
              padding: 20,
              elevation: 2,
              borderWidth: 1,
              borderColor: color.border,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <MaterialIcons
                name="visibility"
                size={24}
                color={color.primary}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: color.text,
                  marginLeft: 8,
                }}
              >
                Visi
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: color.textSecondary,
                lineHeight: 22,
                marginBottom: 20,
              }}
            >
              Menjadi platform terpercaya dan efektif dalam membantu mahasiswa
              menemukan kembali barang hilang nya.
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <MaterialIcons name="flag" size={24} color={color.primary} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: color.text,
                  marginLeft: 8,
                }}
              >
                Misi
              </Text>
            </View>
            {[
              "Menyediakan sistem pelaporan yang mudah dan cepat",
              "Membantu menghubungkan pemilik dengan penemu barang",
              "Memudahkan mahasiswa unutk menemukan barang hilang",
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  marginBottom: 8,
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: color.primary,
                    marginTop: 7,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: color.textSecondary,
                    lineHeight: 22,
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {/* Features */}
          <View
            style={{
              backgroundColor: color.cardBg,
              borderRadius: 16,
              padding: 20,
              elevation: 2,
              borderWidth: 1,
              borderColor: color.border,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <MaterialIcons name="star" size={24} color={color.primary} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: color.text,
                  marginLeft: 8,
                }}
              >
                Fitur Unggulan
              </Text>
            </View>

            {[
              {
                icon: "add-alert",
                title: "Laporan Mudah",
                desc: "Interface sederhana untuk membuat laporan",
              },
              {
                icon: "search",
                title: "Pencarian Cepat",
                desc: "Temukan barang dengan filter lengkap",
              },
              {
                icon: "notifications-active",
                title: "Notifikasi",
                desc: "Dapatkan update segera",
              },
              {
                icon: "security",
                title: "Data Aman",
                desc: "Privasi dan keamanan terjaga",
              },
            ].map((feature, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  borderBottomWidth: index < 3 ? 1 : 0,
                  borderBottomColor: color.border,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: color.secondary,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <MaterialIcons
                    name={feature.icon}
                    size={22}
                    color={color.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: color.text,
                      marginBottom: 2,
                    }}
                  >
                    {feature.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: color.textSecondary,
                    }}
                  >
                    {feature.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Contact Info */}
          <View
            style={{
              backgroundColor: color.secondary,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: color.border,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <MaterialIcons
                name="contact-mail"
                size={24}
                color={color.primary}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: color.text,
                  marginLeft: 8,
                }}
              >
                Kontak & Dukungan
              </Text>
            </View>

            {[
              {
                icon: "email",
                label: "Email",
                value: "lostandfound@gmail.com",
              },
              {
                icon: "language",
                label: "Website",
                value: "www.lostandfound.com",
              },
            ].map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <MaterialIcons
                  name={contact.icon}
                  size={20}
                  color={color.primary}
                />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: color.textSecondary,
                      marginBottom: 2,
                    }}
                  >
                    {contact.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: color.text,
                      fontWeight: "500",
                    }}
                  >
                    {contact.value}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Version Info */}
          <View
            style={{
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: color.textSecondary,
                marginBottom: 4,
              }}
            >
              Lost & Found System
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: color.text,
                fontWeight: "600",
              }}
            >
              Version 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default function HomePageUser() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "lost",
      title: "Lost",
      focusedIcon: "help-box",
      unfocusedIcon: "help-box-outline",
    },
    {
      key: "found",
      title: "Found",
      focusedIcon: "briefcase-check",
      unfocusedIcon: "briefcase-check-outline",
    },
    {
      key: "listadmin",
      title: "List Admin",
      focusedIcon: "format-list-bulleted",
      unfocusedIcon: "format-list-bulleted",
    },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    lost: LostItemPage,
    found: FoundItemPage,
    listadmin: ListAdminPage,
    account: AccountPageUser,
  });

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={{ backgroundColor: color.primary }}
          activeColor="#FFFFFF"
          inactiveColor="rgba(255, 255, 255, 0.6)"
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
