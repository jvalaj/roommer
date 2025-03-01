import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Camera, Plus, ArrowRight, Check } from 'lucide-react-native';

const LIFESTYLE_OPTIONS = [
  'Early Bird', 'Night Owl', 'Neat', 'Relaxed', 'Studious', 
  'Social', 'Quiet', 'Active', 'Homebody', 'Foodie'
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [bio, setBio] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>([]);
  const [roommatePref, setRoommatePref] = useState('');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // In a real app, you would save this profile data
      router.replace('/(tabs)');
    }
  };

  const toggleLifestyleOption = (option: string) => {
    if (selectedLifestyle.includes(option)) {
      setSelectedLifestyle(selectedLifestyle.filter(item => item !== option));
    } else {
      if (selectedLifestyle.length < 5) {
        setSelectedLifestyle([...selectedLifestyle, option]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Complete Your Profile</Text>
        <Text style={styles.stepIndicator}>Step {step} of 3</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Add your photos</Text>
            <Text style={styles.stepDescription}>
              Add at least 2 photos to help potential roommates get to know you better
            </Text>

            <View style={styles.photoGrid}>
              <TouchableOpacity style={styles.photoUpload}>
                <Camera size={32} color="#FF5864" />
                <Text style={styles.photoUploadText}>Main Photo</Text>
              </TouchableOpacity>
              
              {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity key={index} style={styles.photoUpload}>
                  <Plus size={32} color="#ccc" />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.stepTitle}>About you</Text>
            <TextInput
              style={styles.bioInput}
              placeholder="Write a short bio about yourself..."
              multiline
              numberOfLines={4}
              value={bio}
              onChangeText={setBio}
            />

            <View style={styles.rowInputs}>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Major</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Computer Science"
                  value={major}
                  onChangeText={setMajor}
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Year</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Sophomore"
                  value={year}
                  onChangeText={setYear}
                />
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Your Lifestyle</Text>
            <Text style={styles.stepDescription}>
              Select up to 5 options that best describe your lifestyle
            </Text>

            <View style={styles.lifestyleOptions}>
              {LIFESTYLE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.lifestyleOption,
                    selectedLifestyle.includes(option) && styles.selectedLifestyleOption
                  ]}
                  onPress={() => toggleLifestyleOption(option)}
                >
                  {selectedLifestyle.includes(option) && (
                    <Check size={16} color="#fff" style={styles.checkIcon} />
                  )}
                  <Text 
                    style={[
                      styles.lifestyleOptionText,
                      selectedLifestyle.includes(option) && styles.selectedLifestyleOptionText
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.selectedCount}>
              {selectedLifestyle.length}/5 selected
            </Text>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Roommate Preferences</Text>
            <Text style={styles.stepDescription}>
              Tell us what you're looking for in a roommate
            </Text>

            <TextInput
              style={[styles.bioInput, { height: 120 }]}
              placeholder="Describe your ideal roommate..."
              multiline
              numberOfLines={4}
              value={roommatePref}
              onChangeText={setRoommatePref}
            />

            <Text style={styles.stepTitle}>Matching Preferences</Text>
            
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Gender Preference</Text>
              <View style={styles.preferenceOptions}>
                <TouchableOpacity style={[styles.preferenceOption, styles.selectedPreferenceOption]}>
                  <Text style={styles.selectedPreferenceText}>Any</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.preferenceOption}>
                  <Text style={styles.preferenceOptionText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.preferenceOption}>
                  <Text style={styles.preferenceOptionText}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Cleanliness Level</Text>
              <View style={styles.preferenceOptions}>
                <TouchableOpacity style={styles.preferenceOption}>
                  <Text style={styles.preferenceOptionText}>Very Neat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.preferenceOption, styles.selectedPreferenceOption]}>
                  <Text style={styles.selectedPreferenceText}>Average</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.preferenceOption}>
                  <Text style={styles.preferenceOptionText}>Relaxed</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Noise Level</Text>
              <View style={styles.preferenceOptions}>
                <TouchableOpacity style={styles.preferenceOption}>
                  <Text style={styles.preferenceOptionText}>Quiet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.preferenceOption, styles.selectedPreferenceOption]}>
                  <Text style={styles.selectedPreferenceText}>Moderate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.preferenceOption}>
                  <Text style={styles.preferenceOptionText}>Lively</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {step > 1 && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setStep(step - 1)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {step === 3 ? 'Finish' : 'Next'}
          </Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8EB1C7',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5864',
  },
  stepIndicator: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  photoUpload: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: '3.5%',
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
  photoUploadText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  halfInput: {
    width: '48%',
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  lifestyleOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  lifestyleOption: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedLifestyleOption: {
    backgroundColor: '#FF5864',
  },
  lifestyleOptionText: {
    color: '#333',
  },
  selectedLifestyleOptionText: {
    color: '#fff',
  },
  checkIcon: {
    marginRight: 5,
  },
  selectedCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  preferenceItem: {
    marginBottom: 20,
  },
  preferenceLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  preferenceOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preferenceOption: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedPreferenceOption: {
    backgroundColor: '#FF5864',
  },
  preferenceOptionText: {
    color: '#333',
  },
  selectedPreferenceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#8EB1C7',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#FF5864',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});