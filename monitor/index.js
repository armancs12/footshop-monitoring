const api = require("./api");
const storage = require("./storage");
const Product = require("../Product");

const checkList = [
  function checkPrice(oldProduct, newProduct) {
    const messages = [];
    if (oldProduct.price != newProduct.price) {
      messages.push({
        title: `Price change for ${newProduct.name}`,
        description: `New price is now ${newProduct.price} czk!`,
      });
    }

    return messages;
  },
  function checkSoldOut(oldProduct, newProduct) {
    const messages = [];
    if (oldProduct.isSoldOut != newProduct.isSoldOut) {
      if (newProduct.isSoldOut) {
        messages.push({
          title: `${newProduct.name} is sold out!`,
          description: "Unfortunately there is no stock now.",
        });
      } else {
        messages.push({
          title: `New goods for ${newProduct.name} arrived!`,
          description: "There are some stock on the market now.",
        });
      }
    }
    return messages;
  },
  function checkSizeQuantity(oldProduct, newProduct) {
    const messages = [];
    for (let i = 0; i < oldProduct.sizes.length; i++) {
      const size = newProduct.sizes[i];
      const oldSize = oldProduct.sizes[i];
      if (oldSize.quantity != size.quantity) {
        messages.push({
          title: `Quantity change for ${newProduct.name}`,
          description: `New quantity of size ${size.quantity} is now ${size.quantity}!`,
        });
      }
    }

    return messages;
  },
];

async function checkProductPage(productId) {
  const totalMessages = [];
  const oldProduct = getOldProduct(productId);
  const newProduct = await getNewProduct(productId);

  if (oldProduct == null) {
    console.log(
      "ERROR:",
      `no old product data for ${productId}, no comparison made`
    );
    storeNewProduct(newProduct);
    return totalMessages;
  }

  for (const check of checkList) {
    const messages = check(oldProduct, newProduct);
    totalMessages.concat(messages);
  }

  storeNewProduct(newProduct);
  return totalMessages.map((message) => ({ product: newProduct, message }));
}

async function getNewProduct(productId) {
  const data = await api.getNewProductData(productId);
  return new Product(data);
}

function getOldProduct(productId) {
  const data = storage.getProductData(productId);
  if (data == null) {
    return null;
  }
  return new Product(data);
}

async function storeNewProduct(product) {
  storage.setProductData(product.id, product);
}

module.exports = { checkProductPage };
