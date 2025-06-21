// app/tabs/stakeholder-dashboard.tsx
import { StyleSheet, Text, View } from 'react-native';

export default function StakeholderDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Stakeholder Dashboard</Text>
      {/* You can later add logs, history, connect sensor, etc. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
});
