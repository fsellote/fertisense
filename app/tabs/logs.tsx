import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useData } from '../../context/DataContext';

export default function LogsScreen() {
  const { farmers, readings, setFarmers } = useData();
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [sortAsc, setSortAsc] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [nameEdits, setNameEdits] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const toggleExpand = (code: string) => {
    setExpanded(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const handleDelete = (code: string) => {
    Alert.alert('Confirm Delete', 'This will remove farmer data. Confirm?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: () => {
          setFarmers(prev => prev.filter(f => f.code !== code));
        },
      },
    ]);
  };

  const handleEditConfirm = (code: string) => {
    Alert.alert('Confirm Name Edit', 'Do you want to save changes to the name?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: () => {
          const newName = nameEdits[code]?.trim();
          if (newName) {
            setFarmers(prev =>
              prev.map(f => (f.code === code ? { ...f, name: newName } : f))
            );
          }
          setEditing(null);
        },
      },
    ]);
  };

  const sortedFarmers = [...farmers].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  if (sortedFarmers.length === 0 || readings.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.arcHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Farmer Logs</Text>
        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>📭 Walang Logs</Text>
          <Text style={styles.emptyText}>
            Wala pang datos. Magdagdag ng magsasaka at magbasa gamit ang sensor.
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.arcHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Farmer Logs</Text>
      </View>

      <View style={styles.sortRow}>
        <TouchableOpacity onPress={() => setSortAsc(prev => !prev)}>
          <Text style={styles.sortText}>{sortAsc ? '⬆️ A-Z' : '⬇️ Z-A'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {sortedFarmers.map(farmer => {
        const latest = readings
          .filter(r => r.code === farmer.code)
          .slice(-1)[0];

        return (
          <View key={farmer.code} style={styles.card}>
            <View style={styles.headerRow}>
              {editing === farmer.code ? (
                <TextInput
                  style={styles.input}
                  value={nameEdits[farmer.code] ?? farmer.name}
                  onChangeText={text =>
                    setNameEdits(prev => ({ ...prev, [farmer.code]: text }))
                  }
                />
              ) : (
                <Text style={styles.name}>👨‍🌾 {farmer.name}</Text>
              )}
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  onPress={() => {
                    if (editing === farmer.code) {
                      handleEditConfirm(farmer.code);
                    } else {
                      setEditing(farmer.code);
                      setNameEdits(prev => ({ ...prev, [farmer.code]: farmer.name }));
                    }
                  }}
                >
                  {editing === farmer.code ? (
                    <MaterialIcons name="save" size={20} color="#2e7d32" />
                  ) : (
                    <Feather name="edit-2" size={20} color="#2e7d32" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(farmer.code)}>
                  <MaterialIcons name="delete" size={20} color="#d32f2f" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.info}>📍 Lokasyon: {farmer.location}</Text>
            <Text style={styles.info}>📐 Sukat: {farmer.farmSize} hectares</Text>
            <Text style={styles.info}>🌾 Uri: {farmer.riceType}</Text>
            <Text style={styles.info}>💧 Paraan: {farmer.cropStyle}</Text>

            <View style={styles.sectionDivider} />

            <TouchableOpacity onPress={() => toggleExpand(farmer.code)}>
              <Text style={styles.expandToggle}>
                {expanded[farmer.code] ? '🔽 Itago' : '🔼 Tingnan Pa'}
              </Text>
            </TouchableOpacity>

            {expanded[farmer.code] && latest && (
              <View style={styles.detailsBox}>
                <Text style={styles.detailTitle}>🧪 Huling Reading</Text>
                <Text style={styles.readingItem}>📅 Petsa: {latest.date}</Text>
                <Text style={styles.readingItem}>🧪 pH: {latest.ph ?? '-'}</Text>
                <Text style={styles.readingItem}>🌱 Nitrogen (N): {latest.n}</Text>
                <Text style={styles.readingItem}>🌿 Phosphorus (P): {latest.p}</Text>
                <Text style={styles.readingItem}>🥬 Potassium (K): {latest.k}</Text>

                {latest.fertilizerPlans?.length ? (
                  <View style={styles.fertSection}>
                    <Text style={styles.fertTitle}>📦 Rekomendadong Abono:</Text>
                    {latest.fertilizerPlans.map((plan, idx) => (
                      <View key={idx} style={styles.fertCard}>
                        <Text>📌 Yugto: {plan.stage}</Text>
                        <Text>📦 Uri: {plan.type}</Text>
                        <Text>⚖️ Dami: {plan.amount}</Text>
                        <Text>💰 Presyo: {plan.price}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noFertNote}>
                    📭 Walang abono na nakarehistro para sa log na ito.
                  </Text>
                )}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    paddingBottom: 0,
  },
  arcHeader: {
    backgroundColor: '#0d5213ff',
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
    top: 12,
  },
  headerTitle: {
    fontSize: 18,
    top: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sortText: {
    fontWeight: '600',
    color: '#2e7d32',
  },
  divider: {
    height: 1,
    backgroundColor: '#cfd8dc',
    marginBottom: 16,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    marginHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e7d32',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    fontSize: 16,
    padding: 2,
    minWidth: 100,
  },
  info: {
    fontSize: 14,
    color: '#444',
  },
  expandToggle: {
    fontSize: 14,
    color: '#2e7d32',
    marginTop: 6,
  },
  detailsBox: {
    marginTop: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 12,
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#388e3c',
  },
  readingItem: {
    fontSize: 13,
    marginBottom: 2,
    color: '#333',
  },
  fertSection: {
    marginTop: 10,
  },
  fertTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1b5e20',
    marginBottom: 4,
  },
  fertCard: {
    backgroundColor: '#d0f8ce',
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
  },
  noFertNote: {
    fontStyle: 'italic',
    fontSize: 13,
    color: '#777',
    marginTop: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
  },
});
