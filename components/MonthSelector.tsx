import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const MonthSelector: React.FC<{
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
}> = ({ selectedMonth, onSelectMonth }) => {
  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  return (
    <View style={styles.selectorContainer}>
      {months.map((month) => (
        <Button
          key={month.id}
          title={month.name}
          onPress={() => onSelectMonth(month.id)}
          color={selectedMonth === month.id ? "#0000ff" : "#cccccc"}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
});

export default MonthSelector;
