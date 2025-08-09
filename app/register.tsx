import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
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

const capitalizeWords = (text: string) =>
  text
    .split(' ')
    .map((word) =>
      word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ''
    )
    .join(' ');

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    const trimmedName = capitalizeWords(name.trim());
    const trimmedAddress = capitalizeWords(address.trim());
    const trimmedLocation = capitalizeWords(farmLocation.trim());
    const trimmedMobile = mobile.trim().replace(/[^0-9]/g, '');
    const trimmedEmail = email.trim().toLowerCase();

    if (
      !trimmedName ||
      !trimmedAddress ||
      !trimmedLocation ||
      !trimmedMobile ||
      !trimmedEmail ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email.');
      return;
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      setError('Password must contain at least one special character.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const userData = {
      name: trimmedName,
      email: trimmedEmail,
      password,
      role: 'stakeholder' as const,
      address: trimmedAddress,
      farmLocation: trimmedLocation,
      mobile: trimmedMobile,
    };

    try {
      // Check if already exists
      const existingUser = await AsyncStorage.getItem(`registeredUser:${trimmedEmail}`);
      if (existingUser) {
        setError('An account with this email already exists.');
        return;
      }

      await AsyncStorage.setItem(`registeredUser:${trimmedEmail}`, JSON.stringify(userData));
      login(userData);
      setError('');
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/login');
    } catch (e) {
      setError('Failed to save user data.');
      console.error(e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>

        <Image
          source={require('../assets/images/fertisense-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.tabInactive}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.tabActive}>Sign Up</Text>
        </View>

        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Juan Dela Cruz"
          value={name}
          autoCapitalize="none"
          onChangeText={(text) => setName(capitalizeWords(text))}
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="Brgy. Poblacion"
              value={address}
              autoCapitalize="none"
              onChangeText={(text) => setAddress(capitalizeWords(text))}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>Farm Location *</Text>
            <TextInput
              style={styles.input}
              placeholder="Valencia City"
              value={farmLocation}
              autoCapitalize="none"
              onChangeText={(text) => setFarmLocation(capitalizeWords(text))}
            />
          </View>
        </View>

        <Text style={styles.label}>Mobile Number *</Text>
        <View style={styles.mobileRow}>
          <View style={styles.prefixBox}>
            <Text style={styles.prefixText}>+63</Text>
          </View>
          <TextInput
            style={styles.mobileInput}
            placeholder="9123456789"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password *</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            secureTextEntry={!showPassword}
            value={password}
            autoCapitalize="none"
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#999"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password *</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            autoCapitalize="none"
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#999"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.rememberMeContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <Ionicons
            name={rememberMe ? 'checkbox' : 'square-outline'}
            size={20}
            color="#2e7d32"
          />
          <Text style={styles.rememberMeText}> Remember Me</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

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
      height: 160,
      alignSelf: 'center',
      marginTop: -40,
      marginBottom: -30,
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
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginBottom: 9,
    },
    passwordInput: {
      flex: 1,
      padding: 12,
      fontSize: 14,
    },
    rememberMeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    rememberMeText: {
      fontSize: 13,
      color: '#333',
      marginLeft: 5,
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
