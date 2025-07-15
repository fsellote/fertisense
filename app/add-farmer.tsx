import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
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

  const handleSave = () => {
    if (!name || !location || !farmSize || !riceType || !cropStyle) {
      Alert.alert('📌 Kulang na Impormasyon', 'Pakiusap, punan ang lahat ng detalye.');
      return;
    }

    const id = uuid.v4().toString();
    const farmerCode = `${name.split(' ')[0].toLowerCase()}-${Date.now().toString().slice(-4)}`;

    const newFarmer = {
      id,
      name,
      code: farmerCode,
    };

    addFarmer(newFarmer);

    // Create default reading entry
    const today = new Date().toLocaleDateString();
    addReading({
      name,
      code: farmerCode,
      date: today,
      n: 0,
      p: 0,
      k: 0,
      recommendation: [],
    });

    Alert.alert('✅ Naidagdag ang Magsasaka', `Pangalan: ${name}\nLokasyon: ${location}`);
    router.push('/tabs/connect-instructions');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile ng Magsasaka</Text>
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
          <Picker
            selectedValue={riceType}
            onValueChange={setRiceType}
            style={styles.picker}
          >
            <Picker.Item label="Pumili..." value="" />
            <Picker.Item label="Hybrid" value="hybrid" />
            <Picker.Item label="Inbred" value="inbred" />
            <Picker.Item label="Pareho" value="pareho" />
          </Picker>
        </View>

        <Text style={styles.label}>💧 Estilo ng Pagtatanim</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={cropStyle}
            onValueChange={setCropStyle}
            style={styles.picker}
          >
            <Picker.Item label="Pumili..." value="" />
            <Picker.Item label="Irrigated" value="irrigated" />
            <Picker.Item label="Rainfed" value="rainfed" />
            <Picker.Item label="Pareho" value="pareho" />
          </Picker>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            !(name && location && farmSize && riceType && cropStyle) && { backgroundColor: '#aaa' },
          ]}
          onPress={handleSave}
          disabled={!(name && location && farmSize && riceType && cropStyle)}
        >
          <Text style={styles.saveText}>💾 I-save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5fff5' },
  header: {
    backgroundColor: '#2e7d32',
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
  form: {
    padding: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 6,
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
    borderWidth: 1.2,
    borderColor: '#c1e1c1',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 48,
    fontFamily: 'Poppins_400Regular',
  },
  saveButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 4,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
  },
});
