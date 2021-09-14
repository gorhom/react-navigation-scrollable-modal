import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Item = ({ item }: any) => (
  <View style={styles.container}>
    <Text>{item}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    backgroundColor: "#dfdfdf",
  },
});
