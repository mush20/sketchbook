import React, { forwardRef, useState } from 'react';
import { drawLine, getMousePosition } from '../../tools/drawing';
import { useEventListener } from '../../tools/event-listener';
import './drawing-area.scss';

export const DrawingArea = forwardRef((props, ref) => {

  const [isDrawing, setIsDrawing] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState(null);
  const [currentMousePosition, setCurrentMousePosition] = useState(null);

  const handleMouseDown = (event) => {
    const mousePosition = getMousePosition(event);
    setPreviousMousePosition(mousePosition);
    setCurrentMousePosition(mousePosition);
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (event) => {
    if (isDrawing) {
      const canvas = event.target;
      const mousePosition = getMousePosition(event);
      setPreviousMousePosition(currentMousePosition);
      setCurrentMousePosition(mousePosition);
      drawLine(canvas, previousMousePosition, currentMousePosition);
    }
  };

  useEventListener(ref, 'mousedown', handleMouseDown);
  useEventListener(ref, 'mousemove', handleMouseMove);
  useEventListener(ref, 'mouseup', handleMouseUp);
  useEventListener(ref, 'mouseout', handleMouseUp);

  return (<canvas className="drawing-area" ref={ref}/>);
});
