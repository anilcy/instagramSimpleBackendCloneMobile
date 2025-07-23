import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please enter both email and password');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Here you would call your API to authenticate
      // const result = await apiService.login({ email, password });
      // await AsyncStorage.setItem('authToken', result.token);
      // await AsyncStorage.setItem('user', JSON.stringify(result.user));

      // Mock delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to main app
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality would be implemented here');
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Sign up functionality would be implemented here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Instagram</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Phone number, username, or email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity 
                style={styles.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, (!email || !password || isLoading) && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={!email || !password || isLoading}
            >
              <Text style={[styles.loginButtonText, (!email || !password || isLoading) && styles.loginButtonTextDisabled]}>
                {isLoading ? 'Logging in...' : 'Log in'}
              </Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Facebook Login (Mock) */}
            <TouchableOpacity style={styles.facebookButton}>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Sign Up Section */}
        <View style={styles.signUpContainer}>
          <View style={styles.signUpDivider} />
          <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Sign up.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    fontSize: 50,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
    fontWeight: 'normal',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  passwordInput: {
    paddingRight: 50,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#3797EF',
    fontSize: 12,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#3797EF',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonDisabled: {
    backgroundColor: '#B2DFFC',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonTextDisabled: {
    color: '#fff',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dbdbdb',
  },
  dividerText: {
    marginHorizontal: 20,
    color: '#8e8e8e',
    fontSize: 14,
    fontWeight: '600',
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  facebookButtonText: {
    color: '#1877F2',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  signUpContainer: {
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
  },
  signUpDivider: {
    height: 1,
    backgroundColor: '#dbdbdb',
  },
  signUpTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  signUpText: {
    color: '#8e8e8e',
    fontSize: 14,
  },
  signUpLink: {
    color: '#3797EF',
    fontSize: 14,
    fontWeight: '600',
  },
});
