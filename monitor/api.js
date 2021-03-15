const { default: axios } = require("axios");

const REFERER =
  "https://www.footshop.cz/cs/panske-tenisky-a-boty/82228-karhu-fusion-20-white-blue-wing-teal.html";

const BASE_URL = "https://www.footshop.cz/cs";
const SIZE_REGION = "EUR";

async function getNewProductData(productId) {
  const URL = `${BASE_URL}/api/product/${productId}`;
  const response = await axios.get(URL, { headers: { Referer: REFERER } });
  return responseToProductData(response);
}

function responseToProductData(response) {
  const data = response.data;

  const pageURL = `${BASE_URL}/${data["url"]}`;
  const sizes = data["availability"]["data"].map((data) => ({
    quantity: data["quantity"],
    quantityOnline: data["quantity_online"],
    number: data["size_values"][SIZE_REGION],
  }));

  return {
    id: String(data["id"]),
    name: data["name"],
    image: data["images"]["cover_image"],
    pageURL,
    price: data["price"]["value"],
    isSoldOut: data["sold_out"],
    sale: data["sale"],
    sizes: sizes,
  };
}

module.exports = { getNewProductData };
