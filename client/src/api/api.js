import axios from "axios";

const BASE_API_URL = "http://localhost:3000";

class ShoplyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async getCategories() {
    const result = await axios.get(`${BASE_API_URL}/categories`);
    return result.data.categories;
  }

  static async getCategory(category) {
    const result = await axios.get(`${BASE_API_URL}/categories/${category}`);
    return result.data;
  }

  static async getProductsByCategoryId(id) {
    const result = await axios.get(`${BASE_API_URL}/products/${id}`);
    return result.data.products;
  }

  static async getProduct(id) {
    const result = await axios.get(`${BASE_API_URL}/products//product/${id}`);
    return result.data.product;
  }

  static async getCurrentUser(username) {
    const result = await axios.get(`${BASE_API_URL}/users/${username}`);
    return result.data.user;
  }

  static async login(data) {
    const result = await axios.post(`${BASE_API_URL}/auth/token`, data);
    return result.data.token;
  }

  static async signup(data) {
    const result = await axios.post(`${BASE_API_URL}/auth/register`, data);
    return result.data.token;
  }
}

export default ShoplyApi;
