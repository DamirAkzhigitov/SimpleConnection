const selectors = {
  writeBtn: "write_file_btn",
  readBtn: "read_file_btn",
  input: "input_field",
};

const writeButton = document.getElementsByClassName(selectors.writeBtn)[0];
const readButton = document.getElementsByClassName(selectors.readBtn)[0];
const inputField = document.getElementsByClassName(selectors.input)[0];

const templateItem = (innerHTML, className = null) => {
  if (!innerHTML) return null;

  const element = document.createElement("div");

  element.innerHTML = innerHTML;
  element.className = className;

  return element;
};

const insertResultIntoContainer = (result, attributes = null) => {
  if (!result) {
    return console.error("dont have result");
  }

  const container = document.querySelector(".container");
  const element = templateItem(JSON.stringify(result), attributes);

  if (!element) return;

  container.insertAdjacentElement("afterbegin", element);
};

const sendRequest = async (url = "/", method = "get", data = null) => {
  try {
    const response = await fetch(url, {
      method,
      body: method === "get" ? null : JSON.stringify(data),
    });

    return await response.json();
  } catch (e) {
    console.error(e);

    return null;
  }
};

if (writeButton) {
  writeButton.addEventListener("click", async () => {
    const inputValue = inputField.value;

    const response = await sendRequest(
      "http://localhost:3000/",
      "post",
      inputValue
    );

    if (response) insertResultIntoContainer(response);
  });
}

if (readButton) {
  readButton.addEventListener("click", async () => {
    const response = await sendRequest("http://localhost:3000/");

    if (response) insertResultIntoContainer(response);
  });
}

let lastResult = null;

setInterval(async () => {
  const response = await sendRequest("http://localhost:3000/last");

  console.log(response);
  // const [counter, result] = response.data;
  const { prices } = response.data;

  console.log("prices: ", prices);

  const { salePrice, skuId } = prices[0];

  const outPut = `skuId: ${skuId}, salePrice: ${salePrice}`;

  // if (outPut === lastResult) return;
  // let customClass = salePrice > 0.75 ? "text-red" : "text-primary";
  lastResult = outPut;

  if (response) insertResultIntoContainer(outPut);
}, 2000);
