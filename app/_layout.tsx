import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';

import { AuthProvider } from '../context/AuthContext';
import { DataProvider } from '../context/DataContext';
import { FertilizerProvider } from '../context/FertilizerContext';

// ⛔️ Prevent splash from hiding until fonts load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // ✅ Once fonts are ready, hide splash screen
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // ⛔️ Don't render app until fonts are ready
  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <DataProvider>
          <FertilizerProvider>
            <Slot />
          </FertilizerProvider>
        </DataProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
