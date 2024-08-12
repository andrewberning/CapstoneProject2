import ShoplyApi from "../api/api";

export async function getCurrentUserData(username) {
  return await ShoplyApi.getCurrentUser(username);
}

export async function fetchCategories() {
  return await ShoplyApi.getCategories();
}

export async function createOrder(orderData) {
  return await ShoplyApi.createOrder(orderData)
}