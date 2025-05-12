import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';

const NetBankingScreen = () => {
  const [selectedBank, setSelectedBank] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank'
  ];

  const handlePayment = () => {
    if (!selectedBank || !username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', `Payment via ${selectedBank} initiated`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Net Banking Payment</Text>
      
      {/* Bank Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Select Your Bank</Text>
        <View style={styles.bankContainer}>
          {banks.map((bank) => (
            <TouchableOpacity
              key={bank}
              style={[
                styles.bankOption,
                selectedBank === bank && styles.selectedBank
              ]}
              onPress={() => setSelectedBank(bank)}>
              <Text style={selectedBank === bank ? styles.selectedBankText : styles.bankText}>
                {bank}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Login Credentials */}
      <View style={styles.section}>
        <Text style={styles.label}>Internet Banking Credentials</Text>
        <TextInput
          style={styles.input}
          placeholder="Customer ID/Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Payment Button */}
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Proceed to Pay</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        You'll be redirected to your bank's secure page for authorization
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333'
  },
  section: {
    marginBottom: 25
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555'
  },
  bankContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  bankOption: {
    width: '48%',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  selectedBank: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2'
  },
  bankText: {
    color: '#333'
  },
  selectedBankText: {
    color: '#fff'
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  payButton: {
    backgroundColor: '#1976d2',
    padding: 16,
    borderRadius: 8,
    marginTop: 10
  },
  payButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  note: {
    marginTop: 20,
    textAlign: 'center',
    color: '#777',
    fontSize: 14
  }
});

export default NetBankingScreen;