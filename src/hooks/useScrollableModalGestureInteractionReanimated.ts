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
  const context = useContext(ModalGestureContext);
  if (!context) {
    throw new Error(
      "Couldn't find values for modal gesture. Are you inside a screen in Modal Stack?"
    );
  }

  // variables
  const { modalTranslateY, scrollableGestureRef } = context;
  const lockScrolling = useSharedValue(true);

  // methods
  const setLockScrolling = useCallback(
    ({ value }) => {
      lockScrolling.value = value > 0;
    },
    [lockScrolling]
  );
  const setOffset = useCallback(
    (value: number) => {
      modalTranslateY.setOffset(-value);
    },
    [modalTranslateY]
  );

  // callback
  const handleScrolling = useAnimatedScrollHandler(
    {
      onBeginDrag: ({ contentOffset: { y } }) => {
        // @ts-ignore
        runOnJS(setOffset)(y);
      },
      onScroll: ({ contentOffset: { y } }) => {
        if (y <= 0 || lockScrolling.value) {
          // @ts-ignore
          scrollTo(scrollableRef, 0, 0, false);
        }
      },
      onEndDrag: ({ contentOffset: { y } }) => {
        runOnJS(setOffset)(y);
      },
      onMomentumEnd: ({ contentOffset: { y } }) => {
        runOnJS(setOffset)(y);
      },
    },
    [lockScrolling, setOffset]
  );

  // effects
  useEffect(() => {
    const listener = modalTranslateY.addListener(({ value }) =>
      setLockScrolling(value)
    );
    return () => {
      modalTranslateY.removeListener(listener);
    };
  }, [modalTranslateY, setLockScrolling]);

  return {
    scrollableGestureRef,
    handleScrolling,
  };
};
