import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { CreditCard as Edit2, Settings, LogOut, Bell, Shield, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';
import pfp from '../../assets/images/mypfp.jpg';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Editable fields
  const [bio, setBio] = useState("I'm a CS major who enjoys hiking and playing video games...");
  const [preferences, setPreferences] = useState("Looking for someone who is clean, respectful, and follows quiet hours during the week.");

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", onPress: () => router.replace('/login'), style: "destructive" }
      ]
    );
  };

  const handleSaveChanges = () => {
    Alert.alert("Saved", "Your changes have been saved.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image source={pfp} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Jvalaj Pandey</Text>
            <Text style={styles.profileUniversity}>University of South Florida</Text>
            <Text style={styles.profileMajor}>Computer Science • Junior</Text>
          </View>
          
        </View>

        {/* Editable Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <TextInput
            style={styles.editableText}
            multiline
            value={bio}
            onChangeText={setBio}
            placeholder="Write something about yourself..."
          />
          
        </View>
        

        {/* Lifestyle Tags (Static for now) */}
        <View style={styles.lifestyleSection}>
          <Text style={styles.sectionTitle}>My Lifestyle</Text>
          <View style={styles.lifestyleTags}>
            {['Early Bird', 'Neat', 'Studious', 'Active'].map((tag) => (
              <View key={tag} style={styles.lifestyleTag}>
                <Text style={styles.lifestyleTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Editable Preferences Section */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Roommate Preferences</Text>
          <TextInput
            style={styles.editableText}
            multiline
            value={preferences}
            onChangeText={setPreferences}
            placeholder="What kind of roommate are you looking for?"
          />
        </View>

        {/* Settings Section */}
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

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <HelpCircle size={20} color="#666" style={styles.settingIcon} />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.logoutButton]} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <LogOut size={20} color="#FF5864" style={styles.settingIcon} />
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#black' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 50, paddingHorizontal: 20, paddingBottom: 10, backgroundColor: '#000',
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FF5864' },
  settingsButton: { padding: 5 },
  content: { flex: 1 },
  profileHeader: {
    flexDirection: 'row', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  profileInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  profileName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  profileUniversity: { fontSize: 16, color: '#666', marginBottom: 2 },
  profileMajor: { fontSize: 14, color: '#999' },
  editButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0',
    justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
  },
  bioSection: { padding: 20, backgroundColor: '#fff', marginBottom: 15 },
  lifestyleSection: { padding: 20, backgroundColor: '#fff', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  lifestyleTags: { flexDirection: 'row', flexWrap: 'wrap' },
  lifestyleTag: {
    backgroundColor: '#f0f0f0', paddingHorizontal: 15, paddingVertical: 8,
    borderRadius: 20, marginRight: 10, marginBottom: 10,
  },
  lifestyleTagText: { fontSize: 14, color: '#666' },
  preferencesSection: { padding: 20, backgroundColor: '#fff', marginBottom: 15 },
  settingsSection: { padding: 20, backgroundColor: '#fff', marginBottom: 30 },
  settingItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  settingIcon: { marginRight: 15 },
  settingText: { fontSize: 16, color: '#333' },
  logoutButton: { borderBottomWidth: 0, marginTop: 10 },
  logoutText: { fontSize: 16, color: '#FF5864', fontWeight: 'bold' },
  editableText: {
    fontSize: 14, lineHeight: 22, color: '#333', backgroundColor: '#f0f0f0',
    padding: 10, borderRadius: 8, textAlignVertical: 'top', minHeight: 80,
  },
  saveButton: { backgroundColor: '#daefb3', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, alignSelf: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
