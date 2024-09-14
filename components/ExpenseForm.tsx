import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { Cheltuiala } from "../types";

interface ExpenseFormProps {
  clientId: number;
  month: number;
  year: number;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ clientId, month, year }) => {
  const db = useSQLiteContext();

  // Fetch index for a specific expense type
  async function getIndex() {
    try {
      const cheltuieliLunareClinet = await db.getAllAsync<Cheltuiala[]>(
        `SELECT * FROM cheltuieli WHERE client_id = ?  AND month = ? AND year = ?`,
        [clientId, month, year]
      );

      console.log(cheltuieliLunareClinet);
    } catch (error) {
      console.error(`Error fetching index data for`, error);
    }
  }

  React.useEffect(() => {
    db.withTransactionAsync(getIndex);
  }, [db]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Prețul pe curent:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: "bold",
  },
});

export default ExpenseForm;
