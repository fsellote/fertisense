// app/_layout.tsx
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DataProvider } from '../context/DataContext'; // ✅ Correct path

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DataProvider>
        <Slot />
      </DataProvider>
    </SafeAreaProvider>
  );
}
