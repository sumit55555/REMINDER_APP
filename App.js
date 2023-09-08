import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/MainScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import ReminderScreen from "./src/components/ReminderScreen";
import Notification from "./src/components/Notification";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide the header for all screens
        }}
      >
        <Stack.Screen name="Category" component={ReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
