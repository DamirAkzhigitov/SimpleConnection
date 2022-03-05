const selectors = {
  writeBtn: "write_file_btn",
  readBtn: "read_file_btn",
};

const writeButton = document.getElementsByClassName(selectors.writeBtn)[0];
const readButton = document.getElementsByClassName(selectors.readBtn)[0];

const sendRequest = async (url = "/", method = "get", data = null) => {
  try {
    const response = await fetch(url, {
      method,
      body: method === "get" ? null : JSON.stringify(data),
    });

    return await response.json();
  } catch (e) {
    return null;
    console.error(e);
  }
};

if (writeButton) {
  console.log(writeButton);

  writeButton.addEventListener("click", async () => {
    await sendRequest("http://localhost:3000/", "post", {
      hello: "client",
    });
  });
}

if (readButton) {
  console.log(readButton);

  readButton.addEventListener("click", async () => {
    const response = await sendRequest("http://localhost:3000/");

    console.log("response: ", response);
  });
}
