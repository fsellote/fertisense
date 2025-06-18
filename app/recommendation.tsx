// app/recommendation.tsx
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecommendationScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/fertisense-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Recommendation Box */}
      <View style={styles.recommendationBox}>
        <Text style={styles.recommendationTitle}>
          Rekomendasyon: <Text style={{ fontStyle: 'italic' }}>(Recommendation)</Text>
        </Text>
        <Text style={styles.recommendationText}>
          Mataas ang Nitrogen at Potassium ng lupa. Mababa ang Phosphorus.
          Inirerekomenda naming magdagdag ng abono na may mataas na Phosphorus tulad ng
          Superphosphate. Hindi kailangan ng patubig, sapat ang basa ng lupa.
        </Text>
        <Text style={styles.englishText}>
          The soil has high Nitrogen and Potassium, but Phosphorus is low.
          We recommend applying a fertilizer high in Phosphorus such as Superphosphate.
          No need to water, soil moisture is adequate.
        </Text>
      </View>

      {/* Instruction Checks */}
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

      {/* Fertilizer Recommendations */}
      <Text style={styles.sectionTitle}>Fertilizer Recommendations</Text>

      {/* Table 1 */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Fertilizer Recommendation – I</Text>
          <Text style={styles.priceTag}>₱4,800</Text>
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

      {/* Table 2 */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Fertilizer Recommendation – II</Text>
          <Text style={styles.priceTag}>₱5,200</Text>
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

      {/* Table 3 */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Fertilizer Recommendation – III</Text>
          <Text style={styles.priceTag}>₱5,000</Text>
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
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  logo: {
    width: 150,
    height: 80,
    alignSelf: 'center',
    marginBottom: 12,
  },
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
  recommendationText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#222',
  },
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
  checkText: {
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 12,
    backgroundColor: '#8BC34A',
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
  tableTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
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
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
