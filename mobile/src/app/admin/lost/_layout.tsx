import React from "react";
import { Stack } from "expo-router";

export default function LostStack() {
  return (
    <Stack screenOptions={{ headerTitleStyle: { fontWeight: "900" } }}>
      <Stack.Screen name="index" options={{ title: "Barang Hilang" }} />
      <Stack.Screen name="[id]" options={{ title: "Detail Laporan" }} />
    </Stack>
  );
}
