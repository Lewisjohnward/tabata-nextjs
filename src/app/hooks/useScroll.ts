import { MutableRefObject, useEffect, useState } from "react";
import { updateThemeColor } from "@/helpers/updateThemeColor";

const updateBackgroundColor = (
  ref: MutableRefObject<HTMLDivElement | null>,
  color: string
) => {
  if (!ref.current) return;
  ref.current.style.backgroundColor = color;
};

const updateHeader = (
  workoutsRef: MutableRefObject<HTMLDivElement | undefined>,
  headerRef: MutableRefObject<HTMLDivElement | null>
) => {
  const divs = workoutsRef.current?.children;
  const header = headerRef.current;
  const headerHeight = header?.getBoundingClientRect().bottom;
  if (!headerHeight || !divs) return;
  for (let i = 0; i < divs.length; i++) {
    const top = divs[i].getBoundingClientRect().top;
    const bottom = divs[i].getBoundingClientRect().bottom;
    if (top <= headerHeight && bottom >= headerHeight) {
      const div = divs[i].children[0] as HTMLDivElement;
      const color = div.style.backgroundColor;
      return color;
    }
  }
};

const atBottom = (container: HTMLDivElement) => {
  const { scrollHeight, clientHeight, scrollTop } = container;
  return Math.ceil(scrollTop + clientHeight + 1) >= scrollHeight;
};

const scrolledTo = (container: HTMLDivElement, position: number) => {
  const { scrollTop } = container;
  return scrollTop > position;
};

export const useScroll = (
  workouts: WorkoutObj[],
  workoutsRef: MutableRefObject<HTMLDivElement | undefined>,
  headerRef: MutableRefObject<HTMLDivElement | null>,
  color: string,
  btnReturnToTopRef: MutableRefObject<HTMLButtonElement | null>,
  containerRef: MutableRefObject<HTMLDivElement | null>
) => {
  const [returnToTopVisible, setReturnToTopVisible] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const handleScroll = () => {
    if (containerRef.current) {
      setReturnToTopVisible(scrolledTo(containerRef.current, 250));
      setScrolledToBottom(atBottom(containerRef.current));
    }
    const color = updateHeader(workoutsRef, headerRef);
    if (!color) return;
    updateBackgroundColor(headerRef, color);
    updateThemeColor(color);
    if (!btnReturnToTopRef.current) return;
    btnReturnToTopRef.current.style.backgroundColor = color;
  };

  const initColor =
    workouts.length != 0 ? workouts[0].color : color ? color : "#0891b2";
  useEffect(() => {
    updateThemeColor(initColor);
    updateBackgroundColor(headerRef, initColor);
  }, []);

  const handleScrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    initColor,
    handleScroll,
    returnToTopVisible,
    scrolledToBottom,
    handleScrollToTop,
  };
};
