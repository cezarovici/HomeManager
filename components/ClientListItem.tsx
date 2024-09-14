import { Text, StyleSheet } from "react-native";
import { Client } from "../types";
import Card from "./UI/Card";

import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { categoryEmojies, categoryColors } from "../constants";

interface ClientListItemProps {
  client: Client;
}

export default function ClientListItem({ client }: ClientListItemProps) {
  return (
    <Card>
      <Text style={styles.clientName}>{client.name}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  clientName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333", // Dark gray color for text
    textAlign: "center", // Centered text
    letterSpacing: 1, // Adds a bit of spacing between letters
    textShadowColor: "rgba(0, 0, 0, 0.3)", // Soft text shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
