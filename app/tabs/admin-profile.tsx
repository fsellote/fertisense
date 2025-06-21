// app/tabs/admin-profile.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AdminProfileScreen() {
  const router = useRouter();
  const [pushNotif, setPushNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topArc} />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/profile-pic.png')}
          style={styles.profilePic}
        />
        <Text style={styles.name}>Francen Sellote</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.box}>
          <TouchableOpacity style={styles.row} onPress={() => router.push('/personal-info')}>
            <Ionicons name="person-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>Personal Information</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Ionicons name="language-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>Language: Filipino, English</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.box}>
          <View style={styles.row}>
            <Ionicons name="notifications-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>Push Notifications</Text>
            <Switch
              value={pushNotif}
              onValueChange={setPushNotif}
              style={styles.switch}
              trackColor={{ false: '#ccc', true: '#a5d6a7' }}
              thumbColor={pushNotif ? '#2e7d32' : '#f4f3f4'}
            />
          </View>
          <View style={styles.row}>
            <Ionicons name="megaphone-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>Promotional Notifications</Text>
            <Switch
              value={promoNotif}
              onValueChange={setPromoNotif}
              style={styles.switch}
              trackColor={{ false: '#ccc', true: '#a5d6a7' }}
              thumbColor={promoNotif ? '#2e7d32' : '#f4f3f4'}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>More</Text>
        <View style={styles.box}>
          <TouchableOpacity style={styles.row} onPress={() => router.push('/about')}>
            <Ionicons name="information-circle-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => router.replace('/login')}>
            <Ionicons name="log-out-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topArc: {
    height: 120,
    backgroundColor: '#2e7d32',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    width: '100%',
    zIndex: -1,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  profileSection: {
    marginTop: 70,
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    top: 12,
    color: '#000',
  },
  content: {
    paddingHorizontal: 21,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 6,
    marginTop: 0,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 17,
    shadowColor: '#0F9334',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
});
