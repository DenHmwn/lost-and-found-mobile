import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import StatCard from "@/components/StatCard";
import ReportCard from "@/components/ReportCard";
import { AdminService } from "@/services/admin.service";
import { toUiReport } from "@/adapters/admin.adapter";
import { UiReport } from "@/types/admin.ui";

export default function FoundList() {
  const [items, setItems] = useState<UiReport[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    try {
      const raw = await AdminService.listReports("found");
      setItems(raw.map((r) => toUiReport(r, "found")));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);
}
