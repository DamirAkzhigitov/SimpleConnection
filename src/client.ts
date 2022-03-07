const SELECTOR = {
  writeBtn: "write_file_btn",
  readBtn: "read_file_btn",
  input: "input_field",
};

const BASE_API = "http://localhost:3000";

interface StoreItem {
  data: {
    prices: {
      salePrice: string;
      skuId: string;
    }[];
  };
}
const writeButton = document.getElementsByClassName(SELECTOR.writeBtn)[0];
const readButton = document.getElementsByClassName(SELECTOR.readBtn)[0];
const inputField = document.getElementsByClassName(
  SELECTOR.input
)[0] as HTMLInputElement;

const templateItem = (innerHTML: string, className = "") => {
  if (!innerHTML) return null;

  const element = document.createElement("div");

  element.innerHTML = innerHTML;
  if (className) element.className = className;

  return element;
};

const insertResultIntoContainer = (
  result: string | string[] | Record<string, string>,
  attributes = ""
) => {
  if (!result) {
    return console.error("dont have result");
  }

  const container = document.querySelector(".container");
  if (!container) return;

  const element = templateItem(JSON.stringify(result), attributes);

  if (!element) return;

  container.insertAdjacentElement("afterbegin", element);
};

const sendRequest = async <Type>(
  url = "/",
  method = "get",
  data = ""
): Promise<Type | null> => {
  try {
    const response = await fetch(`${BASE_API}${url}`, {
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

    const response = await sendRequest<string[]>("/", "post", inputValue);

    if (response) insertResultIntoContainer(response);
  });
}

if (readButton) {
  readButton.addEventListener("click", async () => {
    // const response = await sendRequest("/date-for-site");
    //
    // if (response) insertResultIntoContainer(response);
  });
}

let lastResult = null;

setInterval(async () => {
  const response = await sendRequest<StoreItem>("/last");

  if (!response) {
    console.log("empty result");

    return;
  }

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
