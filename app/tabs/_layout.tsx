// app/tabs/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { DataProvider } from '../../context/DataContext'; // ✅ Make sure this path is correct

export default function TabLayout() {
  return (
    <DataProvider>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
              height: 70,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: '#fff',
              borderTopWidth: 0,
              elevation: 5,
            },
          }}
        >
          <Tabs.Screen
            name="admin-home"
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons name="home" size={26} color={focused ? '#2e7d32' : '#888'} />
              ),
            }}
          />
          <Tabs.Screen
            name="logs"
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons name="document-text" size={26} color={focused ? '#2e7d32' : '#888'} />
              ),
            }}
          />
          <Tabs.Screen
            name="connect-instructions"
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.centerButton}>
                  <Ionicons name="hardware-chip-outline" size={28} color="#fff" />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons name="time" size={26} color={focused ? '#2e7d32' : '#888'} />
              ),
            }}
          />
          <Tabs.Screen
            name="admin-profile"
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons name="person" size={26} color={focused ? '#2e7d32' : '#888'} />
              ),
            }}
          />
        </Tabs>
      </View>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  centerButton: {
    backgroundColor: '#2e7d32',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' ? 40 : 20,
  },
});
