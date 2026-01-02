import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import StatCard from "@/components/StatCard";
import { AdminService } from "@/services/admin.service";
import { toUiStats } from "@/adapters/admin.adapter";
import { UiStats } from "@/types/admin.ui";

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState<UiStats | null>(null);
    const [error, setError] = useState<string | null>(null);
}

const load = async () => {
    setError(null);
    try {
        const raw = await AdminService.getStats();
        setStats(toUiStats(raw));
} catch (e: any) {
    setError(e.message);
} finally {
    setLoading(false);

}

};
