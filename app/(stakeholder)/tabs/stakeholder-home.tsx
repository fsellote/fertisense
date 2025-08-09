import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useData } from '../../../context/DataContext';

const getFormattedDate = () => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  return new Date().toLocaleDateString('en-PH', options);
};

export default function StakeholderHome() {
  const router = useRouter();
  const { user } = useAuth();
  const { latestSensorData } = useData();

  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImage || null);

  useFocusEffect(
    useCallback(() => {
      setProfileImageUrl(user?.profileImage || null);
    }, [user?.profileImage])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.headerSection}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerText}>Welcome,</Text>
            <Text style={styles.boldHeaderText}>{user?.name || 'Stakeholder'}!</Text>
            <Text style={styles.dateText}>{getFormattedDate()}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => router.push('/(stakeholder)/tabs/stakeholder-profile')}
          >
            {profileImageUrl ? (
              <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person-circle-outline" size={50} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.cardWrapper}>
        {/* Available Actions */}
        <SectionLabel text="📌 Available Actions" />
        <ActionCard
          color="#e6f4ea"
          icon={
            <Image
              source={require('../../../assets/images/connect-sensor.png')}
              style={styles.sensorImage}
            />
          }
          title="Connect to Sensor"
          subtitle="Measure NPK Soil"
          onPress={() => router.push('/(stakeholder)/tabs/connect-instructions')}
          iconColor="#2e7d32"
        />

        {/* Farm Insights */}
        <SectionLabel text="📊 Farm Insights" />
        {latestSensorData ? (
          <InfoCard
            color="#fce4ec"
            imageUri="https://cdn-icons-png.flaticon.com/512/2906/2906278.png"
            title={`Latest Reading: ${new Date(latestSensorData.timestamp).toLocaleString('en-PH')}`}
            subtitle={`Nitrogen (N): ${latestSensorData.n} | Phosphorus (P): ${latestSensorData.p} | Potassium (K): ${latestSensorData.k}${
              latestSensorData.ph !== undefined ? ` | pH: ${latestSensorData.ph}` : ''
            }`}
          />
        ) : (
          <InfoCard
            color="#fce4ec"
            imageUri="https://cdn-icons-png.flaticon.com/512/2906/2906278.png"
            title="No sensor data yet"
            subtitle="Once you connect your sensor and get readings, insights will appear here."
            buttonLabel="📡 Connect Sensor"
            onButtonPress={() => router.push('/(stakeholder)/tabs/connect-instructions')}
          />
        )}

        {/* Soil Health Tips */}
        <SectionLabel text="🌱 Soil Health Tips" />
        <InfoCard
          color="#fffde7"
          title="✅ Tip: Test soil monthly to optimize fertilizer use."
          subtitle="Avoid compacting wet soil with machinery to protect structure."
        />

        {/* Help & Support */}
        <SectionLabel text="❓ Help & Support" />
        <ActionCard
          color="#e3f2fd"
          icon={<Ionicons name="help-circle-outline" size={40} color="#1565c0" />}
          title="Need Help?"
          subtitle="View FAQs or contact support."
          onPress={() => router.push('/(stakeholder)/screens/support')}
          iconColor="#1565c0"
        />

        <View style={{ height: 50 }} />
      </View>
    </ScrollView>
  );
}

/* Reusable Section Label */
const SectionLabel = ({ text }: { text: string }) => (
  <Text style={styles.sectionLabel}>{text}</Text>
);

/* Reusable Action Card */
const ActionCard = ({
  color,
  icon,
  title,
  subtitle,
  onPress,
  iconColor,
}: {
  color: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  iconColor: string;
}) => (
  <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
    <View style={styles.iconWrapper}>{icon}</View>
    <View style={styles.cardContent}>
      <Text style={[styles.cardTitle, { color: iconColor }]}>{title}</Text>
      <Text style={[styles.cardSubtitle, { color: '#444' }]}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={22} color={iconColor} />
  </TouchableOpacity>
);

/* Reusable Info Card */
const InfoCard = ({
  color,
  imageUri,
  title,
  subtitle,
  buttonLabel,
  onButtonPress,
}: {
  color: string;
  imageUri?: string;
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
}) => (
  <View style={[styles.infoBox, { backgroundColor: color }]}>
    {imageUri && <Image source={{ uri: imageUri }} style={styles.emptyImage} />}
    <Text style={styles.infoText}>{title}</Text>
    {subtitle && <Text style={styles.subInfoText}>{subtitle}</Text>}
    {buttonLabel && onButtonPress && (
      <TouchableOpacity style={styles.ctaButton} onPress={onButtonPress}>
        <Text style={styles.ctaText}>{buttonLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    backgroundColor: '#0d5213',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 23,
    borderBottomRightRadius: 100,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileContainer: {
    marginLeft: 'auto',
    marginTop: -5,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
  boldHeaderText: {
    fontSize: 31,
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
  dateText: {
    fontSize: 13,
    color: '#cde6d4',
    fontFamily: 'Poppins_400Regular',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#fff',
  },
  cardWrapper: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 60,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000',
    marginBottom: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  sensorImage: {
    width: 90,
    height: 90,
    bottom: -4.5,
    resizeMode: 'contain',
  },
  cardContent: {
    paddingLeft: 13,
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  infoBox: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 25,
    alignItems: 'center',
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subInfoText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  emptyImage: {
    width: 80,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  ctaButton: {
    marginTop: 8,
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  ctaText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
});
