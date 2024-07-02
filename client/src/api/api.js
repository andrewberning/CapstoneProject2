import axios from "axios";

const BASE_API_URL = "http://localhost:3000";

class ShoplyApi {

  static async getCategories() {
    const result = await axios.get(`${BASE_API_URL}/categories`);
    return result.data.categories;
  }

  static async getProductsByCategory(category) {
    const result = await axios.get(`${BASE_API_URL}/${category}`);
    return result.data;
  }

  static async getProduct(id, category) {
    const result = await axios.get(`${BASE_API_URL}/${category}/${id}`);
    return result.data;
  }

}

export default ShoplyApi;
