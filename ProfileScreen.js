import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ route }) {
  const initialUserData = route.params?.formData || {
    profileImage: null,
    name: "sathishkumar",
    phone: "638133846",
    email: "sathiskjaya24@gmail.com",
    vehicleType: "4 wheel",
    vehicleModel: "SUV",
    registrationNo: "PY 01 BC 4884",
  };
  const [userData, setUserData] = useState(initialUserData);
  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData((prevData) => ({ ...prevData, profileImage: result.assets[0].uri }));
    }
  };

  const handleApplyChanges = () => {
    Alert.alert("Success", "Profile changes applied (demo)");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Image 
          source={userData.profileImage ? { uri: userData.profileImage } : require("./roadside/profile.jpg")} 
          style={styles.avatar} 
        />
        <Text style={styles.editText}>Change Profile Picture</Text>
      </TouchableOpacity>
      {[
        { label: "FullName", field: "name" },
        { label: "Phone Number", field: "phone" },
        { label: "Email", field: "email" },
        { label: "Vehicle Type", field: "vehicleType" },
        { label: "Vehicle Model", field: "vehicleModel" },
        { label: "Registration Number", field: "registrationNo" },
      ].map(({ label, field }) => (
        <View key={field} style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={userData[field] || initialUserData[field]}
            onChangeText={(value) => handleInputChange(field, value)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleApplyChanges}>
        <Text style={styles.buttonText}>Apply Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "#f5f5f5" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 ,
    marginTop:10,
  },
  imageContainer: { 
    alignItems: "center", 
    marginBottom: 20 
  },
  avatar: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 2, 
    borderColor: "#ccc" 
  },
  editText: { 
    color: "#007BFF", 
    marginTop: 5 
  },
  inputContainer: { 
    width: "100%", 
    marginBottom: 15 
  },
  label: { 
    fontSize: 14, 
    fontWeight: "600", 
    marginBottom: 5, 
    color: "#333" 
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
});