import { styles, color } from "@/style/styles";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StatusBar } from "react-native";
import { Appbar, Card, Searchbar, Chip } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { strings } from "@/constans/strings";
import { FoundReport } from "@/types/interface";
import { formatToWIB } from "@/utils/scripts";

export default function FoundItemPage() {

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
                <MaterialIcons name="inventory-2" size={24} color={color.primary} />
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.namaBarang}
                </Text>
                <View style={styles.locationContainer}>
                  <MaterialIcons name="place" size={14} color="#64748B" />
                  <Text style={styles.cardLocation} numberOfLines={1}>
                    {item.lokasiTemu}
                  </Text>
                </View>
              </View>
            </View>

            {/* {item.deskripsi && (
              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.deskripsi}
              </Text>
            )} */}

            <View style={styles.cardFooter}>
              <Chip 
                icon="clock-outline" 
                style={styles.timeChip}
                textStyle={styles.chipText}
              >
                {formatToWIB(item.tanggalTemu as string)}
              </Chip>
              
              <TouchableOpacity
                style={[styles.actionButton, { 
                  backgroundColor: color.primary,
                  width: 'auto',
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  gap: 6
                }]}
                onPress={() => console.log("Detail item:", item.id)}
              >
                <MaterialIcons name="info" size={18} color="#FFFFFF" />
                <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>
                  Detail
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
    </View>
  );
}