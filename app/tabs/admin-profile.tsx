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
      {/* Top Arc */}
      <View style={styles.topArc} />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/profile-pic.png')}
          style={styles.profilePic}
        />
        <Text style={styles.name}>Admin User</Text>
      </View>

      <View style={styles.content}>
        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.box}>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="person-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>Personal Information</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Ionicons name="language-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>Language: Filipino, English</Text>
          </View>
        </View>

        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.box}>
          <View style={styles.row}>
            <Ionicons name="notifications-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>Push Notifications</Text>
            <Switch
              value={pushNotif}
              onValueChange={setPushNotif}
              style={styles.switch}
            />
          </View>
          <View style={styles.row}>
            <Ionicons name="megaphone-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>Promotional Notifications</Text>
            <Switch
              value={promoNotif}
              onValueChange={setPromoNotif}
              style={styles.switch}
            />
          </View>
        </View>

        {/* More Section */}
        <Text style={styles.sectionTitle}>More</Text>
        <View style={styles.box}>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="information-circle-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="log-out-outline" size={20} color="#2e7d32" />
            <Text style={styles.label}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topArc: {
    height: 150,
    backgroundColor: '#2e7d32',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
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
    marginTop: 120,
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
    marginTop: 12,
  },
  box: {
    backgroundColor: '#f1f8f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2e7d32',

    // ✅ Realistic shadow for floating look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6, // Android
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    marginLeft: 12,
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
});
