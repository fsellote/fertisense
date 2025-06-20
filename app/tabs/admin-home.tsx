// app/tabs/admin-home.tsx
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminHomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/images/top-elipse.png')}
        style={styles.topWave}
      />

      <Text style={styles.header}>Welcome,{"\n"}<Text style={{ fontWeight: 'bold' }}>Admin!</Text></Text>
      <Text style={styles.subHeader}>choose an action to begin.</Text>

      {/* Connect to Sensor */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#DCE8D6' }]}
        onPress={() => router.push('/tabs/connect-instructions')}

      >
        <Image
          source={require('../../assets/images/connect-sensor.png')}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { color: '#000' }]}>Connect to Sensor</Text>
          <Text style={[styles.cardSubtitle, { color: '#333' }]}>Measure NPK Soil</Text>
        </View>
        <View style={styles.arrowCircle}>
          <Text style={[styles.arrow, { color: '#2e7d32' }]}>{'>'}</Text>
        </View>
      </TouchableOpacity>

      {/* Add Farmer Data */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#5D9239' }]}
        onPress={() => router.push('/add-farmer')}
      >
        <Image
          source={require('../../assets/images/farmer-data.png')}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { color: '#fff' }]}>Add a Farmer Data</Text>
          <Text style={[styles.cardSubtitle, { color: '#fff' }]}>Register a farmer</Text>
        </View>
        <View style={[styles.arrowCircle, { backgroundColor: '#9fc987' }]}>
          <Text style={[styles.arrow, { color: '#fff' }]}>{'>'}</Text>
        </View>
      </TouchableOpacity>

      {/* Edit Fertilizer Price */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#00691D' }]}
        onPress={() => router.push('/edit-price')}
      >
        <Image
          source={require('../../assets/images/ferti-price.png')}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { color: '#fff' }]}>Edit Fertilizer Price</Text>
          <Text style={[styles.cardSubtitle, { color: '#fff' }]}>Modify fertilizer price</Text>
        </View>
        <View style={[styles.arrowCircle, { backgroundColor: '#7fa489' }]}>
          <Text style={[styles.arrow, { color: '#fff' }]}>{'>'}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  topWave: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: 12,
    width: '120%',
    height: 140,
    resizeMode: 'cover',
  },
  header: {
    paddingTop: 95,
    fontSize: 37,
    color: 'black',
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    borderRadius: 25,
    padding: 13,
    marginBottom: 19,
    elevation: 12
  },
  cardImage: {
    width: 120,
    height: 90,
    resizeMode: 'cover',
    borderBottomLeftRadius: 23,
    marginTop: 3,            
    marginLeft: -13,           
    marginRight: 7, 
    marginBottom: -13,        
  },
  cardContent: {
    flex: 10,
    paddingLeft: -20,
  },
  cardTitle: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 15,
    marginTop: 2,
  },
  arrowCircle: {
    backgroundColor: '#d9e5d2',
    borderRadius: 90,
    width: 30,
    height: 30,
    alignItems: 'center',
    marginTop: 19
  },
  arrow: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
