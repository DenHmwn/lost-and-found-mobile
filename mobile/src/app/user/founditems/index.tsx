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
  const [ListLost, setListLost] = useState<FoundReport[]>([]);

  useEffect(() => {
    getBarangLost();
  }, []);

  // get data dari API
  const getBarangLost = async () => {
    try {
      const response = await axios.get(strings.api_found);

      // Cek apa isi response di Terminal Metro Bundler
      // console.log("DATA DARI API:", JSON.stringify(response.data, null, 2));

      // Cek struktur data sebelum set state
      if (Array.isArray(response.data)) {
        setListLost(response.data);
      } else if (response.data.data) {
        setListLost(response.data.data);
      } else {
        // console.log("Struktur data tidak dikenali, cek backend");
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
