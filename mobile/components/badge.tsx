import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Badge({ text, bg }: { text: string; bg: string }) {
  return <Text style={[styles.badge, { backgroundColor: bg }]}>{text}</Text>;

}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: "hidden",
    color: "white",
    fontWeight: "900",
  },
});
