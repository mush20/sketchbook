import React from 'react';

export const PagesList = ({pages, selectedPage, onPageSelected}) => {

  const handleItemStyle = (page) => {
    const isSelected = selectedPage && selectedPage.id === page.id;
    return `pages__list-item${isSelected ? ' pages__list-item--selected' : ''}`;
  };

  return (
    <section className="pages__list">
      {
        pages.map((page, index) => <section key={index}
                                            role="listitem"
                                            onClick={() => onPageSelected(page)}
                                            className={handleItemStyle(page)}>{page.title}</section>)
      }
    </section>
  );
};
