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
      setError(e.message);
    }
  };

}

