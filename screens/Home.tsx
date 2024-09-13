import { View, Text, ScrollView } from "react-native";
import { Cheltuiala, Client } from "../types";
import React, { useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import ClientList from "../components/Clients";

export default function Home({}) {
  const [clienti, setClienti] = React.useState<Client[]>([]);
  const [cheltuieli, setCheltuieli] = React.useState<Cheltuiala[]>([]);

  const db = useSQLiteContext();

  async function getClienti() {
    const result = await db.getAllAsync<Client>("SELECT * FROM clienti;");
    setClienti(result);
  }

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getClienti();
    });
  }, [db]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 15,
        paddingVertical: 170,
      }}
    >
      <ClientList clients={clienti}></ClientList>
    </ScrollView>
  );
}
