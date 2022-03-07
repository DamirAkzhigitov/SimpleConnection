import * as fs from 'fs';
import fastify from 'fastify';
import fetch from 'node-fetch';
import { getLastState, changeState, pushToState } from './state';

const fastifyAPP = fastify({
  logger: true,
});

const readJsonFromFile = async () => {
  try {
    const data = await fs.readFileSync('testFile.json', 'utf8');

    if (data) changeState(JSON.parse(data));
  } catch (e) {
    console.error('error readJsonFromFile');
  }
};

const writeDataToFile = async (data: number) => {
  if (!getLastState()) {
    await readJsonFromFile();
  }

  pushToState(data);

  await fs.writeFileSync('testFile.json', JSON.stringify(getLastState()));
};

fastifyAPP.get('/', function (request, reply) {
  const lastState = getLastState();

  reply.send(lastState.data);
});

fastifyAPP.post('/', async function (request, reply) {
  const { body } = request;

  console.log('body: ', body);

  await writeDataToFile(JSON.parse(body as string));

  const lastState = getLastState();

  console.log('lastState: ', lastState);

  reply.send({ result: true, body: lastState.data });
});

// Run the server!
fastifyAPP.listen(8080, function (err, address) {
  console.log(`Running on http://localhost:8080`);
  if (err) {
    fastifyAPP.log.error(err);
    process.exit(1);
  }
});
fs.open('testFile.json', 'w', (err) => {
  if (err) throw err;
  console.log('File created');
});

// setInterval(async () => {
//   const data = await dataFromSite();
//   counter++;
//   // const test = [counter, Math.random()]
//   await writeDataToFile(data);
// }, 6000);
