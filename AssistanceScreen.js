import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function VehicleAssistScreen() {
  const [selectedIssue, setSelectedIssue] = useState("engine");
  const [customIssue, setCustomIssue] = useState(""); // State for custom issue input
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [inputError, setInputError] = useState(false);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Enable location services for better assistance.");
        setLoading(false);
        return;
      }
      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } catch (error) {
        Alert.alert("Error", "Could not retrieve location.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAssistPress = () => {
    if (selectedIssue === "others" && customIssue.trim() === "") {
      setInputError(true); // Trigger red border
      //Alert.alert("Input Required", "Please describe your issue before proceeding.");
      return;
    }
  
    setInputError(false); // Clear error if input is valid
    const issueToPass = selectedIssue === "others" ? customIssue.trim() : selectedIssue;
    navigation.navigate("TroubleshootingSteps", { issue: issueToPass });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 RAVB Vehicle Assistance</Text>
      <Text style={styles.label}>Select vehicle issue</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedIssue} onValueChange={setSelectedIssue} style={styles.picker}>
          <Picker.Item label="🔧 Engine Issue" value="engine" />
          <Picker.Item label="🔋 Battery Issue" value="battery" />
          <Picker.Item label="🚨 Tire Puncture" value="tire" />
          <Picker.Item label="⛽ Fuel Problem" value="fuel" />
          <Picker.Item label="🛑 Brake Issue" value="brake" />
          <Picker.Item label="❓ Others" value="others" />
        </Picker>
      </View>

      {/* Show text input if "Others" is selected */}
      {selectedIssue === "others" && (
  <TextInput
    style={[styles.input, inputError && styles.inputError]}
    placeholder="Describe your issue..."
    value={customIssue}
    onChangeText={(text) => {
      setCustomIssue(text);
      if (text.trim() !== "") setInputError(false); // clear error on valid input
    }}
  />
)}


      <TouchableOpacity style={styles.button} onPress={handleAssistPress}>
        <Ionicons name="help-circle-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Assist</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "#007bff" },
  label: { fontSize: 16, marginBottom: 5, fontWeight: "600" },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    overflow: "hidden",
  },
  picker: { width: "100%", height: 60 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 15,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  inputError: {
    borderColor: "red",
  },
});

