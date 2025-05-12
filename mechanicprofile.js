import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
const MechanicProfile = () => {
  const navigation = useNavigation();
  const defaultProfileImage = "https://via.placeholder.com/150";
  const [profile, setProfile] = useState({
    image: "",
    name: "",
    phone: "",
    email: "",
    location: "",
    shopName: "",
    aadhaarNumber: "",
    shopLicense: "",
    experience: "",
  });
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem("mechanicProfile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  const handleInputChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({ ...profile, image: result.assets[0].uri });
    }
  };
  const handleApplyChanges = async () => {
    
    try {
      await AsyncStorage.setItem("mechanicProfile", JSON.stringify(profile));
      alert("Profile updated successfully!");
     
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
    navigation.navigate("MechanicHome");
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profile.image || defaultProfileImage }} style={styles.profileImage} />
        <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Change Image</Text>
        </TouchableOpacity>
      </View>

      {Object.keys(profile).map((key) =>
        key !== "image" ? (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").trim()}:</Text>
            <TextInput
              style={styles.input}
              value={profile[key]}
              onChangeText={(text) => handleInputChange(key, text)}
              placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}`}
              placeholderTextColor="#aaa"
            />
          </View>
        ) : null
      )}

      <TouchableOpacity style={styles.applyButton} onPress={handleApplyChanges}>
        <Text style={styles.buttonText}>Apply Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },
  profileHeader: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 10, borderWidth: 2, borderColor: "#007bff" },
  changeImageButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "bold" },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", color: "#333" },
  input: { backgroundColor: "white", padding: 10, borderRadius: 8, borderColor: "#ccc", borderWidth: 1, marginTop: 5 },
  applyButton: { backgroundColor: "green", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10, },
});

export default MechanicProfile;
