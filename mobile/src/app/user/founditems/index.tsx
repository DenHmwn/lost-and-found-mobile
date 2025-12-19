// File: LostItemPage.tsx
import { styles } from "@/style/styles";
import React from "react";
import { View, Text } from "react-native";
import { Appbar } from "react-native-paper";

export default function FoundItemPage() {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Appbar.Header style={styles.background}>
        <Appbar.Content
          title="Lost & Found"
          titleStyle={styles.PageTitle}
          style={styles.PageTitle}
        />
      </Appbar.Header>

      <View style={styles.pageTitleContainer}>
        <Text style={styles.PageTitle}>Halaman List Penemuan Barang</Text>
      </View>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        data={ListLost}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card}>
            <Card.Title
              title={item.namaBarang}
              subtitle={item.lokasiTemu}
              titleStyle={{ fontSize: 20 }}
            />
            <Card.Actions>
              <Button
                onPress={() => console.log("edit")}
                style={{ backgroundColor: "#5B7FFF" }}
              >
                <MaterialIcons name="info" size={24} color="black" />
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
