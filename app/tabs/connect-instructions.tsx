import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConnectInstructionsScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../assets/images/fertisense-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Connect to Device</Text>

      {/* Green-bordered box */}
      <View style={styles.box}>

        <Text style={styles.boxIntro}>
          Bago makita ang datos, ikonekta muna ang device sa iyong cellphone.
        </Text>

        {/* Steps with Icons */}
        <View style={styles.stepRow}>
          <Image source={require('../../assets/images/power.png')} style={styles.icon} />
          <Text style={styles.stepText}>I-on ang iyong sensor device.</Text>
        </View>

        <View style={styles.stepRow}>
          <Image source={require('../../assets/images/bluetooth.png')} style={styles.icon} />
          <Text style={styles.stepText}>Buksan ang Bluetooth ng iyong cellphone.</Text>
        </View>

        <View style={styles.stepRow}>
          <Image source={require('../../assets/images/sensor.png')} style={styles.icon} />
          <Text style={styles.stepText}>Pindutin ang ‘Connect’ upang hanapin ang device.</Text>
        </View>

        <View style={styles.stepRow}>
          <Image source={require('../../assets/images/check.png')} style={styles.icon} />
          <Text style={styles.stepText}>
            Hintaying kumonekta o makita ang ‘Successful’ na status.
          </Text>
        </View>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/connect')}
      >
        <Text style={styles.buttonText}>Magpatuloy</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: 260,
    height: 180,
    marginBottom: 20,
    marginTop: -40
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  box: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f5fdf5',
    marginBottom: 40,
  },
  boxIntro: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 25,
    marginTop: 5,
    textAlign: 'center',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  icon: {
    width: 25,
    height: 24,
    marginRight: 12,
    marginTop: -1,
    resizeMode: 'contain',
  },
  stepText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 13,
    paddingHorizontal: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
