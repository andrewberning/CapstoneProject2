import axios from "axios";

const BASE_API_URL = "https://shoply-backend-oo7o.onrender.com";


class ShoplyApi {
  // the token for interacting with the API will be stored here.
  static token;

  // Centralized request method
  static async request(endpoint, data = {}, method = 'get') {
    const url = `${BASE_API_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ShoplyApi.token}` };
    const params = (method === 'get') ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Get categories
  static async getCategories() {
    let res = await this.request('categories');
    return res.categories;
  }

  // Get a specific category
  static async getCategory(category) {
    let res = await this.request(`categories/${category}`);
    return res;
  }

  // Search products
  static async searchProducts(searchTerm) {
    const res = await this.request(`products/search`, { q: searchTerm });
    return res.products;
  }

  // Get products by category ID
  static async getProductsByCategoryId(id) {
    let res = await this.request(`products/${id}`);
    return res.products;
  }

  // Get a specific product
  static async getProduct(id) {
    let res = await this.request(`products/product/${id}`);
    return res.product;
  }

  // Get cart items for a specific cart
  static async getCartItems(id) {
    let res = await this.request(`cart/items/${id}`);
    return res.items;
  }

  // Add an item to the cart
  static async addToCart(user, item, quantity) {
    let res = await this.request('cart/item', { user, item, quantity }, 'post');
    return res.cartItem;
  }

  // Remove an item from the cart
  static async removeFromCart(itemId) {
    let res = await this.request(`cart/item/${itemId}`, {}, 'delete');
    return res.message;
  }

  // Remove all items from the cart
  static async removeAllItemsFromCart(cartId) {
    let res = await this.request(`cart/items/${cartId}`, {}, 'delete');
    return res.message
  }

  // Update the quantity of a cart item
  static async updateCartItemQuantity(itemId, quantity) {
    let res = await this.request(`cart/items/${itemId}`, { quantity }, 'patch');
    return res.cartItem;
  }

  // Create order
  static async createOrder(orderData) {
    let res = await this.request(`orders/create-order`, { orderData }, 'post');
    return res.data;
  }

  // Create Paypal Order
  static async createPayPalOrder(orderData) {
    let res = await this.request('orders/create-paypal-order', { orderData }, 'post');
    return res;
  }

  // Capture Paypal Order
  static async capturePayPalOrder(orderID) {
    let res = await this.request(`orders/${orderID}/capture-paypal-order`, {}, 'post');
    return res;
  }

  // Get the current user
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // User login
  static async login(data) {
    let res = await this.request('auth/token', data, 'post');
    return res.token;
  }

  // User signup
  static async signup(data) {
    let res = await this.request('auth/register', data, 'post');
    return res.token;
  }
}

export default ShoplyApi;
