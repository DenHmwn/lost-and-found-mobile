import { styles } from "@/style/styles";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Appbar, Button, Card } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { strings } from "@/constans/strings";
import { LostReport } from "@/types/interface";

export default function LostItemPage() {
  const [ListLost, setListLost] = useState<LostReport[]>([]);

  useEffect(() => {
    getBarangLost();
  }, []);

  useEffect(() => {
    const filtered = ListLost.filter(
      (item) =>
        item.namaBarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lokasiHilang.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchQuery, ListLost]);

  const getBarangLost = async () => {
    try {
      const response = await axios.get(strings.api_lost);
      
      if (Array.isArray(response.data)) {
        setListLost(response.data);
      } else if (response.data.data) {
        setListLost(response.data.data);
      }
    } catch (error) {
      console.error("Error ambil data:", error);
    }
  };

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const message = useRef("");
  const [id, setId] = useState(0);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="search-off" size={80} color="#CBD5E1" />
      <Text style={styles.emptyTitle}>Tidak Ada Data</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery ? "Coba kata kunci lain" : "Belum ada laporan kehilangan"}
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Searchbar
        placeholder="Cari barang atau lokasi..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#64748B"
        inputStyle={styles.searchInput}
        elevation={0}
      />
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="inventory-2" size={24} color="#3B82F6" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statNumber}>{ListLost.length}</Text>
            <Text style={styles.statLabel}>Total Barang</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="search" size={24} color="#F59E0B" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statNumber}>{filteredList.length}</Text>
            <Text style={styles.statLabel}>Hasil Cari</Text>
          </View>
        </View>
      </View>

      {/* pisah style */}
      <FlatList
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 50 }}
        data={ListLost}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card key={item.id} style={ styles.card }>
            <Card.Title
              title={item.namaBarang}
              subtitle={item.lokasiHilang}
              titleStyle={{ fontSize: 20 }}
            />
            <Card.Actions>
              <Button
                onPress={() => {
                  setId(item.id);
                  showDialog();
                  message.current = item.namaBarang;
                }}
                style={{ backgroundColor: "#EF4444" }}
              >
                <MaterialIcons name="delete" size={24} color="black" />
              </Button>
              <Button onPress={() => console.log("edit")} style={{ backgroundColor: "#5B7FFF" }}>
                <MaterialIcons name="edit" size={24} color="black" />
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}