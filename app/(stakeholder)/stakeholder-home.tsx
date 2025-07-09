import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext'; // ✅ added

export default function StakeholderHome() {
  const { user } = useAuth(); // ✅ use the name

  return (
    <View style={styles.container}>
      <View style={styles.topArc} />
      <Text style={styles.welcome}>Welcome, {String(user?.name || 'Stakeholder')}!</Text>
      <Text style={styles.info}>This is your dashboard. Monitor your logs, connect sensors, and view history.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  topArc: {
    position: 'absolute',
    top: -40,
    width: '120%',
    height: 130,
    backgroundColor: '#2e7d32',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
});
