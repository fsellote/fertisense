import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConnectScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Center Illustration */}
      <Image
        source={require('../assets/images/connect-img.png')}
        style={styles.connectImage}
        resizeMode="contain"
      />

      {/* Instruction */}
      <Text style={styles.heading}>Pindutin ang “Connect”</Text>

      {/* Warning Icon & Note */}
      <Image
        source={require('../assets/images/error.png')}
        style={styles.warningIcon}
        resizeMode="contain"
      />
      <Text style={styles.warningText}>
        Siguraduhing nasa 10–30 meters lang ang layo ng iyong cellphone mula sa sensor.
      </Text>

      {/* Connect Button */}
      <TouchableOpacity style={styles.connectButton} onPress={() => router.push('/success')}>
        <Text style={styles.connectText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 90,
    left: 25,
    zIndex: 10,
  },
  connectImage: {
    width: 220,
    height: 220,
    marginBottom: 30,
    marginTop: -30
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 50,
    marginTop: -30
  },
  warningIcon: {
    width: 35,
    height: 30,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 17,
    textAlign: 'center',
    color: '#444',
    marginBottom: 80,
    paddingHorizontal: 12,
  },
  connectButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 13,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  connectText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
