import { View, Text } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'
import { styles } from '@/style/styles'

export default function ListAdminPage() {
  const [ListAdmin, setListAdmin] = useState<Users[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterList, setFilterList] = useState<Users[]>([]);

  useEffect(() => {
    getAdmin();
  }, []);

  useEffect(() => {
    const filtered = ListAdmin.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.notelp.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterList(filtered);
  }, [searchQuery, ListAdmin]);

  const getAdmin = async () => {
    try {
      const response = await axios.get(strings.api_user);

      if (Array.isArray(response.data)) {
        setListAdmin(response.data);
      } else if (response.data.data) {
        setListAdmin(response.data.data);
      }
    } catch (error) {
      console.error("Error ambil data:", error);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="inventory" size={80} color="#CBD5E1" />
      <Text style={styles.emptyTitle}>Tidak Ada Data</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery
          ? "Coba kata kunci lain"
          : "Belum ada Admin yang terdaftar"}
      </Text>
    </View>
  );
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Searchbar
        placeholder="Cari kontak admin disini"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#64748B"
        inputStyle={styles.searchInput}
        elevation={0}
      />
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="person" size={24} color={color.primary} />
          <View style={styles.statTextContainer}>
            <Text style={styles.statNumber}>{ListAdmin.length}</Text>
            <Text style={styles.statLabel}>Total Admin</Text>
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Appbar.Header style={styles.appBar} elevated>
        <Appbar.Content title="List Admin" titleStyle={styles.appBarTitle} />
        <Appbar.Action
          icon="bell-outline"
          onPress={() => console.log("Notifikasi")}
          color="#FFFFFF"
        />
      </Appbar.Header>
      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        data={filterList}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card style={styles.modernCard} elevation={2}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
            </View>
          </Card>
        )}
      />
    </View>
  );
}
