import { useState } from 'react';
import { fakeCreateImageApiCall, fakeFetchImagesApiCall, fakeUpdateImageApiCall } from '../tools/api';

/**
 * Custom hook to manage page data state
 * @returns {{pages: *, savePage: *, fetchPages: *, error: *}}
 */
export const useApiState = ({fetch, create, update}) => {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  /**
   * Fetches page data
   * @param options
   */
  const fetchData = (options) => {
    fetch(options)
      .then(result => setItems(result.data))
      .catch(error => setError(error));
  };

  /**
   * Create a new page
   * @param data
   * @returns {Promise<{imageData: *, created: *, id: *, title: *} | void>}
   */
  const createData = (data) => {
    return create(data)
      .then(result => {
        items.push(result);
        setItems([...items]);
        return result;
      })
      .catch(error => setError(error));
  };

  /**
   * Updates an existent page
   * @param data
   * @returns {Promise<unknown>}
   */
  const updateData = (data) => {
    const index = items.findIndex(page => page.id === data.id);
    const page = items[index];
    if (index >= 0) {
      return update(page)
        .then(result => {
          items[index] = result;
          setItems([...items]);
          return result;
        });
    }
    setError('invalid id');
  };

  /**
   * Creates or updates a page based on id
   * @param data
   * @returns {Promise<unknown>|Promise<{imageData: *, created: *, id: *, title: *}|void>}
   */
  const saveData = (data) => {
    if (data.id)
      return updateData(data);

    return createData(data);
  };

  return [[items, error], [fetchData, saveData]];
};

export const usePageState = () => {
  const api = {fetch: fakeFetchImagesApiCall, create: fakeCreateImageApiCall, update: fakeUpdateImageApiCall };
  return useApiState(api);
};
