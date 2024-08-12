const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const { NotFoundError } = require("../expressError");

// Add and item to cart
async function addItemToCart(req, res, next) {
  try {
    const { user, item, quantity } = req.body;
    const cart = await Cart.findByUserId(user.id);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = await CartItem.create({
      cart_id: cart.id,
      product_id: item.id,
      price: item.price,
      quantity
    });

    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
}

// Get user cart
async function getCart(req, res, next) {
  try {
    const { id } = req.params;
    let cart = await Cart.findByUserId(id);

    if (!cart) {
      throw new NotFoundError("Cart not found");
    }

    const items = await CartItem.findAllByCartId(cart.id);
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
}

// Update cart item quantity
async function updateCartItemQuantity(req, res, next) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedItem = await CartItem.updateQuantity(id, quantity);
    res.json({ updatedItem });
  } catch (err) {
    return next(err);
  }
}

// Remove item from cart
async function removeItemFromCart(req, res, next) {
  try {
    const { id } = req.params;
    const removedItem = await CartItem.remove(id);
    return res.json({ message : `Item Removed` });
  } catch (err) {
    return next(err);
  }
}

// Remove all items form cart
async function removeItemsFromCart(req, res, next) {
  const cartId = req.params.id;
  
  try {
    await CartItem.removeAllItems(cartId);
    res.json({ message: "Items Removed from user cart" });
  } catch (err) {
    return next(err);
  }
}

module.exports = { addItemToCart, getCart, updateCartItemQuantity, removeItemFromCart, removeItemsFromCart };
