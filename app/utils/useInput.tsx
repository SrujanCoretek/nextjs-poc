import { useRef, useCallback, RefObject } from "react";

export default function useInput(): [
  RefObject<HTMLInputElement>,
  () => string
] {
  const ref = useRef<HTMLInputElement>(null);

  const getValue = useCallback(() => {
    if (ref.current) {
      return ref.current.value;
    }
    return "";
  }, []);

  return [ref, getValue];
}
