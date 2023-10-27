import { useEffect, useRef, useReducer } from "react";

export function useDevTools() {
  const devTools = useRef<any>({});

  useEffect(() => {
    const withDevTools =
      typeof window !== "undefined" &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__;

    if (withDevTools) {
      const toolsObj = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
      Object.assign(devTools.current, toolsObj);
      devTools.current.init({ value: "initial state" });
      // devTools.current.open();
    } else {
      console.log("no dev tools found");
    }
    const dt = devTools.current;
    return () => {
      if (withDevTools) {
        (window as any).__REDUX_DEVTOOLS_EXTENSION__?.disconnect();
      }
      Object.assign(dt, {});
      // devTools.current = {};
    };
    // eslint-disable-next-line
  }, []);

  return devTools.current;
}

export function useReducerPlus<T extends object>(initialState: T) {
  return useReducer((state: T, update: Partial<T>) => {
    if (update) {
      return {
        ...state,
        ...update,
      };
    }
    return state;
  }, initialState);
}

export function useScrollHook() {
  const scrollRef: any = useRef();
  const scrollTop = () =>
    scrollRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  const scrollBottom = () =>
    scrollRef.current.scrollTo({
      top: 30000,
      behavior: "smooth",
    });

  return [scrollRef, scrollTop, scrollBottom];
}
export const handleScroll = (open: boolean) => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};
