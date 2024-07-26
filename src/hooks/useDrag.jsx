import { useState, useEffect, useRef } from "react";

function useDrag() {
  const [drag, setDrag] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef();

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.classList.contains('drag')){
      setDrag(true);
      setOffset({ x: e.offsetX, y: e.offsetY });
      e.stopPropagation();}
    };

    const handleMouseUp = (e) => {
      setDrag(false);
      e.stopPropagation();
    };

    const handleMouseMove = (e) => {
      if (drag) {
        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;
        setPosition({ x: newX, y: newY });
      }
      e.stopPropagation();
    };

    const currentRef = ref.current;
    const currentContainer = document.body; 

    currentRef.addEventListener('mousedown', handleMouseDown);
    currentRef.addEventListener('mouseup', handleMouseUp);
    currentContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      currentRef.removeEventListener('mousedown', handleMouseDown);
      currentRef.removeEventListener('mouseup', handleMouseUp);
      currentContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, [drag, offset]);

  return { ref, position };
}

export default useDrag;
