import * as React from "react";
import { Client } from "../types";
import { TouchableOpacity, View } from "react-native";
import ClientListItem from "./ClientListItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App"; // Import the param list type

// Define the type for navigation prop for ClientList
type ClientListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function ClientList({ clients }: { clients: Client[] }) {
  const navigation = useNavigation<ClientListNavigationProp>(); // Use typed navigation

  const onPress = (client_id: number) => {
    // Now TypeScript knows what params are expected
    navigation.navigate("ClientProfile", { id: client_id });
  };

  return (
    <View>
      {clients.map((client) => (
        <TouchableOpacity
          key={client.id}
          activeOpacity={0.7}
          onPress={() => onPress(client.id)}
        >
          <ClientListItem client={client} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
