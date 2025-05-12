import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Linking ,ActivityIndicator} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
const mechanic = {
  rating: "4.7 ⭐",
  estimatedTime: "12 mins",
  distance: "3.5 km",
  latitude: 11.9338,
  longitude: 79.8298,
  phone: "6381338346",
};
const LiveMechanicTracking = ({route}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const navigation = useNavigation();
  const { name,location } = route.params || {}; 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Enable location to track the mechanic.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(userCoords);
      const routeUrl = `https://router.project-osrm.org/route/v1/driving/${userCoords.longitude},${userCoords.latitude};${mechanic.longitude},${mechanic.latitude}?overview=full&geometries=polyline`;
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
    })();
  }, []);
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;
    while (index < len) {
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
      shift = result = 0;
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
  const handleCallMechanic = () => {
    Linking.openURL(`tel:${mechanic.phone}`);
  };
  return (
    <View style={styles.container}>
      {userLocation ? (
        <>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker coordinate={{ latitude: mechanic.latitude, longitude: mechanic.longitude }} title="Mechanic" pinColor="red" />
            <Marker coordinate={userLocation} title="Your Location" pinColor="blue" />
            {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />}
          </MapView>
          <View style={styles.infoBox}>
            <Text style={styles.mechanicName}>{name}</Text>
            <Text style={styles.infoText}>📍 {location}</Text>
            <Text style={styles.infoText}>⭐ {mechanic.rating} </Text>
            <Text style={styles.infoText}>📏 {mechanic.distance} away</Text>
            <Text style={styles.infoText}>⏳ {mechanic.estimatedTime} to reach</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.callButton} onPress={handleCallMechanic}>
                <Text style={styles.callButtonText}>📞 Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate("ChatScreen",{name})}>
                <Text style={styles.chatButtonText}>💬 Chat</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.serviceOverButton} onPress={() => navigation.navigate("ServiceOverScreenM",{name,location})} >
              <Text style={styles.serviceOverText}>Service Over</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
      )}
    </View>
  );
};
export default LiveMechanicTracking;
const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingText: { textAlign: "center", marginTop: 50, fontSize: 18 },
  infoBox: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  mechanicName: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  infoText: { fontSize: 14, color: "#333", marginBottom: 3 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  callButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, flex: 1, marginRight: 5, alignItems: "center" },
  callButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  chatButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5, flex: 1, marginLeft: 5, alignItems: "center" },
  chatButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  serviceOverButton: { backgroundColor: "#dc3545", padding: 12, borderRadius: 5, marginTop: 10, alignItems: "center" },
  serviceOverText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
