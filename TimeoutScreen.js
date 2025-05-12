import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const TimeoutScreen = ({ route }) => {
  const navigation = useNavigation();
  const { name = 'Unknown', location = 'Unknown', estimatedFee = "0" } = route.params || {}; 
  const [seconds, setSeconds] = useState(30);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 28) {
          clearInterval(timer);
          setAccepted(true);
          return 5; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RAVB</Text>
      
      <View style={styles.circle}>
        {accepted ? (
          <AntDesign name="checkcircle" size={50} color="green" />
        ) : (
          <Text style={styles.timer}>{seconds} sec</Text>
        )}
      </View>
      
      {accepted && (
        <Text style={styles.acceptedText}>Mechanic Accepted</Text>
      )}
      
      <View style={styles.infoBox}>
        <Image source={require('./roadside/profile.jpg')} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.infoText} numberOfLines={1}>Name: {name}</Text>
          <Text style={styles.infoText} numberOfLines={2}>Location: {location}</Text>
          <Text style={styles.infoText}>💵 Estimated Cost: {estimatedFee}</Text>
        </View>
      </View>

      {accepted && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("PaymentScreen", { estimatedFee, name, location })}
        >
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TimeoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  acceptedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Changed to flex-start for better alignment
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    borderColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    flexShrink: 1, // Allows text to shrink if needed
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});