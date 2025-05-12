import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const OTPVerificationScreen1 = ({ route, navigation }) => {
  const  phone = "+916381338346";
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const {name,email} = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  // Twilio credentials (should ideally be in environment variables)
  const twilioAccountSid = "AC3a60c7701d0a9ba8b77880f3c80c1a7f";
  const twilioAuthToken = "6fe192ee6f6deffd69152ce6f352a4eb";
  const fromNumber = "+17623769325";
  
  useEffect(() => {
    generateAndSendOTP();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const sendOTPviaTwilio = async (phoneNumber, otp) => {
    setLoading(true);
    try {
      // Ensure proper phone number formatting
      const toNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
        new URLSearchParams({
          To: toNumber,
          From: fromNumber,
          Body: `Your verification code is: ${otp}`
        }),
        {
          auth: {
            username: twilioAccountSid,
            password: twilioAuthToken
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          }
        }
      );
      
      console.log('Twilio response:', response.data);
    } catch (error) {
      console.error('Error sending OTP:', error.response?.data || error.message);
      Alert.alert(
        t('error'), 
        error.response?.data?.message || t('failedToSendOTP')
      );
    } finally {
      setLoading(false);
    }
  };

  const generateAndSendOTP = () => {
    const newOTP = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(newOTP);
    sendOTPviaTwilio(phone, newOTP);
    startCountdown();
  };
  
  const handleChange = (text, index) => {
    const numericText = text.replace(/[^0-9]/g, '');
    
    const newOtp = [...otp];
    newOtp[index] = numericText;
    setOtp(newOtp);
    setError('');
    
    if (numericText && index < 3) {
      inputs.current[index + 1].focus();
    }
    if (index === 3 && numericText) {
      Keyboard.dismiss();
      verifyOTP(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyOTP = (enteredOTP) => {
   
    if (enteredOTP === generatedOTP) {
       navigation.navigate('Mechanic',{name,email});
    } else {
      setError(t('invalidOTP'));
      setOtp(['', '', '', '']);
      inputs.current[0].focus();
    }
  };

  const resendOTP = () => {
    if (!resendDisabled) {
      generateAndSendOTP();
    }
  };

  const startCountdown = () => {
    setResendDisabled(true);
    setCountdown(30);
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('verifyCode')}</Text>
      <Text style={styles.subtitle}>{t('enterCodeSentTo')}</Text>
      <Text style={styles.phoneNumber}>{phone}</Text>
      <View style={styles.otpContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            style={[styles.otpInput, error ? styles.errorInput : null]}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            ref={(ref) => (inputs.current[index] = ref)}
            autoFocus={index === 0}
            placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          />
        ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={resendOTP} disabled={resendDisabled || loading}>
        <Text style={[styles.resendText, (resendDisabled || loading) && styles.disabledResend]}>
          {loading ? t('sending') : 
           resendDisabled ? `${t('resendIn')} ${countdown}s` : t('resendCode')}
        </Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: isDarkMode ? '#fff' : '#000',
  },
  subtitle: {
    fontSize: 16,
    color: isDarkMode ? '#aaa' : '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: isDarkMode ? '#444' : '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    color: isDarkMode ? '#fff' : '#000',
    backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
  },
  errorInput: {
    borderColor: '#E74C3C',
  },
  errorText: {
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 15,
  },
  resendText: {
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  disabledResend: {
    color: isDarkMode ? '#555' : '#ccc',
  },
});

export default OTPVerificationScreen1;