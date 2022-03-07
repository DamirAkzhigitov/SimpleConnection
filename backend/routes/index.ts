import { FastifyInstance } from 'fastify';
import fetch from 'node-fetch';
import { getLastState } from '../state';

const dataFromSite = async () => {
  try {
    const response = await fetch(
      'https://www.public.cy/public/v1/mm/productPage?sku=1605699&locale=el'
    );
    return await response.json();
  } catch (e) {
    console.error('error: ', e);
    return null;
  }
};

async function routes(fastify: FastifyInstance) {
  fastify.get('/date-for-site', async (request, reply) => {
    const data = await dataFromSite();

    reply.send({ data: data });
  });

  fastify.get('/last', function (request, reply) {
    const length = getLastState().data.length;

    reply.send({ data: getLastState().data[length - 1] });
  });
}

export default routes;
