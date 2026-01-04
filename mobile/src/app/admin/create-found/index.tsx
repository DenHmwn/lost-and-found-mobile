import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AdminService } from "@/services/admin.service";
import { router } from "expo-router";

export default function CreateFound() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

    const submit = async () => {
    if (!title || !location || !reporterName) {
      Alert.alert("Validasi", "Judul, lokasi, dan pelapor wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      await AdminService.createFoundReport({ title, location, reporterName, description });
      Alert.alert("Sukses", "Laporan temuan berhasil dibuat.");
      router.replace("/admin/found");
    } catch (e: any) {
      Alert.alert("Gagal", e.message);
    } finally {
      setLoading(false);
    }
  };

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Laporan Temuan</Text>
      <Text style={styles.sub}>Tambah laporan barang ditemukan</Text>

      <TextInput style={styles.input} placeholder="Judul" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Lokasi" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Nama Pelapor" value={reporterName} onChangeText={setReporterName} />
      <TextInput
        style={[styles.input, { height: 110, textAlignVertical: "top" }]}
        placeholder="Deskripsi (opsional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Pressable style={[styles.btn, loading && { opacity: 0.7 }]} onPress={submit} disabled={loading}>
        <Text style={styles.btnText}>{loading ? "Menyimpan..." : "Simpan"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, gap: 10 },
  title: { fontSize: 18, fontWeight: "900" },
  sub: { color: "#666", marginTop: -6 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 12 },
  btn: { backgroundColor: "#2563eb", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 6 },
  btnText: { color: "white", fontWeight: "900" },
});

