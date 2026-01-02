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

        <TouchableOpacity style={[styles.button, styles.adminButton]} onPress={handleAdminLogin}>
         <Text style={styles.buttonText}>Masuk sebagai Admin</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
  },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,

        },
        subtitle: {
             fontSize: 18,
       color: '#666',
    textAlign: 'center',
    marginBottom: 40,

  },
    button: {
           width: '80%',
     paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
        marginVertical: 10,


  },


});

