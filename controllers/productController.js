const Products = require("../models/productModel");
const { getPostData } = require("../utils/utils");

async function getProducts(req, res) {
  try {
    const products = await Products.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await Products.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);
    const product = {
      name,
      description,
      price,
    };

    const newProduct = await Products.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
      return;
    }

    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);
    const productData = {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
    };

    const updatedProduct = await Products.update(id, productData);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(updatedProduct));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
};
