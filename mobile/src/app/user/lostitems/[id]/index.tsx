import React from "react";
import { View, Text, ScrollView } from "react-native";
import { router, useLocalSearchParams }from "expo-router";
import { Appbar } from "react-native-paper";
import { styles } from "@/style/styles";

export default function LostDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content
          title="Detail Barang Hilang"
          titleStyle={styles.appBarTitle}
        />
        <Appbar.BackAction onPress={() => router.replace("/user/homepage")} color="#FFFFFF" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Nama Barang</Text>
          <Text style={[styles.input, { paddingVertical: 10 }]}>
            
          </Text>

          <Text style={styles.label}>Deskripsi</Text>
          <Text
            style={[
              styles.input,
              styles.textArea,
              { paddingVertical: 10, lineHeight: 20 },
            ]}
          >
           
          </Text>

          <Text style={styles.label}>Lokasi Hilang</Text>
          <Text style={[styles.input, { paddingVertical: 10 }]}>
            
          </Text>

          <Text style={styles.label}>Tanggal & Waktu Hilang</Text>
          <Text style={[styles.input, { paddingVertical: 10 }]}>
    
          </Text>

          <Text style={styles.label}>Status</Text>
          <View
            style={[
              styles.input,
              {
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
          </View>
          <Text style={styles.label}>Dibuat Pada</Text>
          <Text style={[styles.input, { paddingVertical: 10 }]}></Text>
        </View>
      </ScrollView>
    </View>
  );
}
