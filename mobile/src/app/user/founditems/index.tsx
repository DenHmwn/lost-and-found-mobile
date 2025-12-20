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

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const message = useRef("");
  const [id, setId] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Appbar.Header style={styles.background}>
        <Appbar.Content
          title="Lost & Found"
          titleStyle={styles.PageTitle}
          style={styles.PageTitle}
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
