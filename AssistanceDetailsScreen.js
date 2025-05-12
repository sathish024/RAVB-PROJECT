import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome, Ionicons, Feather } from '@expo/vector-icons';

export default function AssistanceDetailsScreen({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  
  // Helper function for random data generation
  const getRandomValue = (type) => {
    switch (type) {
      case "phone":
        return `+91 ${Math.floor(9000000000 + Math.random() * 99999999)}`;
      case "experience":
        return Math.floor(Math.random() * 15) + 1;
      case "serviceCost":
        return Math.floor(Math.random() * 500) + 200; 
      case "travelCost":
        return Math.floor(Math.random() * 300) + 100;
      case "platformFee":
        return Math.floor(Math.random() * 100) + 50;
      case "location":
        return "Pondicherry";
      default:
        return "Not Available";
    }
  };

  // Data processing
  const phone = item.phone || getRandomValue("phone");
  const experience = item.experience || getRandomValue("experience");
  const serviceCost = item.serviceCost || getRandomValue("serviceCost");
  const travelCost = item.travelCost || getRandomValue("travelCost");
  const platformFee = item.platformFee || getRandomValue("platformFee");
  const address = item.address || getRandomValue("location");
  const totalCost = serviceCost + travelCost + platformFee;
  const lat = item.lat;
  const lon = item.lon;

  // Mock API call
  fetch("https://your-backend-api.com/store-location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: item.name, lat, lon }),
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mechanic Details</Text>
          <View style={{ width: 24 }} /> {/* Spacer for alignment */}
        </View>

        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image 
              source={item.image || require("./roadside/profile.jpg")} 
              style={styles.avatar} 
            />
            <View style={[styles.statusDot, styles.availableDot]} />
          </View>
          
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.profession}>Automotive Technician</Text>
          
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({Math.floor(Math.random() * 100) + 10} reviews)</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={18} color="#e74c3c" />
            <Text style={styles.locationText}>{address}</Text>
          </View>
        </View>

        {/* Details Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.detailRow}>
            <Feather name="phone" size={18} color="#3498db" />
            <Text style={styles.detailText}>{phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="work" size={18} color="#3498db" />
            <Text style={styles.detailText}>{experience} years experience</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="directions-car" size={18} color="#3498db" />
            <Text style={styles.detailText}>{parseFloat(item.distance).toFixed(1)} km away</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="access-time" size={18} color="#3498db" />
            <Text style={styles.detailText}>ETA: {parseFloat(item.time).toFixed(1)} minutes</Text>
          </View>
        </View>

        {/* Pricing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>₹{serviceCost}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Travel Fee</Text>
            <Text style={styles.priceValue}>₹{travelCost}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Platform Fee</Text>
            <Text style={styles.priceValue}>₹{platformFee}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Estimated</Text>
            <Text style={styles.totalValue}>₹{totalCost}</Text>
          </View>
        </View>
        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Offered</Text>
          <View style={styles.servicesContainer}>
            {['Tire Change', 'Battery Jump', 'Oil Change', 'Lockout Service', 'Fuel Delivery'].map((service, index) => (
              <View key={index} style={styles.servicePill}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* Fixed Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("TimeoutScreen", {
              name: item.name,
              location: address,
              estimatedFee: `₹${totalCost}`,
            })
          }
        >
          <Text style={styles.buttonText}>Request Assistance</Text>
          <Text style={styles.buttonSubtext}>Available now • Response in 2 mins</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
    marginTop:30, 
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#eaeaea',
  },
  statusDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
  },
  availableDot: {
    backgroundColor: '#2ecc71',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
    textAlign: 'center',
  },
  profession: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 4,
    marginRight: 6,
  },
  reviewsText: {
    fontSize: 12,
    color: '#95a5a6',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
  },
  locationText: {
    fontSize: 13,
    color: '#7f8c8d',
    marginLeft: 4,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 10,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#27ae60',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  servicePill: {
    backgroundColor: '#e8f4fc',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  serviceText: {
    fontSize: 12,
    color: '#2980b9',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    elevation: 4,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginTop: 2,
  },
});