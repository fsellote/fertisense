import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          height: 90, // taller bar for more center room
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 10,           // 👈 pushes icons down
          paddingBottom: 15,        // 👈 centers icons vertically
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 6,
          overflow: 'visible', // for ripple effects
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
  );
}

const styles = StyleSheet.create({
  centerButton: {
    backgroundColor: '#2e7d32',
    width: 60,
    height: 60,
    top: -25,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
