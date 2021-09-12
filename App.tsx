import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./src/Home";
import { Modal } from "./src/Modal";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} options={{ title: "Home" }} />
      <Stack.Screen
        name="modal"
        component={Modal}
        options={{ title: "Scrollable Modal", presentation: "modal" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
