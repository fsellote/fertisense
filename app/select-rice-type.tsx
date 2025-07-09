import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

export default function SelectRiceTypeScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const riceTypes = [
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'Inbred', value: 'inbred' },
    { label: 'Pareho', value: 'both' }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title/Instruction */}
      <Text style={styles.title}>
        Pumili kung anong uri ng palay ang iyong itatanim.
      </Text>

      {/* Rice Type Options */}
      {riceTypes.map((type) => (
        <TouchableOpacity
          key={type.value}
          style={[
            styles.optionButton,
            selectedType === type.value && styles.selectedButton
          ]}
          onPress={() => setSelectedType(type.value)}
        >
          <Text
            style={[
              styles.optionText,
              selectedType === type.value && styles.selectedText
            ]}
          >
            {type.label}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Proceed Button */}
      <TouchableOpacity
        style={[
          styles.proceedButton,
          !selectedType && { backgroundColor: '#ccc' }
        ]}
        onPress={() => {
          if (selectedType) {
            console.log(`Selected rice type: ${selectedType}`);
            // We'll add the next screen route later
          }
        }}
        disabled={!selectedType}
      >
        <Text style={styles.proceedText}>Magpatuloy</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionButton: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#2e7d32',
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 25,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: '#d5f5d1',
    borderColor: '#1b5e20',
  },
  optionText: {
    fontSize: 17,
    color: '#2e7d32',
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedText: {
    color: '#1b5e20',
    fontWeight: 'bold',
  },
  proceedButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 50,
    marginTop: 40,
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
