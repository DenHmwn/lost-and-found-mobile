import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { router, useLocalSearchParams }from "expo-router";
import { Appbar } from "react-native-paper";
import { styles } from "@/style/styles";
import { LostReport } from "@/types/interface";
import axios from "axios";

export default function LostDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lost, setLost] = useState<LostReport | null>(null);

  const loadBarang = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/lostreport/${id}`,
        {
          withCredentials: true,
        }
      );
      setLost(response.data.data);
    } catch (error) {
      console.error("Error ambil data:", error);
      router.replace("/user/homepage");
    }
  }
  useEffect(() => {
    loadBarang();
  })
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content
          title="Detail Barang Hilang"
          titleStyle={styles.appBarTitle}
        />
        <Appbar.BackAction onPress={() => router.replace("/user/homepage")} color="#FFFFFF" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Nama Barang</Text>
          <Text style={[styles.input, { paddingVertical: 10 }]}>
            {lost?.namaBarang}
          </Text>

          <Text style={styles.label}>Deskripsi</Text>
          <Text
            style={[
              styles.input,
              styles.textArea,
              { paddingVertical: 10, lineHeight: 20 },
            ]}
          >
           {lost?.deskripsi}
          </Text>

          <Text style={styles.label}>Lokasi Hilang</Text>
          <Text style={[styles.input, { paddingVertical: 10 }]}>
            {lost?.lokasiHilang}
          </Text>

          <Text style={styles.label}>Tanggal & Waktu Hilang</Text>
          <Text style={[styles.input, { paddingVertical: 10 }]}>
            {lost?.tanggalHilang} {lost?.waktuHilang}
          </Text>

          <Text style={styles.label}>Status</Text>
          <View
            style={[
              styles.input,
              {
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <Text>{lost?.statusReport}</Text>
          </View>
          <Text style={styles.label}>Dibuat Pada</Text>
          <Text style={[styles.input, { paddingVertical: 10 }]}>{lost?.createdAt}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
