// app/tabs/logs.tsx
import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useData } from '../../context/DataContext';

export default function LogsScreen() {
  const router = useRouter();
  const { farmers } = useData();

  return (
    <View style={styles.container}>
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
                <Image
                  source={require('../../assets/images/edit.png')}
                  style={styles.editIcon}
                />
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
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  empty: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 50 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    marginBottom: 12,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  code: { fontSize: 14, color: '#555' },
  editIcon: { width: 20, height: 20, tintColor: '#555' },
});
