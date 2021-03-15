class Product {
  constructor({ id, name, image, pageURL, price, isSoldOut, sale, sizes }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.pageURL = pageURL;
    this.price = price;
    this.isSoldOut = isSoldOut;
    this.sale = sale;
    this.sizes = sizes;
  }
}

module.exports = Product;
