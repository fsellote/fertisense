import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import { useData } from '../context/DataContext';

export default function AddFarmerScreen() {
  const router = useRouter();
  const { addFarmer, addReading } = useData();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [riceType, setRiceType] = useState('');
  const [cropStyle, setCropStyle] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSave = () => {
    if (!name || !location || !farmSize || !riceType || !cropStyle) {
      setShowSuccessModal(true); // Reuse modal for error if needed
      return;
    }

    const id = uuid.v4().toString();
    const farmerCode = `${name.split(' ')[0].toLowerCase()}-${Date.now().toString().slice(-4)}`;

    const newFarmer = {
      id,
      name,
      code: farmerCode,
      location,
      farmSize,
      riceType,
      cropStyle,
    };

    addFarmer(newFarmer);

    const today = new Date().toLocaleDateString();
    addReading({
      name,
      code: farmerCode,
      date: today,
      n: 0,
      p: 0,
      k: 0,
      ph: 0,
      recommendation: [],
    });

    setShowSuccessModal(true);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    router.push('/tabs/connect-instructions');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a Farmer Data</Text>
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>👤 Pangalan ng Magsasaka</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Hal. Juan Dela Cruz"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>📍 Lokasyon ng Sakahan</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Hal. Valencia, Bukidnon"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>📏 Laki ng Sakahan (hectares)</Text>
        <TextInput
          style={styles.input}
          value={farmSize}
          onChangeText={setFarmSize}
          placeholder="Hal. 2.5"
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>🌾 Uri ng Palay</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={riceType} onValueChange={setRiceType} style={styles.picker}>
            <Picker.Item label="Pumili..." value="" />
            <Picker.Item label="Hybrid" value="hybrid" />
            <Picker.Item label="Inbred" value="inbred" />
            <Picker.Item label="Pareho" value="pareho" />
          </Picker>
        </View>

        <Text style={styles.label}>💧 Estilo ng Pagtatanim</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={cropStyle} onValueChange={setCropStyle} style={styles.picker}>
            <Picker.Item label="Pumili..." value="" />
            <Picker.Item label="Irrigated" value="irrigated" />
            <Picker.Item label="Rainfed" value="rainfed" />
            <Picker.Item label="Pareho" value="pareho" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            !(name && location && farmSize && riceType && cropStyle) && { backgroundColor: '#aaa' },
          ]}
          onPress={handleSave}
          disabled={!(name && location && farmSize && riceType && cropStyle)}
        >
          <Text style={styles.saveText}>💾 Save Farmer</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Cute Success Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={showSuccessModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Farmer Added!</Text>
            <Text style={styles.modalMessage}>
              👤 {name}{'\n'}📍 {location}
            </Text>
            <Pressable style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5fff5' },
  header: {
    backgroundColor: '#2e7d32',
    paddingTop: 70,
    paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 55,
    bottom: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
  form: {
    padding: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  input: {
    borderWidth: 1.3,
    borderColor: '#c1e1c1',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#c1e1c1',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 47,
    fontFamily: 'Poppins_400Regular',
  },
  saveButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 4,
    top: 30,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  modalMessage: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  modalButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
