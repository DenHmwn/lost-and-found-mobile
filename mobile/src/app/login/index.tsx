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

        <TouchableOpacity style={[styles.button, styles.userButton]} onPress={handleUserLogin}>
          <Text style={styles.buttonText}>Masuk sebagai User</Text>
        </TouchableOpacity>

    </View>
  );

  
}
