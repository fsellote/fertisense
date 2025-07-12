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
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  } as const;
  return new Date().toLocaleDateString('en-PH', options);
};

export default function AdminHomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <TouchableOpacity
          style={styles.profileRow}
          onPress={() => router.push('/tabs/admin-profile')}
        >
          <Image
            source={require('../../assets/images/profile-pic.png')}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Welcome,</Text>
        <Text style={styles.boldHeaderText}>Admin!</Text>
        <Text style={styles.dateText}>{getFormattedDate()}</Text>
      </View>

      {/* Quick Actions Row */}
      <View style={styles.cardWrapper}>
        <View style={styles.quickActionsRow}>
          <Text style={styles.sectionLabel}>
            <Text>📌 </Text>Quick Actions
          </Text>

          <TouchableOpacity
            style={styles.manageButton}
            onPress={() => router.push('/tabs/logs')}
          >
            <Text style={styles.manageText}>
              <Text>📋 </Text>View Logs
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Connect to Sensor */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#deebd8ff' }]}
          onPress={() => router.push('/tabs/connect-instructions')}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/images/connect-sensor.png')}
              style={styles.sensorImage}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#2e7d32' }]}>Connect to Sensor</Text>
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
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/images/farmer-data.png')}
              style={styles.farmerImage}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#fff' }]}>Add a Farmer Data</Text>
            <Text style={[styles.cardSubtitle, { color: '#fff' }]}>Register a farmer</Text>
          </View>
          <View style={styles.arrowCircle}>
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Edit Fertilizer Price */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#00691D' }]}
          onPress={() => router.push('/edit-price')}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/images/ferti-price.png')}
              style={styles.priceImage}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#fff' }]}>Edit Fertilizer Price</Text>
            <Text style={[styles.cardSubtitle, { color: '#fff' }]}>Modify fertilizer price</Text>
          </View>
          <View style={styles.arrowCircle}>
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
    backgroundColor: '#0d5213ff',
    paddingTop: 70,
    paddingBottom: 10,
    paddingHorizontal: 23,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 125,
    position: 'relative',
  },
  profileRow: {
    position: 'absolute',
    top: 72,
    right: 25,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  headerText: {
    fontSize: 19,
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
  boldHeaderText: {
    fontSize: 39,
    color: '#fff',
    marginBottom: 0,
    bottom: 10,
    fontFamily: 'Poppins_700Bold',
  },
  dateText: {
    fontSize: 13,
    color: '#b7cab6ff',
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
  },
  cardWrapper: {
    paddingHorizontal: 19,
    paddingTop: 40,
    paddingBottom: 40,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000ff',
  },
  manageButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  manageText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
  },
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    marginBottom: 24,
    borderRadius: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 19,
    elevation: 9,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    minHeight: 90,
  },
  imageWrapper: {
    width: 100,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sensorImage: {
    width: 100,
    height: 100,
    top: 2,
    right: 7,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  farmerImage: {
    width: 120,
    height: 95,
    top: 5,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  priceImage: {
    width: 110,
    height: 72,
    top: 2,
    right: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 4,
    fontFamily: 'Poppins_700Bold',
  },
  cardSubtitle: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: 'Poppins_400Regular',
  },
  arrowCircle: {
    width: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
