const Product =require("../models/Product")

//get all products
const getProducts =async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product by id
const getProductsById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id); // convert string to number
    const product = await Product.findOne({ id: productId });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//to delete a product
deleteProducts= async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const result = await Product.deleteOne({ id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//add or update a product
const postProducts= async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    // Find the product with the highest numeric id
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const maxId = lastProduct ? lastProduct.id : 0;

    // Create new product with incremented id
    const product = await Product.create({
      id: maxId + 1,
      name,
      price,
      image,
      description
    });

    res.status(201).json({ message: "Product created successfully", product });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
    getProducts,getProductsById, deleteProducts,postProducts
}