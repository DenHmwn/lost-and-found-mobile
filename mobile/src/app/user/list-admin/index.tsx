import { View, Text } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'
import { styles } from '@/style/styles'

export default function ListAdminPage() {
  return (
   <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Appbar.Header style={styles.appBar} elevated>
              <Appbar.Content 
                title="List Admin" 
                titleStyle={styles.appBarTitle}
              />
              <Appbar.Action 
                icon="bell-outline" 
                onPress={() => console.log("Notifikasi")}
                color="#FFFFFF"
              />
            </Appbar.Header>
    </View>
  )
}