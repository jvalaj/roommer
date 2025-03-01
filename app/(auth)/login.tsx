import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react-native';
import logo from '../../assets/logo.png';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (!email || !password) {
        setError('Please fill in all fields');
        return;
    }

    if (!email.endsWith('.edu')) {
        setError('Please use your .edu email address');
        return;
    }

    // In a real app, you would validate credentials against a backend
    router.replace('/(tabs)');
};


  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image 
            source={logo} 
            style={styles.logo}
          />
          <Text style={styles.title}>roommer.</Text>
          <Text style={styles.subtitle}>Find your perfect college roommate</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Mail size={20} color="#FF5864" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#FF5864" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
            <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF5864',
  },
  subtitle: {
    fontSize: 16,
    color: '#59564a',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: 'white'
  },
  errorText: {
    color: '#FF5864',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#F1D061',
    borderRadius: 8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
  },
  signupLink: {
    color: '#FF5864',
    fontWeight: 'bold',
  },
});

//orange: EB4511
//yellow:F1D061
//blue: 8EB1C7
//grey: 59564A