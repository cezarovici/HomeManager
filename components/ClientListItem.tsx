import { Text } from "react-native";
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
      <Text>{client.name} </Text>
    </Card>
  );
}
