import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
const ServiceOverScreen = ({route}) => {
  const [generatedCode, setGeneratedCode] = useState([]);
  const navigation = useNavigation(); 
  const {name,location} = route.params || {}; 
  // Generate a new 4-digit code every time the screen loads
  useEffect(() => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString().split("");
    setGeneratedCode(newCode);
  }, []);
  // Handle submission
  const handleSubmit = () => {
    navigation.navigate("RatingReviewScreen",{name,location});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SERVICE OVER CODE</Text>
      <Text style={styles.subtitle}>Use this code to verify your service completion.</Text>
      {/* Display generated code in non-editable input boxes */}
      <View style={styles.codeContainer}>
        {generatedCode.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.inputBox}
            value={digit}
            editable={false} // Prevents user from editing the numbers
          />
        ))}
      </View>
      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputBox: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#007bff",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#fff",
    marginHorizontal: 5,
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceOverScreen;
