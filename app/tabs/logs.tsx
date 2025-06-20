import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useData } from '../../context/DataContext';

export default function LogsScreen() {
  const router = useRouter();
  const { farmers } = useData();

  return (
    <View style={styles.container}>

      
            {/* Green Arc Background (Optional) */}
            <View style={styles.topArc} />
      <Text style={styles.header}>Farmer Logs</Text>

      {farmers.length === 0 ? (
        <Text style={styles.empty}>No logs yet</Text>
      ) : (
        <FlatList
          data={farmers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.code}>{item.code}</Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/add-farmer')}>
                <Ionicons name="pencil" size={20} color="#555" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 90},
  empty: { fontSize: 20, color: '#888', textAlign: 'center', marginTop: 50 },
item: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 12,
  backgroundColor: '#f3f3f3',
  borderRadius: 10,
  marginBottom: 12,
  borderWidth: 1,              
  borderColor: '#4CAF50',      
},
  name: { fontSize: 16, 
    fontWeight: 'bold' 
  },
  code: { 
    fontSize: 14,
    color: '#555' 
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
});
