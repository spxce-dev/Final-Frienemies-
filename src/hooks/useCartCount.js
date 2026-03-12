import { useEffect, useState } from "react";
import { getCartCount, subscribeCartUpdates } from "@/utils/cartStore";

export default function useCartCount() {
  const [count, setCount] = useState(() =>
    typeof window === "undefined" ? 0 : getCartCount()
  );

  useEffect(() => {
    setCount(getCartCount());
    return subscribeCartUpdates(setCount);
  }, []);

  return count;
}
