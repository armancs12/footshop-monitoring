const { checkProductPage } = require("./monitor");
const { notifyServer } = require("./notifier");
require("dotenv").config();

const SLEEP_SECONDS = 20;

const productIds = [
  "82234", //  1. Karhu Fusion 2.0 Misty Rose/ Reflecting Pond
  "110737", // 2. Karhu Fusion 2.0 Walnut/ Bright White
  "53707", //  3. Karhu Fusion 2.0 Lunar Rock/ Dazzling Blue
  "82225", //  4. Karhu Fusion 2.0 Misty Rose/ Reflecting Pond
  "110986", // 5. Karhu Fusion 2.0 Bright White/ Foggy Dew
  "110992", // 6. Karhu Fusion 2.0 Dawn Blue/ Rainy Day
  "110983", // 7. Karhu Fusion 2.0 Jet Black/ Dawn Blue
  "110749", // 8. Karhu Fusion 2.0 Rainy Day/ Desert Sage
  "78943", //  9. Karhu Fusion 2.0 Lily Lily/ Gray Violet
  "82228", // 10. Karhu Fusion 2.0 White/ Blue Wing Teal
];

function checkAndNotify() {
  console.log("LOG:", "Checking market");
  for (const productId of productIds) {
    checkProductPage(productId).then((changes) => {
      for (const change of changes) {
        console.log(
          "LOG:",
          "Change detected:",
          change.product.name,
          change.message.description
        );
        notifyServer(change.product, change.message);
      }
    });
  }

  setTimeout(checkAndNotify, SLEEP_SECONDS * 1000);
}

checkAndNotify();
