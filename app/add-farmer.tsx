// app/tabs/add-farmer.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useData } from '../context/DataContext'; // ✅ fixed import path

export default function AddFarmerScreen() {
  const router = useRouter();
  const { addFarmer, addReading } = useData();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const handleSave = () => {
    if (!name || !code) return;

    const newFarmer = {
      id: Date.now().toString(), // ✅ added id field
      name,
      code,
    };

    const mockReading = {
      name,
      code,
      date: new Date().toDateString(),
      n: 100,
      p: 45,
      k: 90,
      recommendation: [
        'Maglagay ng Superphosphate (P) na abono.',
        'Hindi kailangang magdilig.',
      ],
    };

    addFarmer(newFarmer);
    addReading(mockReading);
    router.push('/tabs/connect-instructions');
  };

  return (
    <View style={styles.container}>

            {/* Green Arc Background (Optional) */}
            <View style={styles.topArc} />
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Farmer Details</Text>
      <Text style={styles.subtitle}>Fill in farmer’s information</Text>

      <TextInput
        style={styles.input}
        placeholder="Farmer Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Farmer Code"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 27, backgroundColor: '#fff' },
  title: { fontSize: 27, fontWeight: 'bold', marginBottom: 5, marginTop: 150 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 25 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
    backButton: {
    position: 'absolute',
    top: 120,
    left: 20,
    zIndex: 10,
  },
    topArc: {
    position: 'absolute',
    top: -40,
    width: '120%',
    height: 130,
    backgroundColor: '#2e7d32',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  button: {
    backgroundColor: '#2e7d32',
    marginTop: 40,
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
