import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type HistoryItem = {
  id: string;
  date: string;
  ph: string;
  fertilizer: string[];
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('history');
      if (stored) {
        setHistory(JSON.parse(stored));
      } else {
        // Simulate 7 sample readings for now
        const sampleData: HistoryItem[] = Array.from({ length: 7 }).map((_, i) => ({
          id: String(i + 1),
          date: `2025-08-${(i + 1).toString().padStart(2, '0')}`,
          ph: `${(6.0 + Math.random() * 0.5).toFixed(2)}`,
          fertilizer: [
            'Urea – 50 kg',
            'NPK 16-20-0 – 30 kg',
            'Muriate of Potash – 10 kg',
          ],
        }));
        setHistory(sampleData);
      }
    } catch (err) {
      console.error('Error loading history', err);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this history?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = history.filter((entry) => entry.id !== id);
          setHistory(updated);
          await AsyncStorage.setItem('history', JSON.stringify(updated));
        },
      },
    ]);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyTitle}>No history yet</Text>
      <Text style={styles.emptyText}>
        Start by connecting your sensor and getting a recommendation.
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: HistoryItem }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.subText}>pH Level: {item.ph}</Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Ionicons name="trash-outline" size={20} color="#d32f2f" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.seeMoreBtn}
          onPress={() => setExpandedId(isExpanded ? null : item.id)}
        >
          <Text style={styles.seeMoreText}>
            {isExpanded ? 'Hide Details' : 'See More'}
          </Text>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color="#2e7d32"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Fertilizer Recommendations:</Text>
            {item.fertilizer.map((f, idx) => (
              <Text key={idx} style={styles.detailsText}>
                • {f}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Arc Header */}
      <View style={styles.topArc}>
        <Ionicons name="time-outline" size={26} color="#fff" />
        <Text style={styles.arcTitle}>History</Text>
      </View>

      {history.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topArc: {
    backgroundColor: '#2e7d32',
    height: 120,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    marginBottom: 20,
  },
  arcTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 4 },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  subText: { fontSize: 13, color: '#666', marginTop: 2 },
  seeMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2e7d32',
    marginRight: 4,
  },
  details: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#f1f8f2',
    borderRadius: 8,
  },
  detailsTitle: { fontWeight: '600', fontSize: 14, marginBottom: 4 },
  detailsText: { fontSize: 13, color: '#444' },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: { fontSize: 40, marginBottom: 8 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#444', marginBottom: 4 },
  emptyText: { fontSize: 14, color: '#777', textAlign: 'center' },
});
