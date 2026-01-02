import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <View>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}
