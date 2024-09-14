import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { RootStackParamList } from "../App";
import MonthSelector from "./MonthSelector";
import ExpenseCard from "./ExpenseCard";
import { Cheltuiala } from "../types";
import ExpenseForm from "./ExpenseForm";

type ClientProfileRouteProp = RouteProp<RootStackParamList, "ClientProfile">;

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

export default function ClientProfile({
  route,
}: {
  route: ClientProfileRouteProp;
}) {
  const [cheltuieli, setCheltuieli] = useState<Cheltuiala[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [clientName, setClientName] = useState<string | undefined>();

  const db = useSQLiteContext();
  const clientId = route.params.id;

  async function getClientData() {
    try {
      // Fetch client name
      const nameResult = await db.getFirstAsync<{ name: string }>(
        `SELECT name from clienti WHERE id = ?`,
        [clientId]
      );
      setClientName(nameResult?.name);

      // Fetch all client expenses
      const results = await db.getAllAsync<Cheltuiala>(
        `SELECT * FROM cheltuieli WHERE client_id = ?;`,
        [clientId]
      );
      setCheltuieli(results);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    db.withTransactionAsync(getClientData);
  }, [db]);

  // Filter expenses based on the selected month
  const filteredExpenses = cheltuieli.filter(
    (expense) => expense.month === selectedMonth
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <MonthSelector
            selectedMonth={selectedMonth}
            onSelectMonth={setSelectedMonth}
          />
          <ExpenseCard month={selectedMonth} expenses={filteredExpenses} />

          <ScrollView
            contentContainerStyle={{
              padding: 15,
              paddingVertical: 170,
            }}
          >
            <ExpenseForm
              clientId={clientId}
              month={selectedMonth}
              year={2024}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
});
