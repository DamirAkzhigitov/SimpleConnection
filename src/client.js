"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SELECTOR = {
    writeBtn: "write_file_btn",
    readBtn: "read_file_btn",
    input: "input_field",
};
const BASE_API = "http://localhost:3000";
const writeButton = document.getElementsByClassName(SELECTOR.writeBtn)[0];
const readButton = document.getElementsByClassName(SELECTOR.readBtn)[0];
const inputField = document.getElementsByClassName(SELECTOR.input)[0];
const templateItem = (innerHTML, className = "") => {
    if (!innerHTML)
        return null;
    const element = document.createElement("div");
    element.innerHTML = innerHTML;
    if (className)
        element.className = className;
    return element;
};
const insertResultIntoContainer = (result, attributes = "") => {
    if (!result) {
        return console.error("dont have result");
    }
    const container = document.querySelector(".container");
    if (!container)
        return;
    const element = templateItem(JSON.stringify(result), attributes);
    if (!element)
        return;
    container.insertAdjacentElement("afterbegin", element);
};
const sendRequest = (url = "/", method = "get", data = "") => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${BASE_API}${url}`, {
            method,
            body: method === "get" ? null : JSON.stringify(data),
        });
        return yield response.json();
    }
    catch (e) {
        console.error(e);
        return null;
    }
});
if (writeButton) {
    writeButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const inputValue = inputField.value;
        const response = yield sendRequest("/", "post", inputValue);
        if (response)
            insertResultIntoContainer(response);
    }));
}
if (readButton) {
    readButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        // const response = await sendRequest("/date-for-site");
        //
        // if (response) insertResultIntoContainer(response);
    }));
}
let lastResult = null;
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield sendRequest("/last");
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
    if (response)
        insertResultIntoContainer(outPut);
}), 2000);
