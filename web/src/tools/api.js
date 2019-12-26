// All methods in this file are fake implementation of possible connection with server side

/**
 * Fake call to save an image on server side
 * @returns {Promise<{data: [], ok: boolean}>}
 */
export const fakeFetchImagesApiCall = async (options) => Promise.resolve({ok: true, data: []});

/**
 * Fake call to save an image on server side
 * @param title
 * @param imageData
 * @returns {Promise<{imageData: *, created: *, id: *, title: *}>}
 */
export const fakeCreateImageApiCall = async (page) => {
  page.createdAt = new Date();
  page.id = page.createdAt.getMilliseconds();
  return Promise.resolve(page);
};

/**
 * Fake call to update an image on server side
 * @param page
 * @returns {Promise<unknown>}
 */
export const fakeUpdateImageApiCall = async (page) => {
  return Promise.resolve(page);
};
