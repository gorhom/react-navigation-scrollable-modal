import { useCallback, useContext, useEffect } from "react";
import { ModalGestureContext } from "@react-navigation/stack";
import {
  runOnJS,
  scrollTo,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import type { FlatList, ScrollView } from "react-native";

export const useScrollableModalGestureInteractionReanimated = (
  scrollableRef: React.RefObject<ScrollView | FlatList>
) => {
  // context
  const { scrollableGestureRef, modalTranslateY } = useContext(ModalGestureContext);

  // variables
  const lockScrolling = useSharedValue(true);

  // callback
  const setCardPanTranslateYOffset = useCallback((value: number) => {
    modalTranslateY.setOffset(-value);
    console.log('offset', -value);
  }, []);
  const setLockScrolling = useCallback(
    ({ value }) => {
      lockScrolling.value = value > 0;
      console.log('lockScrolling', value > 0);
    },
    [lockScrolling]
  );
  const handleScrolling = useAnimatedScrollHandler(
    {
      onBeginDrag: ({ contentOffset: { y } }) => {
        runOnJS(setCardPanTranslateYOffset)(y);
      },
      onScroll: ({ contentOffset: { y } }) => {
        console.log('onScroll', y <= 0, lockScrolling.value)
        if (y <= 0 || lockScrolling.value) {
          // @ts-ignore
          scrollTo(scrollableRef, 0, 0, false);
        }
      },
      onEndDrag: ({ contentOffset: { y } }) => {
        runOnJS(setCardPanTranslateYOffset)(y);
      },
      onMomentumEnd: ({ contentOffset: { y } }) => {
        runOnJS(setCardPanTranslateYOffset)(y);
      },
    },
    [lockScrolling, setCardPanTranslateYOffset]
  );

  // effects
  useEffect(() => {
    const listener = modalTranslateY.addListener(setLockScrolling);
    return () => {
      modalTranslateY.removeListener(listener);
    };
  }, []);

  return {
    scrollableGestureRef,
    handleScrolling,
  };
};
