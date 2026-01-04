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

    const stats = useMemo(() => {
    const total = items.length;
    const pending = items.filter((x) => x.approvalStatus === "pending").length;
    const approved = items.filter((x) => x.approvalStatus === "approved").length;
    const inProcess = items.filter((x) => x.processStatus === "in_progress").length;
    return { total, pending, approved, inProcess };
  }, [items]);

  const action = async (id: string, type: "approve" | "reject" | "done" | "close") => {
    try {
      if (type === "approve") await AdminService.approve(id);
      if (type === "reject") await AdminService.reject(id);
      if (type === "done") await AdminService.done(id);
      if (type === "close") await AdminService.close(id);
      await load();
    } catch (e: any) {
      Alert.alert("Gagal", e.message);
    }
  };

}
