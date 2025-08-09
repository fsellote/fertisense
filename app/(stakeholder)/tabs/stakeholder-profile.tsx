import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export default function StakeholderProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);

  const [name, setName] = useState(user?.name || '');
  const [address, setAddress] = useState(user?.address || '');
  const [farmLocation, setFarmLocation] = useState(user?.farmLocation || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);

  const handleSave = () => {
    Alert.alert('Confirm Changes?', 'Do you want to save the changes?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          updateUser?.({
            ...user,
            name,
            address,
            farmLocation,
            mobile,
            email,
            profileImage,
          });
          setEditing(false);
        },
      },
    ]);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
    }
  };

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
        <View style={styles.profilePicWrapper}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../../../assets/images/profile-pic.png')
            }
            style={styles.profilePic}
          />
          <TouchableOpacity onPress={pickImage} style={styles.editPicIcon}>
            <Ionicons name="pencil" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{name || 'No Name Set'}</Text>
      </View>

      <TouchableOpacity
        style={styles.editProfileLabel}
        onPress={() => setEditing(!editing)}
      >
        <Ionicons name="create-outline" size={18} color="#2e7d32" />
        <Text style={styles.editLabelText}>
          {editing ? 'Cancel Edit' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.box}>
          {editing ? (
            <>
              <EditableRow label="Full Name" value={name} onChange={setName} icon="person-outline" />
              <EditableRow label="Address" value={address} onChange={setAddress} icon="home-outline" />
              <EditableRow label="Farm Location" value={farmLocation} onChange={setFarmLocation} icon="location-outline" />
              <EditableRow label="Mobile (+63)" value={mobile} onChange={setMobile} icon="call-outline" keyboardType="numeric" />
              <EditableRow label="Email" value={email} onChange={setEmail} icon="mail-outline" keyboardType="email-address" />
            </>
          ) : (
            <>
              <DisplayRow label={`Name: ${name}`} icon="person-outline" />
              <DisplayRow label={`Address: ${address}`} icon="home-outline" />
              <DisplayRow label={`Farm: ${farmLocation}`} icon="location-outline" />
              <DisplayRow label={`Mobile: +63${mobile}`} icon="call-outline" />
              {email ? <DisplayRow label={`Email: ${email}`} icon="mail-outline" /> : null}
            </>
          )}
        </View>

        {editing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.box}>
          <DisplayRow label="Language: Filipino, English" icon="globe-outline" />
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

function DisplayRow({ label, icon }: { label: string; icon: any }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={20} color="#2e7d32" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

function EditableRow({
  label,
  value,
  onChange,
  icon,
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  icon: any;
  keyboardType?: any;
}) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={20} color="#2e7d32" />
      <TextInput
        style={[styles.label, { borderBottomWidth: 1, borderColor: '#ccc' }]}
        value={value}
        onChangeText={onChange}
        placeholder={label}
        keyboardType={keyboardType}
        autoCapitalize="words"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topArc: {
    height: 120,
    backgroundColor: '#2e7d32',
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
    marginBottom: 16,
  },
  profilePicWrapper: {
    position: 'relative',
  },
  profilePic: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: '#fff',
    borderWidth: 3,
  },
  editPicIcon: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    padding: 4,
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    top: 12,
    color: '#000',
  },
  editProfileLabel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 15,
  },
  editLabelText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 21,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 6,
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
  saveButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
