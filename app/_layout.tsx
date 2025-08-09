import { Stack } from 'expo-router';
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

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <DataProvider>
          <FertilizerProvider>
            <Stack screenOptions={{ headerShown: false }}>
              {/* This allows the modal and all screens inside Slot to render properly */}
              <Stack.Screen name="(stakeholder)" options={{ headerShown: false }} />
              <Stack.Screen name="(guest)" options={{ headerShown: false }} />
            </Stack>
          </FertilizerProvider>
        </DataProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
