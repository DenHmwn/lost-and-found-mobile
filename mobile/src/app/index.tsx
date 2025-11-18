// app/index.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { router } from 'expo-router';

export default function RoleSelectionScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Lost & Found
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Pilih peran Anda untuk melanjutkan
      </Text>

      <Button
        mode="contained"
        onPress={() => router.push('/user')}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Masuk sebagai User
      </Button>

      <Button
        mode="outlined"
        onPress={() => router.push('/admin')}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Masuk sebagai Admin
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginVertical: 5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});