// File: LostItemPage.tsx
import { styles } from "@/style/styles";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Appbar, Button, Card } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { strings } from "@/constans/strings";

export default function LostItemPage() {
  
  // buat react hook
  const [ListLost, setListLost] = useState<
  {
    id: number;
    namaBarang: string;
    deskripsi: string;
    lokasiHilang: string;
    status: string;
    statusReport: string;
  }[]
  >([]);
  
  useEffect(() => {
    getBarangLost();
  },[]);

  // get data dari API
  const getBarangLost = async () => {
    const response = await axios.get(strings.api_lost);
    // console.log(response.data.barang);
    setListLost(response.data.data);
  };

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  // buat useRef untuk menampilkan pesan hapus data
  const message = useRef("");
  // buat useRef untuk menampilkan pesan hapus data
  const messageResponse = useRef("");

  // state untuk simpan id barang
  const [id, setId] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Appbar.Header style={styles.header}>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Content title="Lost & Found" style={{ alignItems: "center" }} />
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
        {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
      </Appbar.Header>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Halaman List Kehilangan Barang</Text>
      </View>

      <FlatList
        style={{ backgroundColor: "#a31c31" }}
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
                <MaterialIcons
                  name="delete"
                  size={24}
                  color="black"
                ></MaterialIcons>
              </Button>
              <Button onPress={() => console.log("edit")}>
                <MaterialIcons
                  name="edit"
                  size={24}
                  color="black"
                ></MaterialIcons>
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
