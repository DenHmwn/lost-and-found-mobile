import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Badge({ text, bg }: { text: string; bg: string }) {
  return <Text style={{ backgroundColor: bg }}>{text}</Text>;
}
