import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SelectOptionsScreen() {
  const router = useRouter();

  const [riceType, setRiceType] = useState<string | null>(null);
  const [cropStyle, setCropStyle] = useState('');
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');

  const allSelected = riceType && cropStyle && soilType && season;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Arc with Back Button */}
      <View style={styles.topArc}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/tabs/connect-instructions')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Rekomendasyon ng Pataba</Text>
      </View>

      <Text style={styles.subHeader}>
        Pumili ng mga impormasyon tungkol sa iyong sakahan upang makabuo ng tamang rekomendasyon.
      </Text>

      {/* Card Container */}
      <View style={styles.sectionContainer}>
        {/* Section 1: Uri ng Palay */}
        <Text style={styles.sectionLabel}>🌾 Uri ng Palay</Text>
        <View style={styles.optionsRow}>
          {['Hybrid', 'Inbred', 'Pareho'].map((type) => {
            const selected = riceType === type.toLowerCase();
            return (
              <TouchableOpacity
                key={type}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setRiceType(type.toLowerCase())}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Section 2: Estilo ng Sakahan */}
        <Text style={styles.sectionLabel}>💧 Estilo ng Sakahan</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={cropStyle}
            onValueChange={setCropStyle}
            style={Platform.OS === 'android' ? styles.picker : {}}
          >
            <Picker.Item label="Pumili..." value="" />
            <Picker.Item label="Irrigated" value="irrigated" />
            <Picker.Item label="Rainfed" value="rainfed" />
            <Picker.Item label="Pareho" value="pareho" />
          </Picker>
        </View>

        {/* Section 3: Uri ng Lupa */}
        <Text style={styles.sectionLabel}>🧱 Uri ng Lupa</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={soilType}
            onValueChange={setSoilType}
            style={Platform.OS === 'android' ? styles.picker : {}}
          >
            <Picker.Item label="Pumili..." value="" />
            <Picker.Item label="Light Soils" value="light soils" />
            <Picker.Item label="Med-Heavy Soils" value="med-heavy soils" />
          </Picker>
        </View>

        {/* Section 4: Panahon */}
        <Text style={styles.sectionLabel}>⛅ Panahon ng Pagtatanim</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={season}
            onValueChange={setSeason}
            style={Platform.OS === 'android' ? styles.picker : {}}
          >
            <Picker.Item label="Pumili..." value="" />
            <Picker.Item label="Wet Season" value="wet season" />
            <Picker.Item label="Dry Season" value="dry season" />
          </Picker>
        </View>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity
        style={[styles.proceedButton, !allSelected && { backgroundColor: '#ccc' }]}
        disabled={!allSelected}
        onPress={() => router.push('/sensor-reading')}
      >
        <Text style={styles.proceedText}>Magpatuloy</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: 40,
  },
  topArc: {
    width: '100%',
    height: 160,
    backgroundColor: '#2e7d32',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 24,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 6,
    zIndex: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
  },
  subHeader: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginVertical: 16,
    paddingHorizontal: 24,
    fontStyle: 'italic',
  },
  sectionContainer: {
    backgroundColor: '#f9fff7',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 10,
    marginTop: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1.5,
    borderColor: '#2e7d32',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
  },
  chipSelected: {
    backgroundColor: '#d6f5d6',
    borderColor: '#1b5e20',
  },
  chipText: {
    color: '#2e7d32',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#1b5e20',
    fontWeight: '700',
  },
  pickerWrapper: {
    borderWidth: 1.2,
    borderColor: '#2e7d32',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    paddingHorizontal: 10,
  },
  proceedButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 24,
    elevation: 2,
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
