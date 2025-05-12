import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function PaymentScreen({ route }) {
  const navigation = useNavigation();
  const { estimatedFee = "0",name = "Unknown",location = "Unknown" } = route.params || {}; 
  const handlePayment = (method) => {
    if (method === "UPI") {
      const paytmUPIUrl = `paytmmp://pay?pa=your-merchant-vpa@paytm&pn=MerchantName&am=${estimatedFee}&cu=INR`;
      Linking.openURL(paytmUPIUrl).catch(() => {
        Alert.alert("Error", "Unable to open Paytm. Make sure it's installed.");
      });
    } else if (method === "Cash on Delivery") {
      navigation.navigate("LiveMechanicTracking",{name,location});
    } else if (method === "QR Code") {
      const qrData = `paytm://pay?pa=your-merchant-vpa@paytm&pn=MerchantName&am=${estimatedFee}&cu=INR`;
      navigation.navigate("QRCodeScreen", { qrValue: qrData, estimatedFee });
    }else if(method === "Credit/Debit Card"){
      navigation.navigate("CardPaymentScreen");
    }else if(method === "Net Banking"){
      navigation.navigate("NetBankingScreen");
    }  else {
      navigation.navigate("PaymentProceed", { estimatedFee, name,location });
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💳 Payment Methods</Text>

      <View style={styles.card}>
        <Text style={styles.costText}>Estimated Cost</Text>
        <Text style={styles.amount}>{estimatedFee}</Text>
        {["Credit/Debit Card", "UPI", "Wallet", "Net Banking", "QR Code", "Cash on Delivery"].map((method) => (
          <TouchableOpacity key={method} onPress={() => handlePayment(method)} style={styles.buttonContainer}>
            <LinearGradient colors={["#007bff", "#0056b3"]} style={styles.button}>
              <Text style={styles.buttonText}>{method}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f6f8", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#333", marginBottom: 20, textAlign: "center" },
  
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
  
  costText: { fontSize: 18, color: "#666", fontWeight: "500" },
  amount: { fontSize: 26, fontWeight: "bold", color: "#007bff", marginVertical: 10 },

  buttonContainer: { width: "100%", marginVertical: 5 },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
