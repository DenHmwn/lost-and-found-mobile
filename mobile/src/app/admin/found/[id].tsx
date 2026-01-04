import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AdminService } from "@/services/admin.service";
import { toUiReport } from "@/adapters/admin.adapter";
import { UiReport } from "@/types/admin.ui";
import { formatDateTime } from "@/utils/date";

export default function FoundDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<UiReport | null>(null);

  const load = async () => {
    try {
      const raw = await AdminService.getReportById(String(id));
      setItem(toUiReport(raw, "found"));
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

    return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>Lokasi: {item.location}</Text>
      <Text style={styles.meta}>Pelapor: {item.reporterName}</Text>
      <Text style={styles.meta}>Tanggal: {formatDateTime(item.createdAtISO)}</Text>

      <View style={styles.panel}>
        <Text style={styles.label}>Deskripsi</Text>
        <Text style={styles.value}>{item.description || "-"}</Text>

        <Text style={styles.label}>Approval</Text>
        <Text style={styles.value}>{item.approvalStatus}</Text>

        <Text style={styles.label}>Status Proses</Text>
        <Text style={styles.value}>{item.processStatus}</Text>
      </View>

      <View style={styles.actionsRow}>
        {item.approvalStatus === "pending" ? (
          <>
            <Pressable style={[styles.btn, styles.ok]} onPress={() => action("approve")}>
              <Text style={styles.btnText}>Approve</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.danger]} onPress={() => action("reject")}>
              <Text style={styles.btnText}>Reject</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable style={[styles.btn, styles.ok]} onPress={() => action("done")}>
              <Text style={styles.btnText}>Done</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.gray]} onPress={() => action("close")}>
              <Text style={styles.btnTextDark}>Closed</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff", padding: 16, gap: 10 },
  title: { fontSize: 18, fontWeight: "900" },
  meta: { color: "#666" },
  panel: { borderWidth: 1, borderColor: "#eee", borderRadius: 14, padding: 14, gap: 8 },
  label: { color: "#666" },
  value: { fontWeight: "800" },
  actionsRow: { flexDirection: "row", gap: 10, marginTop: 6 },
  btn: { flex: 1, padding: 12, borderRadius: 12, alignItems: "center" },
  btnText: { color: "white", fontWeight: "900" },
  btnTextDark: { color: "#111", fontWeight: "900" },
  ok: { backgroundColor: "green" },
  danger: { backgroundColor: "tomato" },
  gray: { backgroundColor: "#e5e7eb" },
});

