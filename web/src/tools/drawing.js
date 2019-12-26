/**
 * detects mouse position on canvas
 * @param event
 * @returns {{x: *, y: *}}
 */
export const getMousePosition = (event) => {
  const canvas = event.target;
  const rect = canvas.getBoundingClientRect();
  let x = event.pageX - rect.left;
  let y = event.pageY - rect.top;

  // normalize the mouse coordinates
  x /= rect.width;
  y /= rect.height;

  // scale to canvas coordinates
  x *= canvas.width;
  y *= canvas.height;

  return {x, y};
};

/**
 * Draws a line between two points
 * @param context
 * @param previousPoint
 * @param currentPoint
 */
export const drawLine = (canvas, previousPoint, currentPoint) => {
  const context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(previousPoint.x, previousPoint.y);
  context.lineTo(currentPoint.x, currentPoint.y);
  context.lineWidth = 1;
  context.stroke();
  context.closePath();
};

/**
 * Draws an image in the canvas
 * @param canvas
 * @param imageData
 */
export const drawImage = (canvas, imageData) => {
  // Loads image data into canvas
  const context = canvas.getContext('2d');
  const image = new Image();
  image.onload = () => context.drawImage(image, 0, 0);
  image.src = imageData;
};

/**
 * Generates an image from the canvas content
 * @param canvas
 * @returns {string}
 */
export const generateImage = (canvas) => {
  return canvas.toDataURL();
};

/**
 * Clears the canvas
 * @param canvas
 */
export const clearDrawing = (canvas) => {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
};
