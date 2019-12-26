import React from 'react';
import './dialog.scss';

export const Dialog = (props) => {

  const {show} = props;

  if (!show)
    return null;

  return (
    <section className="dialog">
      <section className="dialog__card">
        {props.children}
      </section>
    </section>
  );
};
