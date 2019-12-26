import React, { useEffect, useRef, useState } from 'react';

export const PagesDialog = ({pageCount, onClose}) => {
  const inputRef = useRef(null);
  const [title, setTitle] = useState(`Page ${pageCount + 1}`);

  // Selects input content on load
  useEffect(() => inputRef.current.select(), []);

  // Handles input changes
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  // Handles input enter key press
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      onClose(title);
    }
  };

  return (
    <section className="pages__title">
      <h4>New Page</h4>
      <input ref={inputRef}
             value={title}
             onChange={handleChange} onKeyUp={handleKeyUp}/>
      <section className="pages__title-actions">
        <button onClick={() => onClose(null)}>Cancel</button>
        <button onClick={() => onClose(title)}>Ok</button>
      </section>
    </section>
  );
};
