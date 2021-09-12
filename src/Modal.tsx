import React from "react";
import { FlatList, FlatListProps, StyleSheet, Text, View } from "react-native";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { useCardModalGestureInteraction } from "./useCardModalGestureInteraction";

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<any>>(FlatList);

const data = Array(40)
  .fill(0)
  .map((_, index) => `${index}`);

const keyExtractor = (item: any) => `item-${item}`;

// @ts-ignore
const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text>{item}</Text>
  </View>
);

export const Modal = () => {
  const scrollableRef = useAnimatedRef<FlatList>();

  const { scrollableGestureRef, handleScrolling } =
    useCardModalGestureInteraction(scrollableRef);

  return (
    <NativeViewGestureHandler ref={scrollableGestureRef}>
      <AnimatedFlatList
        ref={scrollableRef}
        data={data}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        onScroll={handleScrolling}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
      />
    </NativeViewGestureHandler>
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
