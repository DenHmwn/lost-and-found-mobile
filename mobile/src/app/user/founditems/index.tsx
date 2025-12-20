// File: LostItemPage.tsx
import { strings } from "@/constans/strings";
import { styles } from "@/style/styles";
import { FoundReport } from "@/types/interface";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Appbar, Button, Card } from "react-native-paper";

export default function FoundItemPage() {
  const formatToWIB = (dateString: string) => {
    if (!dateString) return "Baru saja";
    
    const date = new Date(dateString);
    
    // Format: 20 Des 2024, 14:30 WIB
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date) + ' WIB';
  };

  const [ListFound, setListFound] = useState<FoundReport[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState<FoundReport[]>([]);

  useEffect(() => {
    getBarangFound();
  }, []);

  useEffect(() => {
    const filtered = ListFound.filter(
      (item) =>
        item.namaBarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lokasiTemu.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchQuery, ListFound]);

  const getBarangFound = async () => {
    try {
      const response = await axios.get(strings.api_found);
      
      if (Array.isArray(response.data)) {
        setListFound(response.data);
      } else if (response.data.data) {
        setListFound(response.data.data);
      }
    } catch (error) {
      console.error("Error ambil data:", error);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="inventory" size={80} color="#CBD5E1" />
      <Text style={styles.emptyTitle}>Tidak Ada Data</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery ? "Coba kata kunci lain" : "Belum ada laporan penemuan barang"}
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Searchbar
        placeholder="Cari barang atau lokasi penemuan..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#64748B"
        inputStyle={styles.searchInput}
        elevation={0}
      />
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="check-circle" size={24} color={color.primary} />
          <View style={styles.statTextContainer}>
            <Text style={styles.statNumber}>{ListFound.length}</Text>
            <Text style={styles.statLabel}>Barang Ditemukan</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="search" size={24} color={color.accent} />
          <View style={styles.statTextContainer}>
            <Text style={styles.statNumber}>{filteredList.length}</Text>
            <Text style={styles.statLabel}>Hasil Cari</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={color.primary} />
      
      <Appbar.Header style={styles.appBar} elevated>
        <Appbar.Content 
          title="Found Items" 
          titleStyle={styles.appBarTitle}
        />
        <Appbar.Action 
          icon="bell-outline" 
          onPress={() => console.log("Notifikasi")}
          color="#FFFFFF"
        />
      </Appbar.Header>

      <View style={styles.pageTitleContainer}>
        <Text style={styles.PageTitle}>Halaman List Penemuan Barang</Text>
      </View>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        data={ListLost}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card}>
            <Card.Title
              title={item.namaBarang}
              subtitle={item.lokasiTemu}
              titleStyle={{ fontSize: 20 }}
            />
            <Card.Actions>
              <Button
                onPress={() => console.log("edit")}
                style={{ backgroundColor: "#5B7FFF" }}
              >
                <MaterialIcons name="info" size={24} color="black" />
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
