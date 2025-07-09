// app/_layout.tsx
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
import { DataProvider } from '../context/DataContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <DataProvider>
          <Slot />
        </DataProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
