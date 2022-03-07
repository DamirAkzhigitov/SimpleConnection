import * as fs from 'fs';
import fastify from 'fastify';
import { getLastState, pushToState } from './state';
import { writeDataToFile } from './utils';

const fastifyAPP = fastify({
  logger: true,
});

fs.open('testFile.json', 'w', (err) => {
  if (err) throw err;
  console.log('File created');
});

fastifyAPP.get('/', function (request, reply) {
  const lastState = getLastState();

  reply.send(lastState.data);
});

fastifyAPP.post('/', async function (request, reply) {
  const { body } = request;

  await writeDataToFile(JSON.parse(body as string));

  const lastState = getLastState();

  reply.send({ result: true, body: lastState.data });
});

fastifyAPP.listen(8080, function (err, address) {
  console.log(`Running on http://localhost:8080`);
  if (err) {
    fastifyAPP.log.error(err);
    process.exit(1);
  }
});
