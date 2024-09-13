import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Cheltuiala } from "../types";
import { useSQLiteContext } from "expo-sqlite";
import { RootStackParamList } from "../App"; // Import the param list type

// Define the type for route prop for ClientProfile
type ClientProfileRouteProp = RouteProp<RootStackParamList, "ClientProfile">;

export default function ClientProfile({
  route,
}: {
  route: ClientProfileRouteProp;
}) {
  const [cheltuieli, setCheltuieli] = useState<Cheltuiala[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const db = useSQLiteContext();
  const clientId = route.params.id; // Now properly typed

  // Fetch all client expenses based on client ID
  async function getAllClientExpenses() {
    try {
      const results = await db.getAllAsync<Cheltuiala>(
        `SELECT * FROM cheltuieli WHERE client_id = ?;`,
        [clientId]
      );
      setCheltuieli(results);
    } catch (error) {
      console.error("Error fetching expenses", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllClientExpenses();
  }, [clientId]);

  return (
    <View>
      <Text>Client ID: {clientId}</Text>
      {isLoading ? (
        <Text>Loading expenses...</Text>
      ) : (
        <View>
          <Text>Client Expenses:</Text>
          {cheltuieli.length > 0 ? (
            cheltuieli.map((expense) => (
              <Text key={expense.id}>
                {expense.description} - {expense.price}
              </Text>
            ))
          ) : (
            <Text>No expenses found</Text>
          )}
        </View>
      )}
    </View>
  );
}
