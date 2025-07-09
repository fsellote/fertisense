import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="admin-home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={26}
              color={focused ? '#2e7d32' : '#888'}
            />
          ),
        }}
      />

      {/* Logs */}
      <Tabs.Screen
        name="logs"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="document-text"
              size={26}
              color={focused ? '#2e7d32' : '#888'}
            />
          ),
        }}
      />

      {/* Connect Sensor */}
      <Tabs.Screen
        name="connect-instructions"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="hardware-chip-outline"
              size={26}
              color={focused ? '#2e7d32' : '#888'}
            />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="admin-profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={26}
              color={focused ? '#2e7d32' : '#888'}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
  },
});
