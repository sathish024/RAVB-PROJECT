import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Share } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import icon library

export default function QRCodeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { qrValue, estimatedFee } = route.params || {};

  if (!qrValue) {
    Alert.alert("Error", "Invalid QR Code");
    navigation.goBack();
  }

  const shareQRCode = async () => {
    try {
      await Share.share({
        message: `Scan this Paytm QR Code to pay ₹${estimatedFee}:\n${qrValue}`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share QR Code");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.qrTitle}>Scan this QR Code to Pay</Text>
      <QRCode value={qrValue} size={250} />
      
      {/* Share Button with Icon */}
      <TouchableOpacity onPress={shareQRCode} style={styles.shareButton}>
        <Ionicons name="share-social-outline" size={24} color="#fff" />
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
      
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f6f8", padding: 20 },
  qrTitle: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 20 },

  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  shareText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#555",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  backText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
});
