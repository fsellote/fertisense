import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFertilizer } from '../context/FertilizerContext';

const fertilizerLabels: { [key in keyof ReturnType<typeof useFertilizer>['prices']]: string } = {
  urea: 'Urea (Nitrogen)',
  ssp: 'SSP (Phosphorus)',
  mop: 'MOP (Potassium)',
  dap: 'DAP',
  npk: 'NPK',
};

const fertilizerIcons: { [key in keyof ReturnType<typeof useFertilizer>['prices']]: React.ReactNode } = {
  urea: <MaterialIcons name="eco" size={24} color="#2e7d32" />,
  ssp: <MaterialIcons name="science" size={24} color="#2e7d32" />,
  mop: <MaterialIcons name="opacity" size={24} color="#2e7d32" />,
  dap: <MaterialIcons name="local-florist" size={24} color="#2e7d32" />,
  npk: <MaterialIcons name="spa" size={24} color="#2e7d32" />,
};

export default function EditPriceScreen() {
  const router = useRouter();
  const { prices, setPrices } = useFertilizer();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState<keyof typeof prices | null>(null);
  const [inputPrice, setInputPrice] = useState('');

  const openModal = (key: keyof typeof prices) => {
    setSelectedKey(key);
    setInputPrice(prices[key].toString());
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!selectedKey) return;

    const newPrice = parseFloat(inputPrice);
    if (isNaN(newPrice) || newPrice <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid positive number.');
      return;
    }

    setPrices({
      ...prices,
      [selectedKey]: newPrice,
    });

    setModalVisible(false);
    Alert.alert('✅ Updated', `${fertilizerLabels[selectedKey]} price updated!`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Fertilizer Prices</Text>
        <Text style={styles.headerSubtitle}>Department of Agriculture – Admin Panel</Text>
      </View>

      {/* Fertilizer List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {Object.entries(prices).map(([key, value]) => (
          <View key={key} style={styles.card}>
            <View style={styles.left}>
              {fertilizerIcons[key as keyof typeof prices]}
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.label}>{fertilizerLabels[key as keyof typeof prices]}</Text>
                <Text style={styles.price}>₱ {value.toFixed(2)}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => openModal(key as keyof typeof prices)}>
              <Ionicons name="pencil" size={22} color="#2e7d32" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Edit Price for {selectedKey ? fertilizerLabels[selectedKey] : ''}
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={inputPrice}
              onChangeText={setInputPrice}
              placeholder="Enter new price"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// === Styles ===

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fdf7',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#2e7d32',
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#c8e6c9',
    fontSize: 14,
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2e7d32',
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2e7d32',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  cancelText: {
    color: '#888',
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
