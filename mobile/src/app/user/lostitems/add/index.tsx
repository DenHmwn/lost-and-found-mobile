import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";
import { styles, color } from "@/style/styles";
import { decodeJwtPayload } from "@/utils/decoded";
import { LostReport} from "@/types/interface";

export default function LostItemForm() {
    const [barang, setBarang] = useState<LostReport>({
    id: 0,
    namaBarang: "",
    deskripsi: "",
    lokasiHilang: "",
    status: "PENDING",
    statusReport: "OnProgress",
    createdAt: "",
    userId: 0 ,
    tanggalHilang: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("refreshToken");
        const decoded = decodeJwtPayload(token || "");
        
    })
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar} elevated>
        <Appbar.BackAction onPress={() => router.back()} color="#FFFFFF" />
        <Appbar.Content title="Laporkan Barang Hilang" titleStyle={styles.appBarTitle} />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detail Barang</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Nama Barang</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: kunci motor beat"
              placeholderTextColor={color.textSecondary}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Deskripsi</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Contoh: kunci motor Honda warna hitam..."
              placeholderTextColor={color.textSecondary}
              multiline
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Lokasi Hilang</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: PS 77"
              placeholderTextColor={color.textSecondary}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Tanggal Hilang</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD (misal: 2025-12-08)"
              placeholderTextColor={color.textSecondary}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Waktu Hilang</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 09.00"
              placeholderTextColor={color.textSecondary}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress= {() => {}}>
            <Text style={styles.submitText}>Kirim Laporan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


