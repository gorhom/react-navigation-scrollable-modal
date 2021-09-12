import { useCallback, useContext, useEffect } from "react";
import { CardModalGestureContext } from "@react-navigation/stack";
import {
  runOnJS,
  scrollTo,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import type { FlatList, ScrollView } from "react-native";

export const useCardModalGestureInteraction = (
  scrollableRef: React.RefObject<ScrollView | FlatList>
) => {
  // context
  const { scrollableGestureRef, cardModalTranslateY } = useContext(CardModalGestureContext);

  // variables
  const lockScrolling = useSharedValue(true);

  // callback
  const setCardPanTranslateYOffset = useCallback((value: number) => {
    cardModalTranslateY.setOffset(-value);
  }, []);
  const setLockScrolling = useCallback(
    ({ value }) => {
      lockScrolling.value = value > 0;
    },
    [lockScrolling]
  );
  const handleScrolling = useAnimatedScrollHandler(
    {
      onBeginDrag: ({ contentOffset: { y } }) => {
        runOnJS(setCardPanTranslateYOffset)(y);
      },
      onScroll: ({ contentOffset: { y } }) => {
        if (y <= 0 || lockScrolling.value) {
          // @ts-ignore
          scrollTo(scrollableRef, 0, 0, false);
        }
      },
    },
    [lockScrolling, setCardPanTranslateYOffset]
  );

  // effects
  useEffect(() => {
    const listener = cardModalTranslateY.addListener(setLockScrolling);
    return () => {
      cardModalTranslateY.removeListener(listener);
    };
  }, []);

  return {
    scrollableGestureRef,
    handleScrolling,
  };
};
