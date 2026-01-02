import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';

export default function LoginPage() { 
      const handleUserLogin = () => {
        router.replace('/user/homepage')
    };

      const handleAdminLogin = () => {
        router.replace('/admin/dashboard');
  };
    return (
    <View style={styles.container}>
         <StatusBar barStyle="light-content" />
         <Text style={styles.title}>Lost & Found</Text>
         <Text style={styles.subtitle}>Pilih peran Anda untuk melanjutkan</Text>

        <TouchableOpacity onPress={handleUserLogin}>
          <Text>Masuk sebagai User</Text>
        </TouchableOpacity>

    </View>
  );

  
}
