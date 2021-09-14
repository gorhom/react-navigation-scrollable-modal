import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./src/screens/Home";
import { ScrollableModalReanimated } from "./src/screens/ScrollableModalReanimated";
import { ScrollableModalCallbacks } from "./src/screens/ScrollableModalCallbacks";
import { Modal } from "./src/screens/Modal";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} options={{ title: "Home" }} />
      <Stack.Screen
        name="scrollableModalReanimated"
        component={ScrollableModalReanimated}
        options={{ title: "Scrollable Modal Reanimated", presentation: "modal" }}
      />
      <Stack.Screen
        name="scrollableModalCallbacks"
        component={ScrollableModalCallbacks}
        options={{ title: "Scrollable Modal Callbacks", presentation: "modal" }}
      />
      <Stack.Screen
        name="modal"
        component={Modal}
        options={{ title: "Modal", presentation: "modal" }}
      />

    </Stack.Navigator>
  </NavigationContainer>
);
