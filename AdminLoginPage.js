import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

const AdminLogin = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "Admin" && password === "123") {
      Alert.alert("Login Successful", "Welcome, Admin!", [
        { text: "OK", onPress: () => navigation.navigate("AdminDashboard") },
      ]);
    } else {
      Alert.alert("Invalid Credentials", "Please check your username or password.");
    }
  };

  return (
    <View style={styles.container}>
        <Image source={require("./roadside/admin.jpg")} style={styles.image} />

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10, // Cube shape
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    color: "#333",
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 8,
  },
});

export default AdminLogin;
