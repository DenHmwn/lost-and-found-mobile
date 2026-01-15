import React, { useEffect, useState } from "react";
import {  ScrollView, StyleSheet, Text, View } from "react-native";
import { StatCard } from "@/components/startcard";
import axios from "axios";
import { LostReport } from "@/types/interface";

export default function AdminDashboard() {
    const [lost, setLost] = useState<LostReport[]>([]);
    const [totalDone, setTotalDone] = useState(0);
    const [totalWait, setTotalWait] = useState(0);
    const [totalConfirm, setTotalConfirm] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    const [totalReject, setTotalReject] = useState(0);

const load = async () => {
    const res = await axios.get("http://localhost:3001/api/lostreport", {
      withCredentials: true
    })
    setLost(res.data.data)
    
    const totalDone = lost.filter(
    (item) => item.statusReport === "Done" || item.statusReport === "Closed"
    ).length;
    setTotalDone(totalDone);

    const wait = lost.filter(
    (item) => item.status === "PENDING"
    ).length;
    setTotalWait(wait);

    const confirm = lost.filter(
    (item) => item.status === "APPROVED"
    ).length;
    setTotalConfirm(confirm);

    const reject = lost.filter(
    (item) => item.status === "REJECTED"
    ).length;
    setTotalReject(reject);
    };

    useEffect(() => { 
      load(); 
      console.log(totalConfirm);
    }, []);

return (
  <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}
  contentContainerStyle={{ padding: 16, gap: 12 }}
>
    <Text style={styles.title}>Dashboard</Text>
    <Text style={styles.sub}>Ringkasan laporan & user</Text>

    <View style={styles.row}>
      <StatCard label="Total Hilang" value={lost?.length - totalDone} />
      <StatCard label="Total Ditemukan" value={totalDone} />
    </View>

    <View style={styles.row}>
      <StatCard label="Menunggu" value={totalWait} />
      <StatCard label="DiSetujui" value={totalConfirm} />
    </View>

    <View style={styles.row}>
      <StatCard label="DiTolak" value={totalReject} />
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
    center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "900" },
    sub: { color: "#666", marginTop: -6 },
    row: { flexDirection: "row", gap: 12 },
});
