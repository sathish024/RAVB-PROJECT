import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Animated } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const UserHome = ({route}) => {
  const { formData } = route.params || {}; 
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const scaleAnim = useState(new Animated.Value(1))[0];
  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Enable location services in settings.");
        setLoading(false);
        return;
      }
      try {
        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(currentLocation.coords);
      } catch (error) {
        setLocation({ latitude: 12.9716, longitude: 77.5946 });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 800, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Fetching location...</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      )}
      {/* Header with Profile, Notification, and History */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen",{formData})}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appTitle}>RAVB</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")}>
            <FontAwesome5 name="history" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate("NotificationScreen")}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={[styles.assistanceButtonContainer, { transform: [{ scale: scaleAnim }] }]}> 
        <TouchableOpacity style={styles.assistanceButton} onPress={() => navigation.navigate("AssistanceScreen")}> 
          <LinearGradient colors={["#007bff", "#0056b3"]} style={styles.assistanceGradient}>
            <Ionicons name="help-circle-outline" size={28} color="#fff" />
            <Text style={styles.assistanceText}>Get Assistance</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default UserHome;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  map: { ...StyleSheet.absoluteFillObject, borderRadius: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#007bff", fontWeight: "600" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 15,
    right: 15,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  appTitle: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  headerIcons: { flexDirection: "row", gap: 12 },
  notificationIcon: { marginLeft: 10 },
  assistanceButtonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  assistanceButton: {
    borderRadius: 30,
    overflow: "hidden",
    elevation: 6,
  },
  assistanceGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    gap: 10,
  },
  assistanceText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
