import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Item } from '../components/Item'

const data = Array(40)
  .fill(0)
  .map((_, index) => `${index}`);

const keyExtractor = (item: any) => `item-${item}`;

// @ts-ignore
const renderItem = ({ item }) => (<Item item={item} />);

export const Modal = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      scrollEventThrottle={16}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      renderItem={renderItem}
      initialNumToRender={15}
      maxToRenderPerBatch={5}
      windowSize={15}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 10,
  },
  item: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    backgroundColor: "#dfdfdf",
  },
});
