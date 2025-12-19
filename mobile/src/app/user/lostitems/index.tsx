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

  // get data dari API
  const getBarangLost = async () => {
    try {
      const response = await axios.get(strings.api_lost);
      
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
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Lost & Found" style={{ alignItems: "center" }} />
      </Appbar.Header>

      <View style={{ justifyContent: "center", alignItems: "center", padding: 10 }}>
        <Text>Halaman List Kehilangan Barang</Text>
      </View>

      {/* pisah style */}
      <FlatList
        style={{ backgroundColor: "#a31c31", flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 50 }}
        data={ListLost}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card key={item.id} style={{ margin: 20 }}>
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
                style={{ backgroundColor: "white" }}
              >
                <MaterialIcons name="delete" size={24} color="black" />
              </Button>
              <Button onPress={() => console.log("edit")}>
                <MaterialIcons name="edit" size={24} color="black" />
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}