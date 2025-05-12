import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ScrollView, 
  Alert 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';

const MechanicProfile = ({ route }) => {
  const navigation = useNavigation();
  const defaultProfileImage = require("./roadside/profile.jpg");
  const defaultMobileNumber = "+91 6381338346";
  const {name,email} = route.params;
  // Initialize with data from route.params if available
  const [profile, setProfile] = useState({
    image: "",  
    name: name || "",
    phone: defaultMobileNumber,
    email: email || "",
    location: "",
    shopName: "",
    aadhaarPart1: "",
    aadhaarPart2: "",
    aadhaarPart3: "",
    aadhaarPart4: "",
    shopLicense: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [locationLoading, setLocationLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load location when component mounts
    getLocation();
  }, []);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    
    if (!profile.name.trim()) {
      newErrors.name = "Name is required";
    } else if (profile.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    
    if (!profile.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(profile.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Invalid phone number";
    }
    
    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(profile.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!profile.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    if (!profile.shopName.trim()) {
      newErrors.shopName = "Shop name is required";
    }
    
    const aadhaarComplete = profile.aadhaarPart1.length === 4 && 
                           profile.aadhaarPart2.length === 4 && 
                           profile.aadhaarPart3.length === 4 && 
                           profile.aadhaarPart4.length === 4;
    
    if (!aadhaarComplete) {
      newErrors.aadhaar = "Complete Aadhaar number is required";
    }
    
    if (!profile.shopLicense.trim()) {
      newErrors.shopLicense = "Shop license is required";
    }
    
    if (!profile.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(profile.experience)) {
      newErrors.experience = "Experience must be a number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getLocation = () => {
    setLocationLoading(true);
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status !== 'granted') {
          Alert.alert("Permission denied", "Location permission is required to auto-detect your location");
          return;
        }
        
        return Location.getCurrentPositionAsync({});
      })
      .then(location => {
        if (location) {
          return Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
        }
      })
      .then(address => {
        if (address && address.length > 0) {
          const loc = `${address[0].name}, ${address[0].city}, ${address[0].region}, ${address[0].postalCode}`;
          setProfile(prev => ({ ...prev, location: loc }));
          setErrors(prev => ({ ...prev, location: undefined }));
        }
      })
      .catch(error => {
        console.error("Error getting location:", error);
      })
      .finally(() => {
        setLocationLoading(false);
      });
  };

  const handleInputChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    // Clear error when user types
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  const handleAadhaarChange = (partNumber, value) => {
    const numValue = value.replace(/[^0-9]/g, '').slice(0, 4);
    setProfile(prev => ({ ...prev, [`aadhaarPart${partNumber}`]: numValue }));
    // Clear aadhaar error when user types
    if (errors.aadhaar) {
      setErrors(prev => ({ ...prev, aadhaar: undefined }));
    }
  };

  const pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    }).then(result => {
      if (!result.canceled) {
        setProfile(prev => ({ ...prev, image: result.assets[0].uri }));
      }
    });
  };

  const handleApplyChanges = () => {

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    
    // Here you would typically send the data to your backend
    const aadhaarNumber = profile.aadhaarPart1 + profile.aadhaarPart2 + profile.aadhaarPart3 + profile.aadhaarPart4;
    const completeProfile = {
      ...profile,
      aadhaarNumber: aadhaarNumber,
      phone: profile.phone.replace(/\D/g, ''), // Clean phone number
    };
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Success", "Profile saved successfully");
      navigation.navigate("MechanicHome", { 
        profile: completeProfile,
        userData: route.params?.userData || null 
      });
    }, 1500);
  };
  
  return (
    <ScrollView 
      style={styles.container} 
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.profileHeader}>
        <Image 
          source={profile.image ? { uri: profile.image } : defaultProfileImage}
          style={styles.profileImage}
          onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
        />
        <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Change Image</Text>
        </TouchableOpacity>
      </View>

      {/* Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          value={profile.name}
          onChangeText={(text) => handleInputChange("name", text)}
          placeholder="Enter your name"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      {/* Phone */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.errorInput]}
          value={profile.phone}
          onChangeText={(text) => handleInputChange("phone", text)}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          value={profile.email}
          onChangeText={(text) => handleInputChange("email", text)}
          keyboardType="email-address"
          placeholder="Enter your email"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Location */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={[styles.input, errors.location && styles.errorInput]}
          value={profile.location}
          onChangeText={(text) => handleInputChange("location", text)}
          placeholder="Your location"
        />
        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={getLocation}
          disabled={locationLoading}
        >
          <Text style={styles.buttonText}>
            {locationLoading ? "Detecting..." : "Auto Detect Location"}
          </Text>
        </TouchableOpacity>
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
      </View>

      {/* Shop Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Shop Name:</Text>
        <TextInput
          style={[styles.input, errors.shopName && styles.errorInput]}
          value={profile.shopName}
          onChangeText={(text) => handleInputChange("shopName", text)}
          placeholder="Enter your shop name"
        />
        {errors.shopName && <Text style={styles.errorText}>{errors.shopName}</Text>}
      </View>

      {/* Aadhaar Number */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Aadhaar Number:</Text>
        <View style={styles.aadhaarContainer}>
          <TextInput
            style={[styles.input, styles.aadhaarInput, errors.aadhaar && styles.errorInput]}
            value={profile.aadhaarPart1}
            onChangeText={(text) => handleAadhaarChange(1, text)}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="XXXX"
          />
          <TextInput
            style={[styles.input, styles.aadhaarInput, errors.aadhaar && styles.errorInput]}
            value={profile.aadhaarPart2}
            onChangeText={(text) => handleAadhaarChange(2, text)}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="XXXX"
          />
          <TextInput
            style={[styles.input, styles.aadhaarInput, errors.aadhaar && styles.errorInput]}
            value={profile.aadhaarPart3}
            onChangeText={(text) => handleAadhaarChange(3, text)}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="XXXX"
          />
          <TextInput
            style={[styles.input, styles.aadhaarInput, errors.aadhaar && styles.errorInput]}
            value={profile.aadhaarPart4}
            onChangeText={(text) => handleAadhaarChange(4, text)}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="XXXX"
          />
        </View>
        {errors.aadhaar && <Text style={styles.errorText}>{errors.aadhaar}</Text>}
      </View>

      {/* Shop License */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Shop License:</Text>
        <TextInput
          style={[styles.input, errors.shopLicense && styles.errorInput]}
          value={profile.shopLicense}
          onChangeText={(text) => handleInputChange("shopLicense", text)}
          keyboardType="number-pad"
          placeholder="Enter Shop License"
        />
        {errors.shopLicense && <Text style={styles.errorText}>{errors.shopLicense}</Text>}
      </View>

      {/* Experience */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Experience (in years):</Text>
        <TextInput
          style={[styles.input, errors.experience && styles.errorInput]}
          value={profile.experience}
          onChangeText={(text) => handleInputChange("experience", text)}
          placeholder="Enter your experience"
          keyboardType="numeric"
        />
        {errors.experience && <Text style={styles.errorText}>{errors.experience}</Text>}
      </View>

      <TouchableOpacity 
        style={[styles.applyButton, isSubmitting && styles.disabledButton]} 
        onPress={handleApplyChanges}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Saving..." : "Apply Changes"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 20,
  },
  profileHeader: { 
    alignItems: "center", 
    marginBottom: 20 
  },
  profileImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    marginBottom: 10, 
    borderWidth: 2, 
    borderColor: "#007bff" 
  },
  changeImageButton: { 
    backgroundColor: "#007bff", 
    padding: 10, 
    borderRadius: 8 
  },
  buttonText: { 
    color: "white", 
    fontWeight: "bold",
    textAlign: 'center',
  },
  inputContainer: { 
    marginBottom: 15 
  },
  label: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#333",
    marginBottom: 5
  },
  input: { 
    backgroundColor: "white", 
    padding: 12, 
    borderRadius: 8, 
    borderColor: "#ccc", 
    borderWidth: 1,
    fontSize: 16
  },
  aadhaarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  aadhaarInput: {
    width: '22%',
    textAlign: 'center'
  },
  locationButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  },
  applyButton: { 
    backgroundColor: "green", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 20,
    marginBottom: 30
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5
  }
});

export default MechanicProfile;