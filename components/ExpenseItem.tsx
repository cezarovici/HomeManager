import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Cheltuiala } from "../types";

const ExpenseItem: React.FC<{ expense: Cheltuiala }> = ({ expense }) => (
  <View style={styles.expenseItem}>
    <Text style={styles.expenseDescription}>{expense.description}</Text>
    <Text style={styles.expensePrice}>{expense.price} RON</Text>
  </View>
);

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  expenseDescription: {
    fontSize: 16,
    color: "#333",
  },
  expensePrice: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default ExpenseItem;
