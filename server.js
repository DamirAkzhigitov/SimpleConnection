import * as fs from "fs";
import fastify from "fastify";
import fetch from "node-fetch";

const fastifyAPP = fastify({
  logger: true,
});

let initialState = null;

const readJsonFromFile = async () => {
  try {
    const data = await fs.readFileSync("testFile.json", "utf8");

    if (data) {
      initialState = JSON.parse(data);
    } else {
      initialState = {
        data: [],
      };
    }
  } catch (e) {
    console.error("error readJsonFromFile");
  }
};

const writeDataToFile = async (data) => {
  if (!initialState) {
    await readJsonFromFile();
  }

  initialState.data.push(data);

  await fs.writeFileSync("testFile.json", JSON.stringify(initialState));
};

fastifyAPP.get("/", function (request, reply) {
  reply.send(initialState.data);
});

fastifyAPP.get("/last", function (request, reply) {
  const length = initialState.data.length;

  reply.send({ data: initialState.data[length - 1] });
});

fastifyAPP.post("/", async function (request, reply) {
  const { body } = request;

  await writeDataToFile(JSON.parse(body));

  reply.send({ result: true, body: initialState.data });
});

// Run the server!
fastifyAPP.listen(3000, function (err, address) {
  console.log(`Running on http://localhost:3000`);
  if (err) {
    fastifyAPP.log.error(err);
    process.exit(1);
  }
});
fs.open("testFile.json", "w", (err) => {
  if (err) throw err;
  console.log("File created");
});

let counter = 0;

const dataFromSite = async () => {
  try {
    const response = await fetch(
      "https://www.public.cy/public/v1/mm/productPage?sku=1605699&locale=el"
    );
    return await response.json();
  } catch (e) {
    return null;
  }
};

setInterval(async () => {
  const data = await dataFromSite();
  counter++;
  // const test = [counter, Math.random()]
  await writeDataToFile(data);
}, 6000);
