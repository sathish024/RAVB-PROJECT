import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PaymentProceed({ route }) {
  const navigation = useNavigation();
  const { estimatedFee = "0", } = route.params || {}; // Get estimated cost
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const handlePayment = () => {
    const numericEstimatedFee = parseFloat(estimatedFee.replace(/[^0-9.]/g, ""));
    const numericAmount = parseFloat(amount);

    if (numericAmount !== numericEstimatedFee) {
      Alert.alert("Error", "Entered amount does not match the estimated cost!");
      return;
    }

    if (pin !== "8724") {
      Alert.alert("Error", "Invalid PIN!");
      return;
    }

    Alert.alert("Success", "Payment Successful!");
    navigation.replace("LiveMechanicTracking");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔒 Secure Payment</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Estimated Cost</Text>
        <Text style={styles.amount}>{estimatedFee}</Text>
        <Text style={styles.label}>Enter Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter Amount"
          placeholderTextColor="#999"
        />
        <Text style={styles.label}>Enter PIN:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          secureTextEntry={true} // Ensures PIN is numeric but hidden
          value={pin}
          onChangeText={setPin}
          placeholder="●●●●"
          maxLength={4}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>💳 Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
    marginTop: 10,
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginVertical: 10,
  },
  input: {
    width: "85%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
