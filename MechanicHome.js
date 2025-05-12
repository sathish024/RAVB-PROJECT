import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const MechanicHome = ({ navigation, route }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [requests, setRequests] = useState([]);
  const { profile} = route.params || {};
  useEffect(() => {
    if (route.params?.activated) {
      setIsActivated(true);
      loadUserRequest();
    } else {
      setIsActivated(false);
      setRequests([]);
    }
  }, [route.params?.activated]);
  const loadUserRequest = () => {
    const userRequests = [
      {
        id: "1",
        name: "Raja",
        location: "Kombakkam",
        phone: "+91 6381338346",
        distance: "3 km",
        timeTaken: "15 min",
        vehicleType: "Sedan",
        vehicleModel: "Toyota Corolla",
        serviceType: "Engine Repair",
        requiredTools: ["Wrench", "Oil Filter", "Screwdriver"],
        paymentType: "Cash",
      },
      {
        id: "2",
        name: "Dharsan",
        location: "Ariyankuppam",
        phone: "+91 6381338346",
        distance: "5 km",
        timeTaken: "20 min",
        vehicleType: "SUV",
        vehicleModel: "Honda CR-V",
        serviceType: "Tire Change",
        requiredTools: ["Jack", "Lug Wrench"],
        paymentType: "Card",
      },
    ];
    setRequests(userRequests);
  };

  const handleAccept = (selectedRequest) => {
    navigation.navigate("RequestDetails", { request: selectedRequest }); // Changed param name
  };

  const handleReject = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsPage",{profile})}>
          <Ionicons name="person-circle-outline" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")}>
            <Ionicons name="time-outline" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ActivationPage")}>
            <Ionicons name="flash-outline" size={26} color={isActivated ? "#32CD32" : "white"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
            <Ionicons name="notifications" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      {!isActivated ? (
        <View style={styles.activationPrompt}>
          <Text style={styles.activationText}>Activate to get started.</Text>
          <TouchableOpacity
            style={styles.activateButton}
            onPress={() => navigation.navigate("ActivationPage")}
          >
            <Text style={styles.buttonText}>Activate Now</Text>
          </TouchableOpacity>
        </View>
      ) : requests.length === 0 ? (
        <Text style={styles.noRequestText}>No service requests available.</Text>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.requestCard}>
              <View style={styles.cardContent}>
                <Ionicons name="person-circle" size={50} color="#007bff" style={styles.userIcon} />
                <View style={styles.requestDetails}>
                  <Text style={styles.requestText}>Name: {item.name}</Text>
                  <Text style={styles.requestText}>Location: {item.location}</Text>
                  <Text style={styles.requestText}>Service: {item.serviceType}</Text>
                  <Text style={styles.requestText}>Distance: {item.distance}</Text>
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleAccept(item)}>
                  <Ionicons name="checkmark-circle" size={34} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleReject(item.id)}>
                  <Ionicons name="close-circle" size={34} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // same styles as before
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopEndRadius : 50,
    borderTopLeftRadius : 50,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
  activationPrompt: {
    backgroundColor: "#eaf4fc",
    padding: 20,
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  activationText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  activateButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  requestCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    marginRight: 15,
  },
  requestDetails: {
    flex: 1,
  },
  requestText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  noRequestText: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    marginTop: 50,
  },
});

export default MechanicHome;
