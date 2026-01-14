import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";
import { styles, color } from "@/style/styles";
import { decodeJwtPayload } from "@/utils/decoded";
import { LostReport} from "@/types/interface";
import axios from "axios";

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
    tanggalHilang: "",
    waktuHilang: "",
    });

    const handleSubmit = async() => {
        const token = localStorage.getItem("refreshToken");
        const decoded = decodeJwtPayload(token || "");
        const res = await axios.post("http://localhost:3001/api/lostreport",{
            id : decoded.id,
            namaBarang : barang.namaBarang,
            deskripsi : barang.deskripsi,
            lokasiHilang : barang.lokasiHilang,
            status : barang.status,
            statusReport : barang.statusReport,
            createdAt : barang.createdAt,
            userId : decoded.id,
            tanggalHilang : barang.tanggalHilang,
            waktuHilang : barang.waktuHilang
        })
        console.log(res.status);
    }

    useEffect(() => {
       
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
              value={barang?.namaBarang}
              onChangeText={(text) =>
                setBarang(prev => ({
                ...prev,
                namaBarang: text
                }))
            }
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Deskripsi</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Contoh: kunci motor Honda warna hitam..."
              placeholderTextColor={color.textSecondary}
              multiline
              value={barang?.deskripsi}
              onChangeText={(text) =>
                setBarang(prev => ({
                ...prev,
                deskripsi: text
                }))
            }
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Lokasi Hilang</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: PS 77"
              placeholderTextColor={color.textSecondary}
              value={barang?.lokasiHilang}
              onChangeText={(text) =>
                setBarang(prev => ({
                ...prev,
                lokasiHilang: text
                }))
            }
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Tanggal Hilang</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD (misal: 2025-12-08)"
              placeholderTextColor={color.textSecondary}
              value={barang?.tanggalHilang}
              onChangeText={(text) =>
                setBarang(prev => ({
                ...prev,
                tanggalHilang: text
                }))
            }
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Waktu Hilang</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 09.00"
              placeholderTextColor={color.textSecondary}
              value={barang?.waktuHilang}
              onChangeText={(text) =>
                setBarang(prev => ({
                ...prev,
                waktuHilang: text
                }))
            }
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


