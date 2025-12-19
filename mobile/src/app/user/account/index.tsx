// File: LostItemPage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AccountPageUser() {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Appbar.Header style={styles.background}>
        <Appbar.Content
          title="Lost & Found"
          titleStyle={styles.PageTitle}
          style={styles.PageTitle}
        />
      </Appbar.Header>
    </View>
  );
}