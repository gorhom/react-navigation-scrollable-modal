import React from "react";
import { FlatList, FlatListProps, StyleSheet, Text, View } from "react-native";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { useScrollableModalGestureInteractionReanimated } from "../hooks/useScrollableModalGestureInteractionReanimated";
import { Item } from '../components/Item'

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<any>>(FlatList);

const data = Array(40)
  .fill(0)
  .map((_, index) => `${index}`);

const keyExtractor = (item: any) => `item-${item}`;

// @ts-ignore
const renderItem = ({ item }) => (<Item item={item} />);

export const ScrollableModalReanimated = () => {
  const scrollableRef = useAnimatedRef<FlatList>();

  const { scrollableGestureRef, handleScrolling } =
    useScrollableModalGestureInteractionReanimated(scrollableRef);

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
        initialNumToRender={15}
        maxToRenderPerBatch={5}
        windowSize={15}
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
