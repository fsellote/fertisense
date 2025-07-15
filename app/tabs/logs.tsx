import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useData } from '../../context/DataContext';

export default function LogsScreen() {
  const router = useRouter();
  const { readings, deleteReading, updateReading } = useData();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedCode, setEditedCode] = useState('');

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setEditedName(readings[index].name);
    setEditedCode(readings[index].code);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      updateReading(editingIndex, {
        ...readings[editingIndex],
        name: editedName,
        code: editedCode,
      });
    }
    setModalVisible(false);
  };

  const confirmDelete = (index: number) => {
    Alert.alert(
      'Delete Log',
      'Are you sure you want to delete this log?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteReading(index),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topArc} />
      <Text style={styles.header}>Logs</Text>

      {readings.length === 0 ? (
        <Text style={styles.empty}>No logs yet</Text>
      ) : (
        <FlatList
          data={readings}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.code}>Farmer Code: {item.code}</Text>
                </View>

                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity onPress={() => openEditModal(index)}>
                    <Ionicons name="pencil" size={20} color="#4CAF50" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => confirmDelete(index)}>
                    <Ionicons name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.date}>{item.date}</Text>

              <Text style={styles.npkLine}>
                N: <Text style={styles.npkValue}>{item.n}</Text> mg/kg &nbsp;&nbsp;
                P: <Text style={styles.npkValue}>{item.p}</Text> mg/kg &nbsp;&nbsp;
                K: <Text style={styles.npkValue}>{item.k}</Text> mg/kg
              </Text>

              {item.recommendation?.length > 0 && (
                <View style={styles.recommendBox}>
                  <Text style={styles.recommendHeader}>Recommendation:</Text>
                  {item.recommendation.map((rec, i) => (
                    <Text key={i} style={styles.recommendText}>✓ {rec}</Text>
                  ))}
                </View>
              )}
            </View>
          )}
        />
      )}

      {/* Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Log</Text>
            <TextInput
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Farmer Name"
              style={styles.input}
            />
            <TextInput
              value={editedCode}
              onChangeText={setEditedCode}
              placeholder="Farmer Code"
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.button, { color: '#888' }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text style={[styles.button, { color: '#2e7d32' }]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingBottom: 40, backgroundColor: '#fff' },
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
    marginTop: 90,
    marginBottom: 20,
  },
  empty: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  card: {
    backgroundColor: '#e8f5e9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  code: { fontSize: 14, color: '#555' },
  date: { fontSize: 13, color: '#666', marginBottom: 6 },
  npkLine: { fontSize: 15, marginBottom: 6 },
  npkValue: { fontWeight: '600' },
  recommendBox: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 10,
    padding: 10,
  },
  recommendHeader: { fontWeight: 'bold', marginBottom: 4 },
  recommendText: { fontSize: 14, color: '#000' },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
