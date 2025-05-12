import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ServiceOverScreen = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigation = useNavigation();
  const correctCode = "8724";

  const handleInputChange = (text, index) => {
    if (text.length > 1) return;
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = () => {
    if (code.join("") === correctCode) {
      Alert.alert("Success", "Service Over Code verified!");
      navigation.navigate("MechanicHome");
    } else {
      Alert.alert("Error", "Invalid Code! Try again.");
      setCode(["", "", "", ""]);
      inputRefs[0].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Service Over Code</Text>
      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.inputBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={code.includes("")}> 
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f9fa" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "#333" },
  inputContainer: { flexDirection: "row", gap: 10, marginBottom: 20 },
  inputBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007bff",
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "white",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    opacity: 1,
  },
  submitText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default ServiceOverScreen;
