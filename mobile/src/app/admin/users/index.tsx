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
  
}
