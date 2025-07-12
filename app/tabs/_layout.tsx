import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'admin-home':
              iconName = 'home';
              break;
            case 'logs':
              iconName = 'document-text';
              break;
            case 'connect-instructions':
              iconName = 'hardware-chip-outline';
              break;
            case 'admin-profile':
              iconName = 'person';
              break;
          }

          return (
            <View style={styles.iconWrapper}>
              <View style={[styles.iconCircle, focused && styles.focusedCircle]}>
                <Ionicons name={iconName} size={24} color={focused ? '#fff' : '#888'} />
              </View>
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="admin-home" />
      <Tabs.Screen name="logs" />
      <Tabs.Screen name="connect-instructions" />
      <Tabs.Screen name="admin-profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 28 : 40,
    left: 24,
    right: 24,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 30, height: 30 },
    shadowRadius: 5,
    elevation: 17,
  },
  tabBarItem: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedCircle: {
    backgroundColor: '#2e7d32',
  },
});
