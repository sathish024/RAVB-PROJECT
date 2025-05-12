import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const DashboardCard = ({ title, value, icon }) => (
  <View style={styles.card}>
    <MaterialIcons name={icon} size={40} color="white" />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const AdminDashboard = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [500, 1200, 800, 1600, 900, 1500],
      },
    ],
  };

  const pieData = [
    { name: "Completed", population: 1200, color: "#2ecc71", legendFontColor: "#333", legendFontSize: 12 },
    { name: "Pending", population: 45, color: "#f39c12", legendFontColor: "#333", legendFontSize: 12 },
    { name: "Cancelled", population: 15, color: "#e74c3c", legendFontColor: "#333", legendFontSize: 12 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>
      <View style={styles.row}>
        <DashboardCard title="Total Requests" value="1,245" icon="assignment" />
        <DashboardCard title="Revenue" value="$23,450" icon="attach-money" />
      </View>
      <Text style={styles.chartTitle}>Requests Over Time</Text>
      <BarChart
        data={barData}
        width={screenWidth - 30}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: () => "#333",
        }}
        style={styles.chart}
      />
      <Text style={styles.chartTitle}>Request Status Distribution</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 30}
        height={220}
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: () => "#333",
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  cardValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default AdminDashboard;
