import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFertilizerPrices } from '../context/FertilizerContext';

export default function RecommendationScreen() {
  const router = useRouter();
  const { prices: fertilizerPrices } = useFertilizerPrices();
  const { ph } = useLocalSearchParams();

  // Sample realistic values (₱/kg) if not updated by admin:
  const fallbackPrices = {
    urea: 25,
    ssp: 20,
    mop: 18,
    dap: 30,
    npk: 27,
  };

  const prices = { ...fallbackPrices, ...fertilizerPrices };

  const fertilizerAmounts = {
    plan1: { urea: 261, ssp: 193, mop: 197 },
    plan2: { dap: 70, urea: 247, mop: 197 },
    plan3: { npk: 179, urea: 226, mop: 149 },
  };

  const totalPrice = (items: { [key: string]: number }) => {
    let total = 0;
    for (const key in items) {
      const amount = items[key];
      const price = prices[key] ?? 0;
      total += amount * price;
    }
    return total;
  };

  const phValue = parseFloat(ph as string) || 6.5;
  let phStatus = 'Neutral';
  if (phValue < 5.5) phStatus = 'Acidic';
  else if (phValue > 7.5) phStatus = 'Alkaline';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/fertisense-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* pH Box */}
      <View style={styles.phBox}>
        <Text style={styles.phLabel}>📊 pH Level Result:</Text>
        <Text style={styles.phValue}>
          {phValue.toFixed(1)} ({phStatus})
        </Text>
        <Text style={styles.phNote}>
          {phStatus === 'Acidic' && 'Soil is too acidic. Consider applying lime.'}
          {phStatus === 'Neutral' && 'Soil pH is optimal for most crops.'}
          {phStatus === 'Alkaline' && 'Soil is alkaline. May affect nutrient availability.'}
        </Text>
      </View>

      {/* Dynamic Recommendation */}
      <View style={styles.recommendationBox}>
        <Text style={styles.recommendationTitle}>
          Rekomendasyon: <Text style={{ fontStyle: 'italic' }}>(Recommendation)</Text>
        </Text>
        <Text style={styles.recommendationText}>
          Mababa ang Phosphorus ng lupa. Katamtaman ang Nitrogen at Potassium. Inirerekomenda naming magdagdag ng abono na may mataas na Phosphorus tulad ng Superphosphate.
        </Text>
        <Text style={styles.englishText}>
          The soil is low in Phosphorus. Nitrogen and Potassium are medium. We recommend applying fertilizer with high Phosphorus like Superphosphate.
        </Text>
      </View>

      {/* Instruction Checkmarks */}
      <View style={styles.checkItem}>
        <Image source={require('../assets/images/checkmark.png')} style={styles.checkIcon} />
        <Text style={styles.checkText}>Maglagay ng Superphosphate (P) na abono.</Text>
      </View>
      <View style={styles.checkItem}>
        <Image source={require('../assets/images/checkmark.png')} style={styles.checkIcon} />
        <Text style={styles.checkText}>Hindi kailangang magdilig.</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Fertilizer Recommendations</Text>

      {/* TABLE 1 */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Fertilizer Recommendation – I</Text>
          <Text style={styles.priceTag}>₱{totalPrice(fertilizerAmounts.plan1).toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cellHeader}>Stages</Text>
          <Text style={styles.cellHeader}>Urea (N)</Text>
          <Text style={styles.cellHeader}>SSP (P₂O₅)</Text>
          <Text style={styles.cellHeader}>MOP (K₂O)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>Sa Pagtanim</Text>
          <Text style={styles.cell}>261</Text>
          <Text style={styles.cell}>193</Text>
          <Text style={styles.cell}>197</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>Pagkatapos ng 30 Araw</Text>
          <Text style={styles.cell}>261</Text>
          <Text style={styles.cell}>0</Text>
          <Text style={styles.cell}>0</Text>
        </View>
      </View>

      {/* TABLE 2 */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Fertilizer Recommendation – II</Text>
          <Text style={styles.priceTag}>₱{totalPrice(fertilizerAmounts.plan2).toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cellHeader}>Stages</Text>
          <Text style={styles.cellHeader}>DAP</Text>
          <Text style={styles.cellHeader}>Urea (N)</Text>
          <Text style={styles.cellHeader}>MOP (K₂O)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>Sa Pagtanim</Text>
          <Text style={styles.cell}>70</Text>
          <Text style={styles.cell}>247</Text>
          <Text style={styles.cell}>197</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>Pagkatapos ng 30 Araw</Text>
          <Text style={styles.cell}>0</Text>
          <Text style={styles.cell}>247</Text>
          <Text style={styles.cell}>0</Text>
        </View>
      </View>

      {/* TABLE 3 */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Fertilizer Recommendation – III</Text>
          <Text style={styles.priceTag}>₱{totalPrice(fertilizerAmounts.plan3).toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cellHeader}>Stages</Text>
          <Text style={styles.cellHeader}>NPK</Text>
          <Text style={styles.cellHeader}>Urea (N)</Text>
          <Text style={styles.cellHeader}>MOP (K₂O)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>Sa Pagtanim</Text>
          <Text style={styles.cell}>179</Text>
          <Text style={styles.cell}>226</Text>
          <Text style={styles.cell}>149</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>Pagkatapos ng 30 Araw</Text>
          <Text style={styles.cell}>0</Text>
          <Text style={styles.cell}>226</Text>
          <Text style={styles.cell}>0</Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/tabs/admin-home')}
      >
        <Text style={styles.buttonText}>Back to Home Screen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 23,
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: 80, // prevents button from hitting nav bar
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: -30,
  },
  phBox: {
    backgroundColor: '#e8f5e9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  phLabel: { fontSize: 14, color: '#2e7d32', fontWeight: 'bold' },
  phValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginVertical: 4,
  },
  phNote: { fontSize: 13, color: '#555', textAlign: 'center' },
  recommendationBox: {
    borderColor: '#4CAF50',
    borderWidth: 1.5,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  recommendationText: { fontSize: 14, marginBottom: 8, color: '#222' },
  englishText: {
    fontSize: 13,
    color: '#555',
    fontStyle: 'italic',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  checkIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  checkText: { fontSize: 14, color: '#333' },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 20,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  table: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  tableTitle: { fontSize: 14, fontWeight: 'bold' },
  priceTag: {
    backgroundColor: '#5D9239',
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 13,
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  cellHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: '#e8f5e9',
  },
  cell: {
    flex: 1,
    padding: 10,
    fontSize: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
