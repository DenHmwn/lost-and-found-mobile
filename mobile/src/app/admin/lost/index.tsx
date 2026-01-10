import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AdminService } from "@/services/admin.service";
import { toUiReport } from "@/adapters/admin.adapter";
import { UiReport } from "@/types/admin.ui";
import ReportCard from "@/components/reportcard";
import { StatCard } from "@/components/startcard";

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

    return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Barang Hilang</Text>
      <Text style={styles.pageSub}>Kelola laporan barang hilang</Text>

      <View style={styles.row}>
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Menunggu" value={stats.pending} />
      </View>
      <View style={styles.row}>
        <StatCard label="Disetujui" value={stats.approved} />
        <StatCard label="Proses" value={stats.inProcess} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(x) => x.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={{ gap: 10 }}>
            <ReportCard item={item} onPress={() => router.push(`/admin/lost/${item.id}`)} />

            <View style={styles.actionsRow}>
              {item.approvalStatus === "pending" ? (
                <>
                  <Pressable style={[styles.btn, styles.ok]} onPress={() => action(item.id, "approve")}>
                    <Text style={styles.btnText}>Approve</Text>
                  </Pressable>
                  <Pressable style={[styles.btn, styles.danger]} onPress={() => action(item.id, "reject")}>
                    <Text style={styles.btnText}>Reject</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable style={[styles.btn, styles.ok]} onPress={() => action(item.id, "done")}>
                    <Text style={styles.btnText}>Done</Text>
                  </Pressable>
                  <Pressable style={[styles.btn, styles.gray]} onPress={() => action(item.id, "close")}>
                    <Text style={styles.btnTextDark}>Closed</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, gap: 10 },
  pageTitle: { fontSize: 20, fontWeight: "900" },
  pageSub: { color: "#666", marginTop: -6 },
  row: { flexDirection: "row", gap: 12 },
  actionsRow: { flexDirection: "row", gap: 10 },
  btn: { flex: 1, padding: 12, borderRadius: 12, alignItems: "center" },
  btnText: { color: "white", fontWeight: "900" },
  btnTextDark: { color: "#111", fontWeight: "900" },
  ok: { backgroundColor: "green" },
  danger: { backgroundColor: "tomato" },
  gray: { backgroundColor: "#e5e7eb" },
});

