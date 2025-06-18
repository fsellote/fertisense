// app/tabs/history.tsx
import { StyleSheet, Text, View } from 'react-native';
import { useData } from '../../context/DataContext';

export default function HistoryScreen() {
  const { readings } = useData();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sensor History</Text>

      {readings.length === 0 ? (
        <Text style={styles.empty}>No history available</Text>
      ) : (
        readings.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.name}>{item.farmerName}</Text>
            <Text style={styles.code}>{item.farmerCode}</Text>
            <Text style={styles.reading}>
              N: {item.N}mg/kg, P: {item.P}mg/kg, K: {item.K}mg/kg, Moisture: {item.moisture}%
            </Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  empty: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 50 },
  item: {
    backgroundColor: '#e9f5e7',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  code: { fontSize: 14, color: '#666' },
  reading: { marginTop: 8, fontSize: 14, color: '#333' },
});
