import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Badge from "./Badge";
import { UiReport } from "../types/admin.ui";
import { formatDateTime } from "../utils/date";

function approvalColor(s: UiReport["approvalStatus"]) {
  if (s === "approved") return "green";
  if (s === "rejected") return "tomato";
  return "#999";
}

function processColor(s: UiReport["processStatus"]) {
  if (s === "in_progress") return "#f59e0b";
  if (s === "closed") return "#111";
  return "#2563eb";
}

export default function ReportCard({
  item,
  onPress,
}: {
  item: UiReport;
  onPress: () => void;
}) {
  return (
    return (
  <Pressable onPress={onPress} style={styles.card}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.meta}>Lokasi: {item.location}</Text>
    <Text style={styles.meta}>Pelapor: {item.reporterName}</Text>
    <Text style={styles.meta}>Tanggal: {formatDateTime(item.createdAtISO)}</Text>

    <View style={styles.badgesRow}>
      <Badge text={item.approvalStatus.toUpperCase()} bg={approvalColor(item.approvalStatus)} />
      <Badge text={item.processStatus.toUpperCase()} bg={processColor(item.processStatus)} />
    </View>
  </Pressable>
);

  );
}

