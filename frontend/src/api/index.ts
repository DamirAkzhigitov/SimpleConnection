import { BASE_API } from '../constants';
import { SendRequestItem } from '../models';

export const sendRequest: SendRequestItem = async (url, method, data = '') => {
  try {
    const response = await fetch(`${BASE_API}${url}`, {
      method,
      body: method === 'get' ? null : JSON.stringify(data),
    });

    if (response.status !== 200) {
      return null;
    }

    return await response.json();
  } catch (e) {
    console.error(e);

    return null;
  }
};
