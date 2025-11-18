// app/_layout.tsx
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
// import theme from '../core/theme';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
       
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="admin/index" options={{ headerShown: false }} />
        <Stack.Screen name="user/index" options={{ headerShown: false }} />
        
      </Stack>
    </PaperProvider>
  );
}