import React from "react";
import { Stack } from "expo-router";

export default function UsersStack() {
  return (
    <Stack screenOptions={{ headerTitleStyle: { fontWeight: "900" } }}>
      <Stack.Screen name="index" options={{ title: "List User" }} />
    </Stack>
  );
}
