import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MechanicDetailsScreen({ route }) {
  const { mechanic } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mechanic.name}</Text>
      <Text style={styles.detail}>📍 Address: {mechanic.address}</Text>
      <Text style={styles.detail}>
        🌍 Location: {mechanic.latitude}, {mechanic.longitude}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  detail: { fontSize: 16, color: "#555", marginBottom: 5 },
});
