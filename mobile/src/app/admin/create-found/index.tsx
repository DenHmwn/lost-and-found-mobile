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

  return <View />;
}
