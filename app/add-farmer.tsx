// app/add-farmer.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useData } from '../context/DataContext';

export default function AddFarmerScreen() {
  const router = useRouter();
  const { farmers, setFarmers } = useData();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const handleSave = () => {
    if (name.trim() && code.trim()) {
      const newFarmer = { name, code };
      setFarmers([...farmers, newFarmer]);
      setName('');
      setCode('');
      router.push('/tabs/connect-instructions'); // Redirect after saving
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Details</Text>
      <Text style={styles.subtitle}>Fill in the farmer’s information</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />

      <Text style={styles.label}>Farmer Code</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="e.g. VAL0123"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  label: { fontSize: 14, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
