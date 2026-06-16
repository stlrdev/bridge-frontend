"use client";

import { useEffect, useRef } from "react";

/**
 * Props for the useInfiniteScroll hook
 */
interface UseInfiniteScrollProps {
  /** Callback function triggered when the sentinel element intersects with the viewport */
  onIntersect: () => void;
  /** Whether the infinite scroll functionality is enabled. Defaults to true */
  enabled?: boolean;
  /** Threshold for intersection detection (0-1). Defaults to 0.1 */
  threshold?: number;
  /** Margin around the root element. Defaults to "0px 0px 100px 0px" (100px bottom margin) */
  rootMargin?: string;
}

/**
 * A custom hook that implements infinite scrolling functionality using the Intersection Observer API.
 *
 * This hook creates a sentinel element that triggers a callback when it comes into view,
 * allowing you to load more content automatically as the user scrolls down the page.
 *
 * @param props - Configuration options for the infinite scroll behavior
 * @returns A ref to be attached to the sentinel element at the bottom of your scrollable content
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [items, setItems] = useState([]);
 *   const [loading, setLoading] = useState(false);
 *
 *   const loadMore = useCallback(() => {
 *     if (loading) return;
 *     setLoading(true);
 *     fetchMoreItems().then(newItems => {
 *       setItems(prev => [...prev, ...newItems]);
 *       setLoading(false);
 *     });
 *   }, [loading]);
 *
 *   const sentinelRef = useInfiniteScroll({
 *     onIntersect: loadMore,
 *     enabled: !loading,
 *     threshold: 0.1,
 *     rootMargin: "0px 0px 200px 0px"
 *   });
 *
 *   return (
 *     <div>
 *       {items.map(item => <Item key={item.id} {...item} />)}
 *       <div ref={sentinelRef} />
 *     </div>
 *   );
 * }
 * ```
 */
export function useInfiniteScroll({
  onIntersect,
  enabled = true,
  threshold = 0.1,
  rootMargin = "0px 0px 100px 0px",
}: UseInfiniteScrollProps) {
  // Ref for the sentinel element that will be observed for intersection
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;

    // Exit early if no element exists or infinite scroll is disabled
    if (!el || !enabled) return;

    // Create an IntersectionObserver to watch when the sentinel comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the sentinel element is intersecting with the viewport
        if (entries[0]?.isIntersecting) onIntersect();
      },
      { threshold, rootMargin },
    );

    // Start observing the sentinel element
    observer.observe(el);

    // Cleanup: disconnect the observer when the component unmounts or dependencies change
    return () => observer.disconnect();
  }, [enabled, onIntersect, threshold, rootMargin]);

  // Return the ref to be attached to the sentinel element
  return sentinelRef;
}
