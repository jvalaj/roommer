import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { CreditCard as Edit2, Settings, LogOut, Bell, Shield, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          onPress: () => router.replace('/login'),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop' }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Morgan</Text>
            <Text style={styles.profileUniversity}>Stanford University</Text>
            <Text style={styles.profileMajor}>Computer Science • Junior</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit2 size={20} color="#FF5864" />
          </TouchableOpacity>
        </View>

        <View style={styles.bioSection}>
          <Text style={styles.bioText}>
            I'm a CS major who enjoys hiking and playing video games. I'm clean, respectful, and looking for a roommate with similar values. I prefer a quiet environment for studying but also enjoy socializing on weekends.
          </Text>
        </View>

        <View style={styles.lifestyleSection}>
          <Text style={styles.sectionTitle}>My Lifestyle</Text>
          <View style={styles.lifestyleTags}>
            <View style={styles.lifestyleTag}>
              <Text style={styles.lifestyleTagText}>Early Bird</Text>
            </View>
            <View style={styles.lifestyleTag}>
              <Text style={styles.lifestyleTagText}>Neat</Text>
            </View>
            <View style={styles.lifestyleTag}>
              <Text style={styles.lifestyleTagText}>Studious</Text>
            </View>
            <View style={styles.lifestyleTag}>
              <Text style={styles.lifestyleTagText}>Active</Text>
            </View>
          </View>
        </View>

        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Roommate Preferences</Text>
          <Text style={styles.preferencesText}>
            Looking for someone who is clean, respectful of quiet hours during weeknights, and doesn't mind occasional guests. Prefer someone who is also a student and has a similar schedule.
          </Text>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color="#666" style={styles.settingIcon} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d1d1d1', true: '#FF8E9E' }}
              thumbColor={notificationsEnabled ? '#FF5864' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Shield size={20} color="#666" style={styles.settingIcon} />
              <Text style={styles.settingText}>Location Services</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#d1d1d1', true: '#FF8E9E' }}
              thumbColor={locationEnabled ? '#FF5864' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <HelpCircle size={20} color="#666" style={styles.settingIcon} />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, styles.logoutButton]}
            onPress={handleLogout}
          >
            <View style={styles.settingLeft}>
              <LogOut size={20} color="#FF5864" style={styles.settingIcon} />
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5864',
  },
  settingsButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileUniversity: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  profileMajor: {
    fontSize: 14,
    color: '#999',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bioSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  lifestyleSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  lifestyleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lifestyleTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  lifestyleTagText: {
    fontSize: 14,
    color: '#666',
  },
  preferencesSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  preferencesText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  settingsSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF5864',
    fontWeight: 'bold',
  },
});