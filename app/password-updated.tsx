import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function PasswordUpdatedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Check Icon */}
      <Ionicons name="checkmark-circle-outline" size={80} color="#2e7d32" style={styles.icon} />

      {/* Title */}
      <Text style={styles.title}>Password Updated!</Text>
      <Text style={styles.subtitle}>You can now log in using your new password.</Text>

      {/* Back to Login */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
