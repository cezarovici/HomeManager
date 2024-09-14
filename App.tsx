import * as React from "react";
import { SQLiteProvider } from "expo-sqlite/next";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import ClientProfile from "./components/ClientProfile";

// Define the type for navigation params
export type RootStackParamList = {
  Home: undefined; // No params expected for Home screen
  ClientProfile: { id: number }; // ClientProfile expects an 'id' param
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const loadDatabase = async () => {
  const dbName = "database.db";
  const dbAsset = require("./storage/database.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function HomeScreen() {
  const [dbLoaded, setDbLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  });

  if (!dbLoaded)
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
        <Text>Loading Database...</Text>
      </View>
    );

  return (
    <NavigationContainer>
      <React.Suspense>
        <SQLiteProvider databaseName="database.db" useSuspense>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: "Mișu Dashboard",
                headerLargeTitle: true,
              }}
            />

            <Stack.Screen name="ClientProfile" component={ClientProfile} />
          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>
  );
}
