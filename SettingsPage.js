import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
const ProfileScreen = ({ route }) => {
  const { profile = {} } = route.params || {}; 
  const {
    name = "Sathish Kumar",  
    phone = "+91 6381338346",
    email = "sathiskjaya24@gmail.com",
    location = "Puducherry", 
    experience = "5",
    rating = 4.5
  } = profile;
  const [userPhone, setUserPhone] = useState(phone);
  const [userEmail, setUserEmail] = useState(email);
  const [userLocation, setUserLocation] = useState(location);
  const [profileImage, setProfileImage] = useState(require("./roadside/profilepic.jpg"));
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const reviews = [
    { id: "1", reviewer: "Arun Kumar", review: "Excellent service!", rating: 5, date: "2 days ago" },
    { id: "2", reviewer: "Priya Sharma", review: "Quick response", rating: 4, date: "1 week ago" },
    { id: "3", reviewer: "Rahul Verma", review: "Affordable pricing", rating: 4, date: "2 weeks ago" },
  ];
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setProfileImage({ uri: result.uri });
  };
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Ionicons
        key={i}
        name={i < Math.floor(rating) ? "star" : "star-outline"}
        size={16}
        color="#FFD700"
      />
    ));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {/* Profile Card */}
            <View style={styles.card}>
              <LinearGradient colors={["#6C63FF", "#8E85FF"]} style={styles.profileHeader}>
                <TouchableOpacity onPress={pickImage}>
                  <Image source={profileImage} style={styles.profileImage} />
                </TouchableOpacity>
                <Text style={styles.name}>{name}</Text>
              </LinearGradient>

              <View style={styles.details}>
                {[
                  { icon: "location", value: userLocation, setter: setUserLocation },
                  { icon: "call", value: userPhone, setter: setUserPhone, editable: isEditingPhone },
                  { icon: "mail", value: userEmail, setter: setUserEmail, editable: isEditingEmail },
                  { icon: "briefcase", text: `${experience} years experience` },
                  { icon: "star", stars: rating },
                ].map((item, index) => (
                  <View key={index} style={styles.detailRow}>
                    <Ionicons name={item.icon} size={16} color="#6C63FF" />
                    {item.text ? (
                      <Text style={styles.text}>{item.text}</Text>
                    ) : item.stars ? (
                      <View style={styles.starContainer}>{renderStars(item.stars)}</View>
                    ) : (
                      <TextInput
                        style={styles.input}
                        value={item.value}
                        onChangeText={item.setter}
                        editable={item.editable}
                        placeholderTextColor="#999"
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
            {/* Statistics */}
            <View style={styles.statsCard}>
              <Text style={styles.cardTitle}>Performance</Text>
              <View style={styles.statsGrid}>
                {[
                  { icon: "car-sport", value: "127", label: "Services", color: "#6C63FF" },
                  { icon: "thumbs-up", value: "94%", label: "Success", color: "#4CAF50" },
                  { icon: "wallet", value: "₹42K", label: "Earnings", color: "#FF9800" },
                  { icon: "time", value: "24m", label: "Avg. Time", color: "#9C27B0" },
                ].map((stat, i) => (
                  <View key={i} style={[styles.statBox, { backgroundColor: `${stat.color}10` }]}>
                    <Ionicons name={stat.icon} size={20} color={stat.color} />
                    <Text style={styles.statNumber}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Ionicons name="person-circle-outline" size={30} color="#6C63FF" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.reviewerName}>{item.reviewer}</Text>
                <View style={styles.starContainer}>{renderStars(item.rating)}</View>
                <Text style={styles.reviewText}>{item.review}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  card: { borderRadius: 12, overflow: "hidden", marginBottom: 12,marginTop:20 },
  profileHeader: { padding: 16, alignItems: "center" },
  profileImage: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: "#FFF" },
  name: { fontSize: 18, fontWeight: "700", color: "#FFF", marginTop: 8 },
  details: { padding: 16, backgroundColor: "#FFF" },
  detailRow: { flexDirection: "row", alignItems: "center",  height: 35, marginBottom: 4},
  input: { flex: 1, marginLeft: 10, fontSize: 14, color: "#333" },
  text: { marginLeft: 10, fontSize: 14, color: "#555" },
  starContainer: { flexDirection: "row", marginLeft: 10 },
  statsCard: { padding: 16, backgroundColor: "#FFF", borderRadius: 12, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  statBox: { width: "48%", padding: 12, borderRadius: 8, marginBottom: 12 },
  statNumber: { fontSize: 18, fontWeight: "700", marginVertical: 4 },
  statLabel: { fontSize: 12, color: "#666" },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginVertical: 8 },
  reviewCard: { padding: 12, backgroundColor: "#FFF", borderRadius: 8, marginBottom: 8 },
  reviewHeader: { flexDirection: "row" },
  reviewerName: { fontWeight: "600", fontSize: 14 },
  reviewText: { fontSize: 13, color: "#555", marginTop: 4 },
});

export default ProfileScreen;