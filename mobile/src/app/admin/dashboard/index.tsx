import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import StatCard from "@/components/StatCard";
import { AdminService } from "@/services/admin.service";
import { toUiStats } from "@/adapters/admin.adapter";
import { UiStats } from "@/types/admin.ui";

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState<UiStats | null>(null);
    const [error, setError] = useState<string | null>(null);
}

const load = async () => {
    setError(null);
    try {
        const raw = await AdminService.getStats();
        setStats(toUiStats(raw));
} catch (e: any) {
    setError(e.message);
} finally {
    setLoading(false);
    setRefreshing(false);
}
};

useEffect(() => { load(); }, []);

if (loading) {
  return (
    <View style={styles.center}>
        <ActivityIndicator size="large" />
    </View>
  );
}

return (
  <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}
  contentContainerStyle={{ padding: 16, gap: 12 }}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
>
    <Text style={styles.title}>Dashboard</Text>
    <Text style={styles.sub}>Ringkasan laporan & user</Text>
    {error && <Text style={{ color: "tomato" }}>{error}</Text>}

    <View style={styles.row}>
      <StatCard label="Total Hilang" value={stats?.totalLost ?? 0} />
      <StatCard label="Total Ditemukan" value={stats?.totalFound ?? 0} />

    </View>

  </ScrollView>
);
