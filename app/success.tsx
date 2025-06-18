import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Green Arc Background (Optional) */}
      <View style={styles.topArc} />

      <Text style={styles.statusText}>Status</Text>

      {/* Check Icon */}
      <Image
        source={require('../assets/images/success.png')}
        style={styles.statusIcon}
        resizeMode="contain"
      />
      <Text style={styles.resultText}>Successful!</Text>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/npk-readings')}>
        <Text style={styles.buttonText}>Magpatuloy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 100,
    left: 30,
  },
  topArc: {
    position: 'absolute',
    top: -40,
    width: '120%',
    height: 130,
    backgroundColor: '#2e7d32',
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
  },
  statusText: {
    position: 'absolute',
    top: 30,
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  }, 
  statusIcon: {
    width: 70,
    height: 70,
    marginBottom: 15,
    bottom: -30
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 100,
    color: '#333',
    bottom: -35
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 90,
    borderRadius: 30,
    bottom: -90
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
