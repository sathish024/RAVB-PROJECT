import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
const RatingReviewScreen = ({ initialRating = 0,route }) => {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState("");
  const navigation = useNavigation();
  const { name ,location } = route.params || {}; 

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Review:", review);

    navigation.navigate("UserHome");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Leave Feedback</Text>
        </View>

        <View style={styles.profileCard}>
          <Image 
            source={require("./roadside/profile.jpg")} 
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.label}>Rate your experience</Text>
          <AirbnbRating
            count={5}
            defaultRating={initialRating}
            size={28}
            showRating={false}
            selectedColor="#FFD700"
            onFinishRating={(value) => setRating(value)}
            starContainerStyle={styles.starContainer}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Write your review</Text>
          <TextInput
            style={styles.input}
            placeholder="What was your experience like?"
            placeholderTextColor="#888"
            multiline
            numberOfLines={5}
            value={review}
            onChangeText={setReview}
          />
          <Text style={styles.charCount}>{review.length}/300</Text>
        </View>

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitText}>Submit Review</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    backgroundColor: "white",
    top:10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    margin: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 3,
  },
  location: {
    fontSize: 14,
    color: "#777",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginBottom: 15,
  },
  starContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 15,
    color: "#333",
    textAlignVertical: "top",
    minHeight: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    marginBottom: 5,
  },
  charCount: {
    fontSize: 12,
    color: "#AAA",
    textAlign: "right",
  },
  submitButton: {
    backgroundColor: "#4285F4",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#4285F4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default RatingReviewScreen;