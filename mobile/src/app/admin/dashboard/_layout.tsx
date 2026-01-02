import React from "react";
import { Stack } from "expo-router";


export default function DashboardStack() {
    return (
    <Stack screenOptions={{ headerTitleStyle: { fontWeight: "900" } }}>
        <Stack.Screen name="index" options={{ title: "Dashboard" }} />
    </Stack>
  );
}
