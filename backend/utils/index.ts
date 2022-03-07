import fs from 'fs';
import { changeState, getLastState, pushToState } from '../state';

export const readJsonFromFile = async () => {
  try {
    const data = await fs.readFileSync('testFile.json', 'utf8');

    if (data) changeState(JSON.parse(data));
  } catch (e) {
    console.error('error readJsonFromFile');
  }
};

export const writeDataToFile = async (data: string) => {
  if (!getLastState()) {
    await readJsonFromFile();
  }

  pushToState(data);

  await fs.writeFileSync('testFile.json', JSON.stringify(getLastState()));
};
