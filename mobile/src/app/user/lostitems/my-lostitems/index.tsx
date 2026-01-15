import { styles } from "@/style/styles";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { LostReport } from "@/types/interface";
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

  
}