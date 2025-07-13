import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useFertilizerPrices } from '../context/FertilizerContext';

export default function EditPriceScreen() {
  const router = useRouter();
  const { prices, setPrices } = useFertilizerPrices();

  const [nPrice, setNPrice] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [kPrice, setKPrice] = useState('');

  const [isValid, setIsValid] = useState(false);

  // Validate all inputs are numeric
  useEffect(() => {
    const isNumeric = (val: string) => /^\d+(\.\d{1,2})?$/.test(val);
    setIsValid(
      isNumeric(nPrice) && isNumeric(pPrice) && isNumeric(kPrice)
    );
  }, [nPrice, pPrice, kPrice]);

  const handleSave = () => {
    setPrices({
      ...prices,
      urea: parseFloat(nPrice),
      ssp: parseFloat(pPrice),
      mop: parseFloat(kPrice),
    });

    Alert.alert('✅ Prices Updated', 'Fertilizer prices have been saved.');
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Fertilizer Price</Text>
        <Text style={styles.headerSubtitle}>Department of Agriculture</Text>
      </View>

      {/* Inputs */}
      <View style={styles.card}>
        <Text style={styles.label}>🌾 Nitrogen (Urea - N)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={nPrice}
          onChangeText={setNPrice}
          placeholder="e.g. 50"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🧪 Phosphorus (SSP - P)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={pPrice}
          onChangeText={setPPrice}
          placeholder="e.g. 45"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🧂 Potassium (MOP - K)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={kPrice}
          onChangeText={setKPrice}
          placeholder="e.g. 60"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          !isValid && { backgroundColor: '#aaa' },
        ]}
        onPress={handleSave}
        disabled={!isValid}
      >
        <Text style={styles.saveText}>💾 Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7fdf7',
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#2e7d32',
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
  },
  headerSubtitle: {
    color: '#d0ebd0',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  input: {
    borderWidth: 1.2,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
  saveButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
  },
});
