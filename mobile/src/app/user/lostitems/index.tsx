import { styles } from "@/style/styles";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StatusBar } from "react-native";
import { Appbar, Button, Card, Searchbar, Chip, FAB } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { strings } from "@/constans/strings";
import { LostReport } from "@/types/interface";
import { formatToWIB } from "@/utils/scripts";

export default function LostItemPage() {

  const [ListLost, setListLost] = useState<LostReport[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState<LostReport[]>([]);

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
        data={filteredList}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
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
                    setId(item.id);
                    showDialog();
                    message.current = item.namaBarang;
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
        onPress={() => console.log("Tambah laporan")}
        color="#FFFFFF"
      />
    </View>
  );
}