import React from "react";
import { Stack } from "expo-router";

export default function CreateFoundStack() {
  return (
    <Stack screenOptions={{ headerTitleStyle: { fontWeight: "900" } }}>
      <Stack.Screen name="index" options={{ title: "Buat Laporan Temuan" }} />
    </Stack>
  );
}
