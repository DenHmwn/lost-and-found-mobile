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
    <View>
    </View>
  );

  
}
