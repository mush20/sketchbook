import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PagesDialog } from './pages-dialog';

const defaultTitle = 'Page 1';

test('should show display a new page dialog', () => {
  const {getByRole} = render(<PagesDialog pageCount={0}/>);

  const input = getByRole('textbox');

  expect(input.value).toEqual(defaultTitle);
});

test('should close the dialog and return the new page title', ()=> {

  const pageTitle = 'Test Page';
  const onClose = jest.fn();

  const {getByText, getByRole} = render(<PagesDialog pageCount={0} onClose={onClose} />);

  const input = getByRole('textbox');
  const ok = getByText('Ok');

  fireEvent.change(input, { target: { value: pageTitle}});
  fireEvent.click(ok);

  expect(onClose).toHaveBeenCalledWith(pageTitle);

});

test('should close the dialog and return null', ()=> {

  const onClose = jest.fn();

  const {getByText} = render(<PagesDialog pageCount={0} onClose={onClose} />);

  const cancel = getByText('Cancel');

  fireEvent.click(cancel);

  expect(onClose).toHaveBeenCalledWith(null);

});
