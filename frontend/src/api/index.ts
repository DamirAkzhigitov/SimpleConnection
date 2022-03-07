import { BASE_API } from '../constants';

export const sendRequest = async <Type>(url = '/', method = 'get', data = ''): Promise<Type | null> => {
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

console.log('work!');
console.log('work!');
console.log('work!');
