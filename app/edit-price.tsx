import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditPriceScreen() {
  const router = useRouter();

  // State for each fertilizer price
  const [nPrice, setNPrice] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [kPrice, setKPrice] = useState('');

  const handleSave = () => {
    // Save logic here (e.g. send to backend or context)
    console.log('New Prices:', { nPrice, pPrice, kPrice });
    router.back(); // Go back after saving
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Fertilizer Price</Text>
      <Text style={styles.subtitle}>Department of Agriculture</Text>

      {/* N */}
      <Text style={styles.label}>Nitrogen (N) Price (₱/kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={nPrice}
        onChangeText={setNPrice}
        placeholder="e.g. 50"
      />

      {/* P */}
      <Text style={styles.label}>Phosphorus (P) Price (₱/kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={pPrice}
        onChangeText={setPPrice}
        placeholder="e.g. 45"
      />

      {/* K */}
      <Text style={styles.label}>Potassium (K) Price (₱/kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={kPrice}
        onChangeText={setKPrice}
        placeholder="e.g. 60"
      />

      {/* Save Button */}
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
