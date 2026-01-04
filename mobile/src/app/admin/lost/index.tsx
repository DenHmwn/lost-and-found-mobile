import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import StatCard from "@/components/StatCard";
import ReportCard from "@/components/ReportCard";
import { AdminService } from "@/services/admin.service";
import { toUiReport } from "@/adapters/admin.adapter";
import { UiReport } from "@/types/admin.ui";

export default function LostList() {
  const [items, setItems] = useState<UiReport[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      const raw = await AdminService.listReports("lost");
      setItems(raw.map((r) => toUiReport(r, "lost")));
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => { load(); }, []);

  
}
