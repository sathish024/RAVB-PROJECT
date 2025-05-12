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

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const validateName = (name) => {
    if (!name.trim()) return t('nameRequired');
    if (name.length < 3) return t('nameTooShort');
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return t('emailRequired');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return t('invalidEmail');
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return t('phoneRequired');
    if (!/^[0-9]{10,15}$/.test(phone)) return t('invalidPhone');
    return '';
  };

  const validatePassword = (password) => {
    if (!password.trim()) return t('passwordRequired');
    if (password.length < 8) return t('passwordTooShort');
    return '';
  };

  const handleSignUp = () => {
    
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      password: passwordError
    });

    if (nameError || emailError || phoneError || passwordError) {
      return;
    }

    if (!agreeTerms) {
      Alert.alert(t('error'), t('agreeTermsRequired'));
      return;
    }

    setLoading(true);
    
    try {
      const userData = {
        name,
        email,
        phone,
      };
      console.log(name);
      // Instead of AsyncStorage, we'll just navigate with the user data
     navigation.navigate('OTPVerificationScreen1', { name,email });
      

    } catch (error) {
      Alert.alert(t('error'), t('registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('createAccount')}</Text>
        <Text style={styles.headerSubtitle}>{t('fillInformationOrRegister')}</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          placeholder={t('fullName')}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors({...errors, name: ''});
          }}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder={t('emailAddress')}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({...errors, email: ''});
          }}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <TextInput
          style={[styles.input, errors.phone ? styles.inputError : null]}
          placeholder={t('phoneNumber')}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            setErrors({...errors, phone: ''});
          }}
        />
        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder={t('password')}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({...errors, password: ''});
          }}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <View style={styles.termsContainer}>
          <TouchableOpacity 
            style={styles.checkbox} 
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            {agreeTerms ? (
              <Icon name="check-square" size={20} color="#007bff" />
            ) : (
              <Icon name="square-o" size={20} color={isDarkMode ? '#aaa' : '#888'} />
            )}
          </TouchableOpacity>
          <Text style={styles.termsText}>{t('agreeTerms')}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.signUpButton, loading && styles.disabledButton]} 
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.signUpButtonText}>{t('signUp')}</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('alreadyHaveAccount')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginMech')}>
          <Text style={styles.footerLink}>{t('signIn')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#F8F9FA',
    paddingHorizontal: 25,
  },
  header: {
    marginBottom: 30,
    marginTop: 100,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007bff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: isDarkMode ? '#aaa' : '#666',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
    borderWidth: 1,
    borderColor: isDarkMode ? '#444' : '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15,
    color: isDarkMode ? '#fff' : '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: '#E74C3C',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    fontSize: 14,
    color: isDarkMode ? '#ddd' : '#555',
  },
  signUpButton: {
    backgroundColor: '#007bff',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.7,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: isDarkMode ? '#aaa' : '#666',
    fontSize: 14,
  },
  footerLink: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;