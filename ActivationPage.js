import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ActivationPage = () => {
  const [distanceLimit, setDistanceLimit] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxRequests, setMaxRequests] = useState("");
  const navigation = useNavigation();
  const handleActivate = () => {
    navigation.navigate("MechanicHome", { activated: true });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Activate Today's Service</Text>
      <View style={styles.card}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Distance Limit (km):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={distanceLimit}
            onChangeText={setDistanceLimit}
            placeholder="Enter distance"
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.label}>Start:</Text>
          <TextInput
            style={styles.timeInput}
            value={startTime}
            onChangeText={setStartTime}
            placeholder="HH:MM"
          />
          <Text style={styles.label}>End:</Text>
          <TextInput
            style={styles.timeInput}
            value={endTime}
            onChangeText={setEndTime}
            placeholder="HH:MM"
          />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.label}>Max Requests:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={maxRequests}
            onChangeText={setMaxRequests}
            placeholder="Enter max requests"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.activateButton} onPress={handleActivate}>
        <Text style={styles.buttonText}>Activate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  input: {
    height: 45,
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#f8f9fa",
    marginLeft: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  timeInput: {
    height: 45,
    width: "40%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#f8f9fa",
  },
  activateButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ActivationPage;
