import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function SelectOptionsScreen() {
  const router = useRouter();

  const [riceType, setRiceType] = useState<string | null>(null);
  const [cropStyle, setCropStyle] = useState<string>('');
  const [soilType, setSoilType] = useState<string>('');
  const [season, setSeason] = useState<string>('');

  const riceTypes = [
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'Inbred', value: 'inbred' },
    { label: 'Pareho', value: 'both' }
  ];

  const cropStyles = ['Irrigated', 'Rainfed', 'Pareho'];
  const soilTypes = ['Light Soils', 'Med-Heavy Soils'];
  const seasons = ['Wet Season', 'Dry Season'];

  const allSelected = riceType && cropStyle && soilType && season;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Decorative Top Arc (No Image) */}
      <View style={styles.topArc}></View>

      {/* Header */}
      <Text style={styles.headerTitle}>Rekomendasyon ng Pataba</Text>
      <Text style={styles.subHeader}>
        Pumili ng uri ng palay at iba pang detalye ng iyong sakahan.
      </Text>

      {/* Main Card Container */}
      <View style={styles.cardBox}>
        {/* RICE TYPE BUTTONS */}
        <Text style={styles.sectionLabel}>Uri ng Palay</Text>
        {riceTypes.map((type) => (
          <TouchableOpacity
            key={type.value}
            style={[
              styles.optionButton,
              riceType === type.value && styles.selectedButton
            ]}
            onPress={() => setRiceType(type.value)}
          >
            <Text
              style={[
                styles.optionText,
                riceType === type.value && styles.selectedText
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}

        {/* CROP STYLE */}
        <Text style={styles.sectionLabel}>Estilo ng Sakahan</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={cropStyle}
            onValueChange={(value: string) => setCropStyle(value)}
          >
            <Picker.Item label="Pumili..." value="" />
            {cropStyles.map((style) => (
              <Picker.Item key={style} label={style} value={style.toLowerCase()} />
            ))}
          </Picker>
        </View>

        {/* SOIL TYPE */}
        <Text style={styles.sectionLabel}>Uri ng Lupa</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={soilType}
            onValueChange={(value: string) => setSoilType(value)}
          >
            <Picker.Item label="Pumili..." value="" />
            {soilTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type.toLowerCase()} />
            ))}
          </Picker>
        </View>

        {/* SEASON */}
        <Text style={styles.sectionLabel}>Panahon ng Pagtatanim</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={season}
            onValueChange={(value: string) => setSeason(value)}
          >
            <Picker.Item label="Pumili..." value="" />
            {seasons.map((s) => (
              <Picker.Item key={s} label={s} value={s.toLowerCase()} />
            ))}
          </Picker>
        </View>
      </View>

      {/* PROCEED BUTTON */}
      <TouchableOpacity
        style={[styles.proceedButton, !allSelected && { backgroundColor: '#ccc' }]}
        disabled={!allSelected}
        onPress={() => {
          console.log({
            riceType,
            cropStyle,
            soilType,
            season
          });
          router.push('/recommendation');
        }}
      >
        <Text style={styles.proceedText}>Magpatuloy</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 40,
    flexGrow: 1,
  },
  topArc: {
    width: '100%',
    height: 130,
    backgroundColor: '#2e7d32',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    marginBottom: -30,
  },
  headerTitle: {
    paddingTop: 40,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  cardBox: {
    backgroundColor: '#f1fbf1',
    borderRadius: 20,
    marginHorizontal: 24,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 6,
    marginTop: 15,
  },
  optionButton: {
    width: '100%',
    borderWidth: 1.2,
    borderColor: '#2e7d32',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: '#d4f5d1',
    borderColor: '#1b5e20',
  },
  optionText: {
    fontSize: 16,
    color: '#2e7d32',
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedText: {
    color: '#1b5e20',
    fontWeight: 'bold',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  proceedButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 30,
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
