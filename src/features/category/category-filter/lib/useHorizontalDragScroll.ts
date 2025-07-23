import { useEffect, useRef } from "react";

export function useHorizontalDragScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // 드래그 시작
  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = "grabbing";
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // 드래그 중
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // 드래그 종료
  const onMouseUp = () => {
    if (!containerRef.current) return;
    isDragging.current = false;
    containerRef.current.style.cursor = "grab";
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  }, []);

  return { containerRef, onMouseDown, isDragging };
}
