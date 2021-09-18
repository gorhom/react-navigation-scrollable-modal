import { useCallback, useContext, useEffect, useRef } from "react";
import { ModalGestureContext } from "@react-navigation/stack";
import type {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  SectionList,
  VirtualizedList,
} from "react-native";

const scrollToTop = (
  scrollableRef: React.RefObject<
    FlatList | ScrollView | SectionList | VirtualizedList<any>
  >
) => {
  if (!scrollableRef.current) {
    return;
  }

  // scrollable is FlatList
  if ("scrollToOffset" in scrollableRef.current) {
    (scrollableRef.current as FlatList).scrollToOffset({
      animated: false,
      offset: 0,
    });
    return;
  }

  // scrollable is ScrollView
  if ("scrollTo" in scrollableRef.current) {
    (scrollableRef.current as ScrollView).scrollTo({
      animated: false,
      y: 0,
    });
    return;
  }

  // scrollable is ScrollView
  if ("scrollTo" in scrollableRef.current) {
    (scrollableRef.current as SectionList).scrollToLocation({
      animated: false,
      itemIndex: 0,
      sectionIndex: 0,
      viewPosition: 0,
      viewOffset: 1000,
    });
    return;
  }

  // scrollable is VirtualizedList
  if ("scrollTo" in scrollableRef.current) {
    (scrollableRef.current as VirtualizedList<any>).scrollToOffset({
      animated: false,
      offset: 0,
    });
    return;
  }
};

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
        scrollToTop(scrollableRef);
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
