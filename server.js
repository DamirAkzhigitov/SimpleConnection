const fs = require("fs");
const path = require("path");

const fastify = require("fastify")({
  logger: true,
});

let initialState = null;

const readJsonFromFile = async () => {
  try {
    const data = await fs.readFileSync(
      "/home/antitaxi/Projects/testFile.json",
      "utf8"
    );

    console.log("dataL ", data);

    if (data) {
      initialState = JSON.parse(data);
    } else {
      initialState = {
        data: [],
      };
    }
    console.log("initialState: ", initialState);
  } catch (e) {
    console.error("error readJsonFromFile");
  }
};

const writeDataToFile = async (data) => {
  if (!initialState) {
    await readJsonFromFile();
  }

  initialState.data.push(data);

  const append = await fs.writeFileSync(
    "/home/antitaxi/Projects/testFile.json",
    JSON.stringify(initialState)
  );
};

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send(initialState);
});

fastify.post("/", async function (request, reply) {
  const { body } = request;

  console.log("body: ", body);

  await writeDataToFile(JSON.parse(body));

  reply.send({ result: true });
});

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
fs.open("/home/antitaxi/Projects/testFile.json", "w", (err) => {
  if (err) throw err;
  console.log("File created");
});
