import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [digits, setDigits] = useState(['', '', '', '', '']);
  const [error, setError] = useState('');

  // Refs for each input
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);

    // Move to next input
    if (text && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join('');
    if (code.length < 5 || digits.includes('')) {
      setError('Please enter the 5-digit code.');
      return;
    }

    setError('');
    router.push('/reset-password');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subtitle}>Enter the 5-digit code sent to your email</Text>

      {/* Code Boxes */}
      <View style={styles.codeBoxWrapper}>
        {digits.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Verify Button */}
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>

      {/* Resend Link */}
      <TouchableOpacity onPress={() => alert('Verification code resent.')}>
        <Text style={styles.resendText}>Resend Email</Text>
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
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: -100,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 25,
  },
  codeBoxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resendText: {
    color: '#1976d2',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '500',
  },
});
