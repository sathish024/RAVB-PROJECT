import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RequestDetails = ({ navigation, route }) => {
  const request = route.params?.request;
  const handleAccept = () => {
    alert("Request Accepted!");
    navigation.navigate("MechanicUserTracking",{name : request.name , location : request.location});
  };
  const handleReject = () => {
    alert("Request Rejected!");
    navigation.navigate("MechanicHome");
  };
  if (!request) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>No request data found...</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons 
          name="arrow-back" 
          size={30} 
          color="white" 
          onPress={() => navigation.goBack()} 
        />
        <Text style={styles.headerTitle}>Request Details</Text>
      </View>

      {/* User Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Information</Text>
        <Text style={styles.detailText}>👤 Name: {request.name}</Text>
        <Text style={styles.detailText}>📍 Location: {request.location}</Text>
        <Text style={styles.detailText}>📞 Phone: {request.phone}</Text>
        <Text style={styles.detailText}>🚗 Vehicle: {request.vehicleModel} ({request.vehicleType})</Text>
      </View>

      {/* Service Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Details</Text>
        <Text style={styles.detailText}>🔧 Service: {request.serviceType}</Text>
        <Text style={styles.detailText}>⏳ Estimated Time: {request.timeTaken}</Text>
        <Text style={styles.detailText}>📏 Distance: {request.distance}</Text>
      </View>

      {/* Required Tools */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Required Tools</Text>
        {request.requiredTools.map((tool, index) => (
          <Text key={index} style={styles.detailText}>• {tool}</Text>
        ))}
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Text style={styles.detailText}>💳 {request.paymentType}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Ionicons name="checkmark-circle" size={34} color="white" />
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Ionicons name="close-circle" size={34} color="white" />
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Keep the same styles as before
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginTop:30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  section: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  acceptButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
  },
  rejectButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    marginTop: 50,
  },
});

export default RequestDetails;