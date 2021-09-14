import { useCallback, useContext, useEffect, useRef } from "react";
import { ModalGestureContext } from "@react-navigation/stack";
import type {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

export const useScrollableModalGestureInteraction = (
  scrollableRef: React.RefObject<FlatList>
) => {
  // context
  const { scrollableGestureRef, modalTranslateY } =
    useContext(ModalGestureContext);

  // variables
  const lockScrolling = useRef(true);

  // callback
  const setLockScrolling = useCallback(
    ({ value }) => {
      lockScrolling.current = value > 0;
    },
    [lockScrolling]
  );
  const handleSettingOffset = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      modalTranslateY.setOffset(-y);
    },
    [modalTranslateY]
  );
  const handleOnBeginDrag = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      // @ts-ignore
      if (modalTranslateY._value === 0) {
        lockScrolling.current = false;
      }
      modalTranslateY.setOffset(-y);
    },
    []
  );
  const handleOnScroll = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      if ((y <= 0 || lockScrolling.current) && scrollableRef.current) {
        scrollableRef.current.scrollToOffset({
          animated: false,
          offset: 0,
        });
      }
    },
    []
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
    handleOnScroll,
    handleOnEndDrag: handleSettingOffset,
    handleOnBeginDrag: handleOnBeginDrag,
  };
};
