import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(password);
  };

  const handleLogin = () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError(t('emailRequired'));
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t('invalidEmail'));
      isValid = false;
    }

    if (!password) {
      setPasswordError(t('passwordRequired'));
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(t('passwordTooShort'));
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(t('passwordComplexity'));
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      if (email === "sathiskjaya24@gmail.com" && password === "Sathish@23") {
        navigation.navigate('UserHome',{email});
      } else {
        Alert.alert(t('loginFailed'), t('invalidCredentials'));
      }
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    Alert.alert(t('socialLoginTitle', { provider }), t('socialLoginMessage', { provider }));
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('signIn')}</Text>
      <Text style={styles.welcomeText}>{t('welcomeBack')}</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder={t('emailAddress')}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder={t('password')}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError('');
          }}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>
      
      <TouchableOpacity 
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotPasswordText}>{t('forgotPassword')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.signInButton, loading && styles.disabledButton]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signInButtonText}>{t('signIn')}</Text>
        )}
      </TouchableOpacity>
      
      <Text style={styles.orText}>{t('orSignInWith')}</Text>
      
      <View style={styles.socialContainer}>
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={() => handleSocialLogin('Google')}
        >
          <Icon name="google" size={20} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={() => handleSocialLogin('Apple')}
        >
          <Icon name="apple" size={20} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={() => handleSocialLogin('Facebook')}
        >
          <Icon name="facebook" size={20} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={() => handleSocialLogin('Twitter')}
        >
          <Icon name="twitter" size={20} color="#1DA1F2" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>{t('noAccount')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.signUpLink}>{t('signUp')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: isDarkMode ? '#121212' : '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#007bff',
  },
  welcomeText: {
    fontSize: 16,
    color: isDarkMode ? '#aaa' : '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: isDarkMode ? '#444' : '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#000',
    backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: isDarkMode ? '#aaa' : '#666',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#007bff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: isDarkMode ? '#aaa' : '#666',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: isDarkMode ? '#444' : '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: isDarkMode ? '#aaa' : '#666',
  },
  signUpLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.7,
  },
});
export default LoginForm;