import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

function HomeScreen({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      paddingVertical: 16,
      alignItems: "center",
      marginHorizontal: 40,
    },
    item: {
      padding: 16,
      marginBottom: 8,
      borderRadius: 8,
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text
          style={{
            fontFamily: "Play-Bold",
            color: "#050505",
            textAlign: "center",
            fontSize: 44,
          }}
        >
          LUPUS IN TABULA
        </Text>
      </View>

      <View style={styles.item}>
        <Text
          style={{
            fontFamily: "Play-Regular",
            textAlign: "center",
            color: "#050505",
            textAlign: "center",
            fontSize: 25,
            flexDirection: "column",
            justifyContent: "center",
            alignSelf: "stretch",
          }}
        >
          Fare il master non è mai stato così facile.
        </Text>
      </View>

      <View style={styles.item}>
        <TouchableOpacity
          style={{
            marginBottom: 50,
            paddingVertical: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#3E4347",
            paddingHorizontal: 10,
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text
            style={{
              color: "#FFFFFF",
              width: 279,
              textAlign: "center",
              fontFamily: "Play-Regular",
              textAlign: "center",
              fontSize: 25,
            }}
          >
            INCOMINCIAMO!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate("Notifications")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "Play-Regular": require("./assets/fonts/Play-Regular.ttf"),
    "Play-Bold": require("./assets/fonts/Play-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  });

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
