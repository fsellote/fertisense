import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SensorReadingScreen() {
  const router = useRouter();
  const [currentCount, setCurrentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  let timeout: ReturnType<typeof setTimeout>;

  if (isLoading && currentCount < 5) {
    timeout = setTimeout(() => {
      setCurrentCount(prev => prev + 1);
    }, 1500);
  } else if (currentCount === 5) {
    timeout = setTimeout(() => {
      router.push('/recommendation');
    }, 2000);
  }

  return () => clearTimeout(timeout);
}, [currentCount, isLoading]);


  const handleStart = () => {
    setIsLoading(true);
    setCurrentCount(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insert the Sensor to the Soil</Text>
      <Text style={styles.subtitle}>
        Please insert the sensor into the soil to begin reading nutrients and pH level.
      </Text>

      <View style={styles.box}>
        {isLoading ? (
          <>
            <ActivityIndicator size="large" color="#2e7d32" />
            <Text style={styles.loadingText}>Reading... {currentCount}/5 connected</Text>
          </>
        ) : (
          <TouchableOpacity onPress={handleStart} style={styles.button}>
            <Text style={styles.buttonText}>Begin Soil Reading</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
    marginBottom: 30,
    color: '#555',
  },
  box: {
    padding: 25,
    borderWidth: 2,
    borderColor: '#2e7d32',
    borderRadius: 15,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
