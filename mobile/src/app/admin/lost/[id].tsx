import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AdminService } from "@/services/admin.service";
import { toUiReport } from "@/adapters/admin.adapter";
import { UiReport } from "@/types/admin.ui";
import { formatDateTime } from "@/utils/date";

export default function LostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<UiReport | null>(null);

  const load = async () => {
    try {
      const raw = await AdminService.getReportById(String(id));
      setItem(toUiReport(raw, "lost"));
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

    const action = async (type: "approve" | "reject" | "done" | "close") => {
    if (!item) return;
    try {
      if (type === "approve") await AdminService.approve(item.id);
      if (type === "reject") await AdminService.reject(item.id);
      if (type === "done") await AdminService.done(item.id);
      if (type === "close") await AdminService.close(item.id);
      await load();
    } catch (e: any) {
      Alert.alert("Gagal", e.message);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!item) return <View style={styles.container}><Text>Data tidak ditemukan</Text></View>;

}
