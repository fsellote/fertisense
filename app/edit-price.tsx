import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
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

  // Local states initialized with current prices
  const [nPrice, setNPrice] = useState(prices.urea.toString());
  const [pPrice, setPPrice] = useState(prices.ssp.toString());
  const [kPrice, setKPrice] = useState(prices.mop.toString());

  const handleSave = () => {
    const newPrices = {
      ...prices,
      urea: parseFloat(nPrice),
      ssp: parseFloat(pPrice),
      mop: parseFloat(kPrice),
    };

    setPrices(newPrices);
    Alert.alert('Prices Updated', 'Fertilizer prices have been saved.');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Fertilizer Price</Text>
      <Text style={styles.subtitle}>Department of Agriculture</Text>

      {/* Nitrogen */}
      <Text style={styles.label}>Nitrogen (Urea - N) Price (₱/kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={nPrice}
        onChangeText={setNPrice}
        placeholder="e.g. 50"
      />

      {/* Phosphorus */}
      <Text style={styles.label}>Phosphorus (SSP - P) Price (₱/kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={pPrice}
        onChangeText={setPPrice}
        placeholder="e.g. 45"
      />

      {/* Potassium */}
      <Text style={styles.label}>Potassium (MOP - K) Price (₱/kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={kPrice}
        onChangeText={setKPrice}
        placeholder="e.g. 60"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 4, color: '#2e7d32' },
  subtitle: { fontSize: 16, marginBottom: 32, color: '#555' },
  label: { fontSize: 14, marginBottom: 6, color: '#444' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
