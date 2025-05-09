import { useEffect, useRef, useState } from 'react';

export default function useInfiniteScroll(callback) {
  const observerRef = useRef();
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    });
    const { current: obs } = observerRef;
    if (node) obs.observe(node);
    return () => obs.disconnect();
  }, [node, callback]);

  return setNode;
}
