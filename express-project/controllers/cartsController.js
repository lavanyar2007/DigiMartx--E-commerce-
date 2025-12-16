const Cart = require("../models/carts");


const getCarts = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userData.id })
      .populate("products.product");

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: null,
        totalPrice: 0
      });
    }

    // Calculate total price inline
    const totalPrice = cart.products.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    res.status(200).json({
      message: "Cart items fetched successfully",
      cart,
      totalPrice
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart items", error: err.message });
  }
};


const addToCart = async (req, res) => {
  try {
    const userId = req.userData.id;
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // create new cart
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }]
      });
    } else {
      // check product already exists
      const index = cart.products.findIndex(
        p => p.product.toString() === productId
      );

      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }
    await cart.save();
    const populatedCart = await cart.populate("products.product");

    // Calculate total price inline
    const totalPrice = populatedCart.products.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    res.status(200).json({
      message: "Product added to cart",
      cart: populatedCart,
      totalPrice
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to add to cart",
      error: err.message
    });
  }
};



const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body; // send productId & new quantity
    const cart = await Cart.findOne({ user: req.userData.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const index = cart.products.findIndex(p => p.product.toString() === productId);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products[index].quantity = quantity; // update quantity
    await cart.save();

    const populatedCart = await cart.populate("products.product");

    const totalPrice = populatedCart.products.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    res.status(200).json({
      message: "Cart updated successfully",
      cart: populatedCart,
      totalPrice
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart", error: err.message });
  }
};



const deleteCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.userData.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      p => p.product.toString() !== productId
    );

    await cart.save();

    const populatedCart = await cart.populate("products.product");

    // Calculate total 
    const totalPrice = populatedCart.products.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    res.status(200).json({
      message: "Product removed from cart",
      cart: populatedCart,
      totalPrice
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to delete cart item",
      error: err.message
    });
  }
};


module.exports = {
  getCarts,
  updateCart, 
  addToCart,
  deleteCart
};
