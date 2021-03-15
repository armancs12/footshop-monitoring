const fs = require("fs");
const path = require("path");

const DATA_FOLDER = "data";
const FILE_EXTENSION = "json";

function getProductData(productId) {
  const filePath = getFilePath(productId);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const dataJson = fs.readFileSync(filePath);
  return JSON.parse(dataJson);
}

function setProductData(productId, data) {
  const filePath = getFilePath(productId);
  if (!fs.existsSync(getDataFolderPath())) {
    fs.mkdirSync(getDataFolderPath(), { recursive: true });
  }

  const dataJson = JSON.stringify(data);
  fs.writeFileSync(filePath, dataJson);
}

function getFilePath(productId) {
  const fileName = `${productId}.${FILE_EXTENSION}`;
  return path.join(getDataFolderPath(), fileName);
}

function getDataFolderPath() {
  return path.join(__dirname, DATA_FOLDER);
}

module.exports = { getProductData, setProductData };
