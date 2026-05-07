import API from "../api/axios";

const cartService = {
  // GET CART
  getCart: async () => {
    const response = await API.get(
      "/cart"
    );

    return response.data;
  },

  // ADD TO CART
  addToCart: async (
    productId,
    quantity
  ) => {
    const response = await API.post(
      "/cart/add",
      {
        productId,
        quantity,
      }
    );

    return response.data;
  },

  // REMOVE ITEM
  removeItem: async (id) => {
    const response = await API.delete(
      `/cart/${id}`
    );

    return response.data;
  },
};

export default cartService;