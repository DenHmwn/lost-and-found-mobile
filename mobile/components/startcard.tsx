import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StatCard({ label, value }: { label: string; value: number }) {
 return (
  <View style={styles.card}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

}

const styles = StyleSheet.create({
  card: { flex: 1, borderWidth: 1, borderColor: "#eee", borderRadius: 14, padding: 14, gap: 6 },
  label: { color: "#666" },
  value: { fontSize: 22, fontWeight: "900" },
});
