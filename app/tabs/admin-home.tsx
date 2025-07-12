import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const getFormattedDate = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
  return new Date().toLocaleDateString('en-PH', options);
};

export default function AdminHomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Section */}
      <View style={styles.headerSection}>
        {/* Profile Image (Clickable) */}
        <TouchableOpacity
          style={styles.profileRow}
          onPress={() => router.push('/tabs/admin-profile')}
        >
          <Image
            source={require('../../assets/images/profile-pic.png')}
            style={styles.profilePic}
          />
        </TouchableOpacity>

        {/* Header Text */}
        <Text style={styles.headerText}>Welcome,</Text>
        <Text style={styles.boldHeaderText}>Admin!</Text>
        <Text style={styles.dateText}>{getFormattedDate()}</Text>

        {/* Manage Logs Shortcut */}
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => router.push('/tabs/logs')}
        >
          <Text style={styles.manageText}>
            <Text>
              📋 </Text>View Logs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.cardWrapper}>
        <Text style={styles.sectionLabel}>
          <Text>📌 </Text>Quick Actions
        </Text>
        <View style={styles.divider} />

        {/* Connect to Sensor */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#DCE8D6' }]}
          onPress={() => router.push('/tabs/connect-instructions')}
        >
          <Image
            source={require('../../assets/images/connect-sensor.png')}
            style={styles.sensorImage}
          />
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#000' }]}>Connect to Sensor</Text>
            <Text style={[styles.cardSubtitle, { color: '#333' }]}>Measure NPK Soil</Text>
          </View>
          <View style={styles.arrowCircle}>
            <Ionicons name="chevron-forward" size={22} color="#2e7d32" />
          </View>
        </TouchableOpacity>

        {/* Add Farmer Data */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#5D9239' }]}
          onPress={() => router.push('/add-farmer')}
        >
          <Image
            source={require('../../assets/images/farmer-data.png')}
            style={styles.farmerImage}
          />
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#fff' }]}>Add a Farmer Data</Text>
            <Text style={[styles.cardSubtitle, { color: '#fff' }]}>Register a farmer</Text>
          </View>
          <View style={[styles.arrowCircle, { backgroundColor: '#9fc987' }]}>
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Edit Fertilizer Price */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#00691D' }]}
          onPress={() => router.push('/edit-price')}
        >
          <Image
            source={require('../../assets/images/ferti-price.png')}
            style={styles.priceImage}
          />
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#fff' }]}>Edit Fertilizer Price</Text>
            <Text style={[styles.cardSubtitle, { color: '#fff' }]}>Modify fertilizer price</Text>
          </View>
          <View style={[styles.arrowCircle, { backgroundColor: '#7fa489' }]}>
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    backgroundColor: '#2e7d32',
    paddingTop: 90,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'relative',
  },
  profileRow: {
    position: 'absolute',
    top: 40,
    right: 24,
  },
  profilePic: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#d6f5d6',
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
  boldHeaderText: {
    fontSize: 34,
    color: '#fff',
    marginBottom: 4,
    fontFamily: 'Poppins_700Bold',
  },
  dateText: {
    fontSize: 14,
    color: '#d4f2d1',
    marginBottom: 12,
    fontFamily: 'Poppins_400Regular',
  },
  manageButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  manageText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
  },
  cardWrapper: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    marginBottom: 24,
    borderRadius: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 25,
    padding: 13,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },

  // ✅ Individual image styles
  sensorImage: {
    width: 105,
    height: 80,
    marginRight: 8,
    borderRadius: 10,
  },
  farmerImage: {
    width: 100,
    height: 85,
    marginRight: 10,
    borderRadius: 12,
  },
  priceImage: {
    width: 115,
    height: 78,
    marginRight: 9,
    borderRadius: 8,
  },

  cardContent: {
    flex: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginTop: 15,
    fontFamily: 'Poppins_700Bold',
  },
  cardSubtitle: {
    fontSize: 15,
    marginTop: 2,
    fontFamily: 'Poppins_400Regular',
  },
  arrowCircle: {
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
  },
});
