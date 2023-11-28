import React, { useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

const commonStyles = {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#E3E3E3",
    padding: 60,
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: 300,
  },
  item: {
    borderRadius: 8,
    alignItems: "center",
  },
};

const textStyles = {
  title: {
    color: "#050505",
    textAlign: "center",
    fontFamily: "Play-Bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#050505",
    textAlign: "center",
    fontFamily: "Play-Regular",
    textAlign: "center",
  },
  button: {
    color: "#050505",
    textAlign: "center",
    fontFamily: "Play-Bold",
    textAlign: "center",
  },
};

const buttonStyles = {
  primary: {
    paddingVertical: 36,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 4,
    width: 300,
  },
  secondary: {
    width: 300,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8F8E8A",
  },
};

function HomeScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.wrapper}>
        <View style={commonStyles.item}>
          <Text style={{ ...textStyles.title, fontSize: 44 }}>
            LUPUS IN TABULA
          </Text>
        </View>

        <View style={commonStyles.item}>
          <Text style={{ ...textStyles.subtitle, fontSize: 25 }}>
            Fare il master non è mai stato così facile.
          </Text>
        </View>

        <View style={commonStyles.item}>
          <TouchableOpacity
            style={{ ...buttonStyles.primary }}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={{ ...textStyles.button, fontSize: 24 }}>
              INCOMINCIAMO
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.wrapper}>
        <View style={commonStyles.item}>
          <Text style={{ ...textStyles.title, fontSize: 44 }}>GIOCO</Text>
        </View>
        {[
          "TEMPISTICHE",
          "PERSONAGGI",
          "NOMI GIOCATORI",
          "SALVA",
          "TEMPLATES",
        ].map((label, index) => (
          <View key={index} style={commonStyles.item}>
            <TouchableOpacity
              style={{ ...buttonStyles.secondary }}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text
                style={{ ...textStyles.subtitle, fontSize: 25, color: "#fff" }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={commonStyles.item}>
          <TouchableOpacity
            style={{ ...buttonStyles.primary, width: 300 }}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Text style={{ ...textStyles.button, fontSize: 24 }}>PLAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  const FloatingDiv = () => {
    const translateY = new Animated.Value(0);

    const floatingAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -20,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    useEffect(() => {
      floatingAnimation();
    }, []);

    return (
      <Animated.View
        style={[
          styles.float,
          {
            transform: [{ translateY: translateY }],
          },
        ]}
      />
    );
  };

  const styles = StyleSheet.create({
    float: {
      width: 150,
      height: 150,
      backgroundColor: "#3E4347",
      borderRadius: 75,
    },
  });

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.wrapper}>
        <View style={commonStyles.item}>
          <Text style={{ ...textStyles.title, fontSize: 44 }}>DAY 1</Text>
        </View>
        <View style={commonStyles.item}>
          <FloatingDiv />
        </View>
        <View style={commonStyles.item}>
          <Text style={{ ...textStyles.subtitle, fontSize: 24 }}>
            {"Attendi mentre mischiamo le carte."}
          </Text>
          <Button
            onPress={() => navigation.navigate("Settings")}
            title="Go to Settings"
          />
        </View>
      </View>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.wrapper}>
        <View style={commonStyles.item}>
          <Text style={{ ...textStyles.title, fontSize: 44 }}>DAY 1</Text>
        </View>
        <View style={commonStyles.item}>
          <Text style={{ ...textStyles.subtitle, fontSize: 24 }}>
            PLACEHOLDER
          </Text>
        </View>
        <View style={commonStyles.item}>
          <TouchableOpacity
            style={{ ...buttonStyles.secondary }}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text
              style={{ ...textStyles.subtitle, fontSize: 25, color: "#fff" }}
            >
              AVANTI
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
