import { sendRequest } from './src/api';
import { templateItem } from './src/utils';

const SELECTOR = {
  writeBtn: 'write_file_btn',
  readBtn: 'read_file_btn',
  input: 'input_field',
  container: 'container',
};

const writeButton = document.getElementsByClassName(SELECTOR.writeBtn)[0];
const readButton = document.getElementsByClassName(SELECTOR.readBtn)[0];
const container = document.getElementsByClassName(SELECTOR.container)[0];
const inputField = document.getElementsByClassName(
  SELECTOR.input
)[0] as HTMLInputElement;

const insertResultIntoContainer = (
  result: string | string[] | Record<string, string>,
  attributes = ''
) => {
  if (!result) {
    return console.error('dont have result');
  }

  const element = templateItem(JSON.stringify(result), attributes);

  if (!element) return;

  container.insertAdjacentElement('afterbegin', element);
};

if (writeButton) {
  writeButton.addEventListener('click', async () => {
    const inputValue = inputField.value;

    const response = await sendRequest<string[]>('/', 'post', inputValue);

    if (response) insertResultIntoContainer(response);
  });
}

if (readButton) {
  readButton.addEventListener('click', async () => {});
}
