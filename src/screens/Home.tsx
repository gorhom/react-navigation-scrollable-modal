import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Button } from "../components/Button";

export const Home = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        title="Open Scrollable Modal"
        subtitle="with Reanimated v2"
        onPress={() => navigate("scrollableModalReanimated")}
      />
      <Button
        title="Open Scrollable Modal"
        subtitle="with callbacks"
        onPress={() => navigate("scrollableModalCallbacks")}
      />

      <Button
        title="Open Modal"
        subtitle="Default implementation"
        onPress={() => navigate("modal")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
