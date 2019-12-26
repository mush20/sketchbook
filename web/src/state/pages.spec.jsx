import { renderHook, act } from '@testing-library/react-hooks'
import { usePageState } from './pages';

describe('Pages State', () => {

  test('should create and update a Page', async () => {

    const originalTitle = 'Page 1';
    const changeTitle = 'Change Page';
    const {result, waitForNextUpdate} = renderHook(() => usePageState());
    const [[pages], [, savePage]] = result.current;

    expect(pages.length).toEqual(0);

    act(() => {
      savePage({title: 'Page 1'});
    });

    await waitForNextUpdate();

    const page = pages[0];

    expect(pages.length).toEqual(1);
    expect(page.id).not.toBeUndefined();
    expect(page.title).toEqual(originalTitle);

    act(() => {
      page.title = changeTitle;
      savePage(page);
    });

    await waitForNextUpdate();

    expect(pages.length).toEqual(1);
    expect(page.id).not.toBeUndefined();
    expect(page.title).toEqual(changeTitle);
  });
});
