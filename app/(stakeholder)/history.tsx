import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HistoryScreen() {
  const [history, setHistory] = useState([
    { id: '1', date: '2025-06-20', data: 'NPK Reading: 8-10-12' },
    { id: '2', date: '2025-06-18', data: 'NPK Reading: 6-7-9' },
    { id: '3', date: '2025-06-15', data: 'NPK Reading: 7-8-10' },
  ]);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this history?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setHistory((prev) => prev.filter((entry) => entry.id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topArc} />
      <Text style={styles.header}>History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.data}>{item.data}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 60,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  date: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  data: {
    color: '#555',
  },
});
