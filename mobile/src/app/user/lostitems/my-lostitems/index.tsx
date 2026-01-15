import { styles } from "@/style/styles";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StatusBar } from "react-native";
import { Appbar, Card, Chip, FAB } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { LostReport } from "@/types/interface";
import { formatToWIB } from "@/utils/scripts";
import { router } from "expo-router";
import { decodeJwtPayload } from "@/utils/decoded";


export default function LostItemPage() {
  const [token, setToken] = useState<string | null>(null);
  const [ListLost, setListLost] = useState<LostReport[]>([]);
  const getToken = () => {
    const ref = localStorage.getItem("refreshToken");
    setToken(ref);
  }

  useEffect(() => {
    getToken();
    getBarangLost();
  }, [token]);
  const getBarangLost = async () => {
    try {
      const decoded = decodeJwtPayload(token || "");
      const response = await axios.get(`http://localhost:3001/api/user/${decoded.id}`, {
        withCredentials: true,
      });
      
    const payload = response.data; 
    const userData = payload.data ; 
    const lost = userData.lostReports;
    setListLost(lost);       

    } catch (error) {
      console.error("Error ambil data:", error);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="inventory-2" size={24} color="#3B82F6" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statNumber}>{ListLost.length}</Text>
            <Text style={styles.statLabel}>Total Barang</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      
      <Appbar.Header style={styles.appBar} elevated>
        <Appbar.Content 
          title="Lost & Found" 
          titleStyle={styles.appBarTitle}
        />
        <Appbar.Action 
          icon="bell-outline" 
          onPress={() => console.log("Notifikasi")}
          color="#FFFFFF"
        />
      </Appbar.Header>

      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        data={ListLost}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card style={styles.modernCard} elevation={2}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="inventory-2" size={24} color="#3B82F6" />
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.namaBarang}
                </Text>
                <View style={styles.locationContainer}>
                  <MaterialIcons name="place" size={14} color="#64748B" />
                  <Text style={styles.cardLocation} numberOfLines={1}>
                    {item.lokasiHilang}
                  </Text>
                </View>
              </View>
            </View>

            {item.deskripsi && (
              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.deskripsi}
              </Text>
            )}

            <View style={styles.cardFooter}>
              <Chip 
                icon="clock-outline" 
                style={styles.timeChip}
                textStyle={styles.chipText}
              >
                {formatToWIB(item.tanggalHilang as string)}
              </Chip>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => console.log("edit", item.id)}
                >
                  <MaterialIcons name="edit" size={18} color="#FFFFFF" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => {
                  }}
                >
                  <MaterialIcons name="delete" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.replace("/user/lostitems/add")}
        color="#FFFFFF"
      />     
    </View>
  );
}