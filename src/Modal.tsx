import React, { useCallback, useContext, useRef } from "react";
import {
  Button,
  FlatList,
  FlatListProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  NativeViewGestureHandler,
  NativeViewGestureHandlerProps,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { CardContext } from "@react-navigation/stack/src/views/Stack/Card";
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<any>>(FlatList);

const data = Array(40)
  .fill(0)
  .map((_, index) => `${index}`);

const keyExtractor = (item) => `item-${item}`;

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text>{item}</Text>
  </View>
);

export const Modal = () => {
  const scrollableRef = useAnimatedRef<FlatList>();
  const { scrollableGestureRef, cardPanTranslateY } = useContext(CardContext);
  const allowScrollable = useSharedValue(true);

  const setCardPanTranslateYOffset = useCallback((value: number) => {
    // console.log("offset", -value);
    cardPanTranslateY.setOffset(-value);
  }, []);

  const handleScroll = useAnimatedScrollHandler(
    {
      onBeginDrag: ({ contentOffset: { y } }) => {
        runOnJS(setCardPanTranslateYOffset)(y);
      },
      onScroll: ({ contentOffset: { y } }) => {
        if (y <= 0 || !allowScrollable.value) {
          scrollTo(scrollableRef, 0, 0, false);
        }
      },
    },
    [allowScrollable, setCardPanTranslateYOffset]
  );

  cardPanTranslateY.addListener(({ value }) => {
    // console.log("cardPanTranslateY", value);
    allowScrollable.value = value <= 0;
  });

  return (
    <NativeViewGestureHandler ref={scrollableGestureRef}>
      <AnimatedFlatList
        ref={scrollableRef}
        data={data}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        onScroll={handleScroll}
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
