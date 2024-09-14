import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Cheltuiala } from "../types";
import ExpenseItem from "./ExpenseItem";

const ExpenseCard: React.FC<{ month: number; expenses: Cheltuiala[] }> = ({
  month,
  expenses,
}) => {
  return (
    <View style={styles.expensesContainer}>
      <Text style={styles.expensesHeader}>
        Cheltuieli pentru{" "}
        {new Date(2024, month - 1).toLocaleString("default", { month: "long" })}
      </Text>
      {expenses.length > 0 ? (
        <FlatList
          data={expenses}
          renderItem={({ item }) => <ExpenseItem expense={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noExpenses}>No expenses found for this month</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  expensesContainer: {
    marginTop: 16,
  },
  expensesHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  noExpenses: {
    fontSize: 16,
    color: "#777",
    fontStyle: "italic",
  },
});

export default ExpenseCard;
