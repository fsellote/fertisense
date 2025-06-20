// app/tabs/history.tsx
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useData } from '../../context/DataContext'; // ✅ correct relative path

export default function HistoryScreen() {
  const { readings } = useData();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>History</Text>
     {/* Green Arc Background (Optional) */}
            <View style={styles.topArc} />
      {readings.length === 0 ? (
        <Text style={styles.empty}>No readings yet</Text>
      ) : (
        readings.map((reading, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.name}>{reading.name}</Text>
            <Text style={styles.code}>Farmer Code: {reading.code}</Text>
            <Text style={styles.date}>{reading.date}</Text>
            <Text style={styles.npk}>N: {reading.n} mg/kg</Text>
            <Text style={styles.npk}>P: {reading.p} mg/kg</Text>
            <Text style={styles.npk}>K: {reading.k} mg/kg</Text>

            {reading.recommendation?.length > 0 && (
              <View style={styles.recommendBox}>
                <Text style={styles.recommendHeader}>Recommendation:</Text>
                {reading.recommendation.map((rec, i) => (
                  <Text key={i} style={styles.recommendText}>✓ {rec}</Text>
                ))}
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, marginTop: 90 },
  empty: { textAlign: 'center', fontSize: 20, color: '#888', marginTop: 5 },
card: {
  backgroundColor: '#e8f5e9',
  padding: 15,
  borderRadius: 10,
  marginBottom: 14,
  borderWidth: 1,                
  borderColor: '#4CAF50',         
},
  name: { fontSize: 18, fontWeight: 'bold' },
  code: { fontSize: 14, color: '#333' },
  date: { fontSize: 13, color: '#666', marginBottom: 6 },
  npk: { fontSize: 15 },
  recommendBox: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 10,
    padding: 10,
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
  recommendHeader: { fontWeight: 'bold', marginBottom: 4 },
  recommendText: { fontSize: 14, color: '#333' },
});
