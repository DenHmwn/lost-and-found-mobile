import { View, Text } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'
import { styles } from '@/style/styles'

export default function ListAdminPage() {
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
        <Text style={styles.PageTitle}>Halaman List Admin</Text>
      </View>
    </View>
  )
}