// app/sensor-reading.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
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
        setCurrentStep(prev => prev + 1);
      }, 1500);
    } else if (currentStep === 5 && !isComplete) {
      setIsComplete(true);
      timeout = setTimeout(() => {
        router.push('/recommendation');
      }, 3000); // Add delay before routing
    }

    return () => clearTimeout(timeout);
  }, [currentStep, isReading]);

  const handleStart = () => {
    setIsReading(true);
    setCurrentStep(1);
  };

  const renderReadingLine = (index: number) => {
    const label = `${index}/5 - Soil sample`;
    const isCompleted = currentStep > index;
    const isCurrent = currentStep === index;

    return (
      <View key={index} style={styles.readingLine}>
        <Text style={styles.readingText}>{label}</Text>
        {isCompleted ? (
          <Image
            source={require('../assets/images/checkmark.png')}
            style={styles.checkIcon}
          />
        ) : isCurrent ? (
          <ActivityIndicator size="small" color="#2e7d32" />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insert Sensor to the Soil</Text>
      <Text style={styles.subtitle}>
        The system will take 5 automatic readings from different soil spots, including pH level.
      </Text>

      <View style={styles.readingsContainer}>
        {[1, 2, 3, 4, 5].map(index => renderReadingLine(index))}
      </View>

      {isComplete && (
        <Text style={styles.successMessage}>
          ✅ Reading successful! Please wait for fertilizer recommendation...
        </Text>
      )}

      {!isReading && !isComplete && (
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start Soil Reading</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center',
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#555',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  readingsContainer: {
    backgroundColor: '#f1fbf1',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 3,
  },
  readingLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  readingText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  checkIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  successMessage: {
    textAlign: 'center',
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
