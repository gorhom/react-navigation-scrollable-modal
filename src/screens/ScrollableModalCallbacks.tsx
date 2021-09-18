import React, { useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import { useScrollableModalGestureInteraction } from "../hooks/useScrollableModalGestureInteraction";
import { Item } from "../components/Item";

const data = Array(40)
  .fill(0)
  .map((_, index) => `${index}`);

const keyExtractor = (item: any) => `item-${item}`;

// @ts-ignore
const renderItem = ({ item }) => <Item item={item} />;

export const ScrollableModalCallbacks = () => {
  const scrollableRef = useRef<FlatList>(null);
  const {
    handleOnBeginDrag,
    handleOnEndDrag,
    handleOnScroll,
    scrollableGestureRef,
  } = useScrollableModalGestureInteraction(scrollableRef);
  return (
    <NativeViewGestureHandler ref={scrollableGestureRef}>
      <FlatList
        ref={scrollableRef}
        data={data}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        onScroll={handleOnScroll}
        onScrollBeginDrag={handleOnBeginDrag}
        onScrollEndDrag={handleOnEndDrag}
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
});
