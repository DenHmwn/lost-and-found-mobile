import React, { useState } from "react";
import { View, Text } from "react-native";
import { Appbar, BottomNavigation, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles } from "@/style/styles";
import LostItemPage from "../lostitems";
import FoundItemPage from "../founditems";
import AccountPageUser from "../account";
import ListAdminPage from "../list-admin";

// Halaman HomePage
const HomeRoute = () => (
  <View>
    <Appbar.Header style={styles.background}>
      <Appbar.Content
        title="Lost & Found"
        titleStyle={styles.PageTitle}
        style={styles.PageTitle}
      />
    </Appbar.Header>
    <View style={styles.pageTitleContainer}>
      <Text style={styles.PageTitle}>Halaman Home</Text>
    </View>
  </View>
);

export default function HomePageUser() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "lost",
      title: "Lost",
      focusedIcon: "help-box",
      unfocusedIcon: "box-variant",
    },
    {
      key: "found",
      title: "Found",
      focusedIcon: "briefcase-check",
      unfocusedIcon: "briefcase-check-outline",
    },
    {
      key: "listadmin",
      title: "ListAdmin",
      focusedIcon: "briefcase-check",
      unfocusedIcon: "briefcase-check-outline",
    },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    lost: LostItemPage,
    found: FoundItemPage,
    listadmin: ListAdminPage,
    account: AccountPageUser,
  });

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={{ backgroundColor: "#486feeff" }}
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
