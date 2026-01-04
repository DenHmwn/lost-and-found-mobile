import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, RefreshControl, StyleSheet, Text, TextInput, View } from "react-native";
import { AdminService } from "@/services/admin.service";
import { toUiUser } from "@/adapters/admin.adapter";
import { UiUser } from "@/types/admin.ui";

export default function UsersPage() {
  const [data, setData] = useState<UiUser[]>([]);
  const [q, setQ] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      const raw = await AdminService.listUsers();
      setData(raw.map(toUiUser));
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => { load(); }, []);

    const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    return data.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
  }, [q, data]);

    return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Cari user..." value={q} onChangeText={setQ} />

      <FlatList
        data={filtered}
        keyExtractor={(x) => x.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.email}</Text>
            <Text style={styles.meta}>Role: {item.role ?? "user"}</Text>
            <Text style={[styles.badge, item.status === "active" ? styles.ok : styles.bad]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, gap: 10 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 12 },
  card: { borderWidth: 1, borderColor: "#eee", borderRadius: 14, padding: 14, gap: 6 },
  name: { fontSize: 16, fontWeight: "900" },
  meta: { color: "#666" },
  badge: { alignSelf: "flex-start", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, overflow: "hidden", color: "white", fontWeight: "900", marginTop: 6 },
  ok: { backgroundColor: "green" },
  bad: { backgroundColor: "tomato" },
});

