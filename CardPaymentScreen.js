import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";
const CardPaymentScreen = () => {
  
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    setExpiry(formatted);
  };

  const handlePay = () => {
    if (!cardNumber || !cardHolder || !expiry || !cvv) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (cardNumber.replace(/\s/g, '').length < 16) {
      Alert.alert("Error", "Please enter a valid 16-digit card number.");
      return;
    }

    if (expiry.length < 5) {
      Alert.alert("Error", "Please enter a valid expiry date (MM/YY).");
      return;
    }

    if (cvv.length < 3) {
      Alert.alert("Error", "Please enter a valid CVV (3-4 digits).");
      return;
    }

    Alert.alert("Payment Successful", "Your payment has been processed.");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Payment Details</Text>
        
        {/* Card Preview */}
        <View style={styles.cardPreview}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Credit Card</Text>
            <View style={styles.cardTypeIndicator}></View>
          </View>
          
          <View style={styles.cardNumberPreview}>
            <Text style={styles.cardNumberText}>
              {cardNumber || '•••• •••• •••• ••••'}
            </Text>
          </View>
          
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>Card Holder</Text>
              <Text style={styles.cardValue}>
                {cardHolder || 'YOUR NAME'}
              </Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expires</Text>
              <Text style={styles.cardValue}>
                {expiry || 'MM/YY'}
              </Text>
            </View>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Card Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChangeText={formatCardNumber}
              maxLength={19}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Card Holder Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={cardHolder}
              onChangeText={setCardHolder}
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 0.48 }]}>
            <Text style={styles.label}>Expiry Date</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                value={expiry}
                onChangeText={formatExpiry}
                maxLength={5}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View style={[styles.formGroup, { flex: 0.48 }]}>
            <Text style={styles.label}>CVV</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="123"
                secureTextEntry
                keyboardType="number-pad"
                value={cvv}
                onChangeText={setCvv}
                maxLength={4}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePay}
          activeOpacity={0.8} 
        >
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>Payments are secure and encrypted</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardPreview: {
    backgroundColor: '#4a5568',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  cardHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  cardTypeIndicator: {
    width: 50,
    height: 30,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
  },
  cardNumberPreview: {
    marginBottom: 25,
  },
  cardNumberText: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: '#e2e8f0',
    fontSize: 12,
    marginBottom: 4,
  },
  cardValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  input: {
    fontSize: 16,
    color: '#2d3748',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payButton: {
    backgroundColor: '#4299e1',
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
    shadowColor: '#4299e1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  securityNote: {
    marginTop: 20,
    alignItems: 'center',
  },
  securityText: {
    color: '#718096',
    fontSize: 12,
  },
});

export default CardPaymentScreen;