import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SensorReadingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isReading && currentStep < 5) {
      timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1500);
    } else if (currentStep === 5 && !isComplete) {
      setIsComplete(true);
      timeout = setTimeout(() => {
        router.push('/recommendation');
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [currentStep, isReading]);

  const handleStart = () => {
    setIsReading(true);
    setCurrentStep(1);
  };

  return (
    <View style={styles.container}>
      {/* Logo (Always on Top) */}
      <Image
        source={require('../assets/images/fertisense-logo.png')}
        style={styles.logo}
      />

      {/* Reading Box */}
      <View style={styles.readingBox}>
        <Text style={styles.title}>Insert the Sensor into the Soil</Text>

        <Text style={styles.engSub}>
          The system will take 5 readings from different soil spots, including pH level.
        </Text>
        <Text style={styles.tagalogSub}>
          Kukuha ang sistema ng 5 readings mula sa iba't ibang bahagi ng lupa, kabilang ang pH level.
        </Text>

        {isReading && currentStep <= 5 && (
          <>
            <ActivityIndicator
              size="large"
              color="#2e7d32"
              style={{ marginTop: 20, marginBottom: 12 }}
            />
            <Text style={styles.readingStep}>
              📍 {currentStep}/5 - Reading soil...
            </Text>
          </>
        )}

        {isComplete && (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={50} color="#2e7d32" />
            <Text style={styles.successText}>
              Success! Completed soil reading. Please wait for recommendation...
            </Text>
          </View>
        )}
      </View>

      {/* Start Button Outside Box */}
      {!isReading && !isComplete && (
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Ionicons name="hardware-chip-outline" size={22} color="#fff" />
          <Text style={styles.startText}>  Simulan ang Pagbasa</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
  },
  logo: {
    bottom: 12,
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: -30,
  },
  readingBox: {
    backgroundColor: '#f1fbf1',
    padding: 26,
    borderRadius: 18,
    width: '100%',
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  engSub: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  tagalogSub: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'italic',
    marginBottom: 20,
    marginTop: 6,
  },
  readingStep: {
    fontSize: 16,
    color: '#2e7d32',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  successBox: {
    backgroundColor: '#d1f7d6',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  successText: {
    fontSize: 15,
    color: '#1b5e20',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginTop: 12,
  },
  startButton: {
    marginTop: 28,
    backgroundColor: '#2e7d32',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
