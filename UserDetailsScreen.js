import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "react-i18next";

const UserScreen = ({navigation, route }) => {
  const { isDarkMode } = useTheme();
  const { name, email } = route.params || {};
  const phone = "+916381338346";
  const { t } = useTranslation();  
  const [formData, setFormData] = useState({
    name: name || "",
    phone: phone,
    email: email || "",
    gender: "",
    location: "",
    vehicleType: "",
    vehicleModel: "",
    registrationNo: "",
    profileImage: null,
  });
  const [errors, setErrors] = useState({});
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(t("permissionRequired"), t("galleryPermissionRequired"));
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData({...formData, profileImage: result.assets[0].uri});
    }
  };

  const detectLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(t("permissionRequired"), t("locationPermissionRequired"));
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = locationData.coords;
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });
      let detectedLocation = "";
      
      if (address.length > 0) {
        const { city, region, country } = address[0];
        detectedLocation = `${city || ""}, ${region || ""}, ${country || ""}`;
      } else {
        detectedLocation = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      }
      setFormData({...formData, location: detectedLocation});
    } catch (error) {
      Alert.alert(t("error"), t("locationFetchError"));
    }
  };

  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value});
    if (errors[field]) {
      setErrors({...errors, [field]: null});
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.gender) newErrors.gender = t("selectGender");
    if (!formData.location) newErrors.location = t("selectLocation");
    if (!formData.vehicleType.trim()) newErrors.vehicleType = t("vehicleTypeRequired");
    if (!formData.vehicleModel.trim()) newErrors.vehicleModel = t("vehicleModelRequired");

    if (!formData.registrationNo.trim()) newErrors.registrationNo = t("registrationNumberRequired");
    else if (!/^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/.test(formData.registrationNo))
      newErrors.registrationNo = t("registrationFormat");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    navigation.navigate("UserHome",{formData});
  };
  const styles = getStyles(isDarkMode);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color={isDarkMode ? "#fff" : "#000"} 
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t("completeProfile")}</Text>
            <View style={{ width: 24 }} />
          </View>

          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <Image 
              source={formData.profileImage ? { uri: formData.profileImage } : require("./roadside/profile.jpg")} 
              style={styles.profileImage} 
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={14} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={styles.imageText}>{t("tapToSelectImage")}</Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>{t("fullName")}</Text>
            <TextInput 
              style={[styles.input, errors.name && styles.inputError]} 
              placeholder={t("enterFullName")} 
              value={formData.name} 
              onChangeText={(text) => handleChange('name', text)} 
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.label}>{t("phoneNumber")}</Text>
            <TextInput 
              style={[styles.input, errors.phone && styles.inputError]} 
              placeholder={t("enterPhoneNumber")} 
              keyboardType="phone-pad" 
              value={"+916381338346"} 
              onChangeText={(text) => { 
                if (text.startsWith("+91 ")) handleChange('phone', text); 
              }} 
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <Text style={styles.label}>{t("emailID")}</Text>
            <TextInput 
              style={[styles.input, errors.email && styles.inputError]} 
              placeholder={t("enterEmailID")} 
              keyboardType="email-address" 
              value={formData.email} 
              onChangeText={(text) => handleChange('email', text)} 
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.label}>{t("gender")}</Text>
            <View style={styles.genderContainer}>
              {["male", "female", "other"].map((option) => (
                <TouchableOpacity 
                  key={option} 
                  style={[
                    styles.genderButton, 
                    formData.gender === option && styles.genderButtonSelected
                  ]} 
                  onPress={() => handleChange('gender', option)}
                >
                  <Text style={[
                    styles.genderText, 
                    formData.gender === option && styles.genderTextSelected
                  ]}>
                    {t(option)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

            <Text style={styles.label}>{t("location")}</Text>
            <View style={styles.locationContainer}>
              <TextInput 
                style={[styles.locationInput, errors.location && styles.inputError]} 
                placeholder={t("selectLocation")} 
                value={formData.location} 
                editable={false} 
                placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
              />
              <TouchableOpacity onPress={detectLocation} style={styles.detectButton}>
                <Ionicons name="locate" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

            <Text style={styles.label}>{t("vehicleType")}</Text>
            <View style={styles.genderContainer}>
              {["2 Wheel", "3 Wheel", "4 Wheel"].map((type) => (
                <TouchableOpacity 
                  key={type} 
                  style={[
                    styles.genderButton, 
                    formData.vehicleType === type && styles.genderButtonSelected
                  ]} 
                  onPress={() => handleChange('vehicleType', type)}
                >
                  <Text style={[
                    styles.genderText, 
                    formData.vehicleType === type && styles.genderTextSelected
                  ]}>
                    {t(type.toLowerCase().replace(' ', '') || "")}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.vehicleType && <Text style={styles.errorText}>{errors.vehicleType}</Text>}

            <Text style={styles.label}>{t("vehicleModel")}</Text>
            <TextInput 
              style={[styles.input, errors.vehicleModel && styles.inputError]} 
              placeholder={t("enterVehicleModel")} 
              value={formData.vehicleModel} 
              onChangeText={(text) => handleChange('vehicleModel', text)} 
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
            {errors.vehicleModel && <Text style={styles.errorText}>{errors.vehicleModel}</Text>}

            <Text style={styles.label}>{t("regNoPlaceholder")}</Text>
            <TextInput 
              style={[styles.input, errors.registrationNo && styles.inputError]} 
              placeholder={t("enterRegistrationNo")} 
              value={formData.registrationNo} 
              onChangeText={(text) => handleChange('registrationNo', text)} 
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
            {errors.registrationNo && <Text style={styles.errorText}>{errors.registrationNo}</Text>}
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
            <LinearGradient 
              colors={["#007bff", "#0056b3"]} 
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>{t("saveProfile")}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: isDarkMode ? "#121212" : "#f8f9fa",
  },
  scrollContainer: { 
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: { 
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop:20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: isDarkMode ? "#fff" : "#000",
  },
  imageContainer: { 
    alignSelf: "center",
    position: "relative", 
    marginBottom: 8,
  },
  profileImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    borderWidth: 2, 
    borderColor: isDarkMode ? "#444" : "#ddd",
  },
  cameraIcon: { 
    position: "absolute", 
    bottom: 5, 
    right: 5, 
    backgroundColor: "#007bff", 
    borderRadius: 12, 
    padding: 4,
  },
  imageText: { 
    fontSize: 12, 
    color: isDarkMode ? "#aaa" : "#666", 
    marginBottom: 16,
    textAlign: "center",
  },
  formContainer: { 
    backgroundColor: isDarkMode ? "#1e1e1e" : "#fff", 
    padding: 16, 
    borderRadius: 10, 
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 16,
  },
  label: {
    color: isDarkMode ? "#ddd" : "#333",
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "500",     
  },
  input: { 
    height: 42, 
    borderWidth: 1, 
    borderColor: isDarkMode ? "#444" : "#ddd", 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    backgroundColor: isDarkMode ? "#2a2a2a" : "#fff", 
    marginBottom: 8, 
    color: isDarkMode ? "#fff" : "#000",
    fontSize: 14,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationInput: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: isDarkMode ? "#444" : "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: isDarkMode ? "#2a2a2a" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    fontSize: 14,
  },
  detectButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 10,
    marginLeft: 8,
  },
  inputError: { 
    borderColor: "#ff4444",
  },
  errorText: { 
    color: "#ff4444", 
    fontSize: 11, 
    marginBottom: 8,
    marginTop: -4,
  },
  buttonContainer: { 
    marginBottom: 8,
  },
  button: { 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: "center",
  },
  buttonText: { 
    fontSize: 15, 
    fontWeight: "600", 
    color: "#fff",
  },
  genderContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 8,
  },
  genderButton: { 
    flex: 1, 
    marginHorizontal: 4, 
    paddingVertical: 10, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "#007bff", 
    backgroundColor: isDarkMode ? "#2a2a2a" : "#fff",
  },
  genderButtonSelected: { 
    backgroundColor: "#007bff",
  },
  genderText: { 
    color: "#007bff", 
    fontSize: 13,
    textAlign: "center",
  },
  genderTextSelected: { 
    color: "#fff",
  },
});

export default UserScreen;