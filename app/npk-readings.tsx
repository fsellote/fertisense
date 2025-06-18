import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NPKReadingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/fertisense-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* NPK Bars */}
      <View style={styles.npkContainer}>
        <View style={[styles.npkBox, { backgroundColor: '#2e7d32' }]}>
          <Text style={styles.npkLabel}>N</Text>
          <Text style={styles.npkValue}>100</Text>
          <Text style={styles.npkUnit}>mg/kg</Text>
        </View>

        <View style={[styles.npkBox, { backgroundColor: '#e0a52e' }]}>
          <Text style={styles.npkLabel}>P</Text>
          <Text style={styles.npkValue}>45</Text>
          <Text style={styles.npkUnit}>mg/kg</Text>
        </View>

        <View style={[styles.npkBox, { backgroundColor: '#2e7d32' }]}>
          <Text style={styles.npkLabel}>K</Text>
          <Text style={styles.npkValue}>90</Text>
          <Text style={styles.npkUnit}>mg/kg</Text>
        </View>
      </View>

      {/* Soil Moisture Progress */}
      <Text style={styles.moistureLabel}>Soil Moisture</Text>
      <View style={styles.moistureBarBackground}>
        <View style={styles.moistureBarFill} />
      </View>
      <Text style={styles.moisturePercent}>42%</Text>

      {/* Recommendation Button */}
      <TouchableOpacity
        style={styles.recommendButton}
        onPress={() => router.push('/recommendation')}
      >
        <Text style={styles.recommendText}>Kunin ang Rekomendasyon</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 80,
    marginBottom: 30,
  },
  npkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  npkBox: {
    flex: 1,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  npkLabel: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  npkValue: {
    fontSize: 20,
    color: '#fff',
    marginVertical: 4,
  },
  npkUnit: {
    fontSize: 13,
    color: '#fff',
  },
  moistureLabel: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginBottom: 6,
    color: '#333',
  },
  moistureBarBackground: {
    height: 10,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 6,
  },
  moistureBarFill: {
    height: '100%',
    width: '42%',
    backgroundColor: '#2e7d32',
  },
  moisturePercent: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 30,
  },
  recommendButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  recommendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
