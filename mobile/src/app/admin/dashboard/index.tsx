import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { AdminService } from "@/services/admin.service";
import { toUiStats } from "@/adapters/admin.adapter";
import { UiStats } from "@/types/admin.ui";
import { StatCard } from "@/components/startcard";
import axios from "axios";
import { LostReport } from "@/types/interface";

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState<UiStats | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lost, setLost] = useState<LostReport[]>([]);
    const [totalDone, setTotalDone] = useState(0);
    const [totalProgress, setTotalProgress] = useState(0);
    const [totalClosed, setTotalClosed] = useState(0);

const load = async () => {
    const res = await axios.get("http://localhost:3001/api/lostreport", {
      withCredentials: true
    })
    setLost(res.data.data)

    const totalDone = lost.filter(
    (item) => item.statusReport === "Done"
    ).length;
    setTotalDone(totalDone);

    const progress = lost.filter(
    (item) => item.statusReport === "OnProgress"
    ).length;
    setTotalProgress(progress);

    const closed = lost.filter(
    (item) => item.statusReport === "Closed"
    ).length;
    setTotalProgress(closed);
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
      <StatCard label="Total Hilang" value={lost?.length ?? 0} />
      <StatCard label="Total Ditemukan" value={totalDone ?? 0} />
    </View>

    <View style={styles.row}>
      <StatCard label="Menunggu" value={stats?.pendingApproval ?? 0} />
      <StatCard label="Dalam Proses" value={stats?.inProcess ?? 0} />
    </View>

    <View style={styles.row}>
      <StatCard label="Disetujui" value={stats?.approved ?? 0} />
      <StatCard label="Total Users" value={stats?.totalUsers ?? 0} />
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
    center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "900" },
    sub: { color: "#666", marginTop: -6 },
    row: { flexDirection: "row", gap: 12 },
});
