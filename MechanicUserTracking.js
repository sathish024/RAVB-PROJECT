import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const MechanicStreetPath = ({route}) => {
  const {name,location} = route.params;
  console.log(name);
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const mechanicLocation = { latitude: 11.9139, longitude: 79.7855 };
  const [userDetails, setUserDetails] = useState({
    name: name,
    location: location,
    distance: "3.5 km",
    timeTaken: "12 mins",
    phone: "6381338346",
  });
  useEffect(() => {
    getUserLocation();
  }, []);
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Enable location to track the path.");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const userCoords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setUserLocation(userCoords);
    fetchStreetRoute(userCoords, mechanicLocation);
  };
  const fetchStreetRoute = async (start, end) => {
    const routeUrl = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=polyline`;
    try {
      let response = await fetch(routeUrl);
      let data = await response.json();
      if (data.routes.length > 0) {
        let decodedPolyline = decodePolyline(data.routes[0].geometry);
        setRouteCoords(decodedPolyline);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;
    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;
      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };
  const handleCallUser = () => {
    Linking.openURL(`tel:${userDetails.phone}`);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : mechanicLocation.latitude,
          longitude: userLocation ? userLocation.longitude : mechanicLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {userLocation && <Marker coordinate={userLocation} title="You" pinColor="blue" />}
        <Marker coordinate={mechanicLocation} title="Mechanic" pinColor="red" />
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />}
      </MapView>
      {/* User Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.serviceTitle}>{userDetails.name}'s Location</Text>
        <Text style={styles.detailText}>📍 {userDetails.location}</Text>
        <Text style={styles.detailText}>📏 {userDetails.distance} away</Text>
        <Text style={styles.detailText}>⏳ {userDetails.timeTaken} to reach</Text>
        {/* Call & Chat Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.callButton} onPress={handleCallUser}>
            <Ionicons name="call" size={20} color="white" />
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate("ChatScreen",{name})}>
            <Ionicons name="chatbubble" size={20} color="white"/>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>
        {/* Service Over Button */}
        <TouchableOpacity style={styles.serviceOverButton} onPress={() => navigation.navigate("ServiceOverScreen")}  >
          <Text style={styles.serviceOverText}>Service Over</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  callButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  chatButton: {
    flexDirection: "row",
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  serviceOverButton: {
    marginTop: 10,
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  serviceOverText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default MechanicStreetPath;
