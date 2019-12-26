import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PagesList } from './pages-list';

const page1 = {id: 1, title: 'Page 1'};
const page2 = {id: 2, title: 'Page 2'};
const pages = [page1, page2];

test('Should render all pages and display selected item', () => {
  const {getAllByRole} = render(<PagesList pages={pages} selectedPage={page2}/>);
  const list = getAllByRole('listitem');
  expect(list.length).toEqual(pages.length);
  expect(list[0].className).toEqual('pages__list-item');
  expect(list[1].className).toEqual('pages__list-item pages__list-item--selected');
});

test('Should select an item', () => {

  const onItemSelected = jest.fn();
  const {getByText} = render(<PagesList pages={pages} onPageSelected={onItemSelected}/>);
  const selectedItem = getByText(page2.title);
  fireEvent.click(selectedItem);

  expect(onItemSelected).toHaveBeenCalledWith(page2);
});

