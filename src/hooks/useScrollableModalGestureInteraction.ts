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
  scrollableRef: React.RefObject<
    FlatList | ScrollView | SectionList | VirtualizedList<any>
  >
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
  const lockScrolling = useRef(true);

  // methods
  const setLockScrolling = useCallback(
    (value: number) => {
      lockScrolling.current = value > 0;
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
  const handleOnBeginDrag = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      // @ts-ignore
      if (modalTranslateY._value === 0) {
        setLockScrolling(0);
      }

      setOffset(y);
    },
    [setLockScrolling, setOffset, modalTranslateY]
  );
  const handleOnScroll = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (y <= 0 || lockScrolling.current) {
        scrollToTop(scrollableRef);
      }
    },
    []
  );
  const handleOnEndDrag = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      setOffset(y);
    },
    [setOffset]
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
    handleOnScroll,
    handleOnEndDrag: handleOnEndDrag,
    handleOnBeginDrag: handleOnBeginDrag,
  };
};
