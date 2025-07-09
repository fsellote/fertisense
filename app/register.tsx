import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!name || !address || !farmLocation || !mobile || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email.');
        return;
      }
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    login({
      name,
      email,
      role: 'stakeholder',
    });

    router.replace('/(stakeholder)/stakeholder-home');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require('../assets/images/fertisense-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.tabInactive}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.tabActive}>Sign Up</Text>
        </View>

        {/* Full Name */}
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Juan Dela Cruz"
          value={name}
          onChangeText={setName}
        />

        {/* Address + Farm Location */}
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="Brgy. Poblacion"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>Farm Location *</Text>
            <TextInput
              style={styles.input}
              placeholder="Valencia City"
              value={farmLocation}
              onChangeText={setFarmLocation}
            />
          </View>
        </View>

        {/* Mobile */}
        <Text style={styles.label}>Mobile Number *</Text>
        <View style={styles.mobileRow}>
          <View style={styles.prefixBox}>
            <Text style={styles.prefixText}>+63</Text>
          </View>
          <TextInput
            style={styles.mobileInput}
            placeholder="9123456789"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.footerLink}> Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: 160,
    height: 100,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  tabActive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginLeft: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#2e7d32',
    paddingBottom: 1,
  },
  tabInactive: {
    fontSize: 15,
    color: '#999',
    paddingBottom: 3,
  },
  label: {
    fontSize: 14,
    marginBottom: 3,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 9,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 9,
  },
  mobileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  prefixBox: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  prefixText: {
    fontSize: 14,
    color: '#333',
  },
  mobileInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#444',
    fontSize: 13,
  },
  footerLink: {
    color: '#1976d2',
    fontWeight: '600',
    fontSize: 13,
  },
});
