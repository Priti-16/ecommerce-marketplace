import API from "../api/axios";

const productService = {
  // GET ALL PRODUCTS
  getAllProducts: async () => {
    const response = await API.get(
      "/products"
    );

    return response.data;
  },

  // GET SINGLE PRODUCT
  getProductById: async (id) => {
    const response = await API.get(
      `/products/${id}`
    );

    return response.data;
  },

  // SELLER PRODUCTS
  getSellerProducts: async () => {
    const response = await API.get(
      "/seller/products"
    );

    return response.data;
  },

  // ADD PRODUCT
  createProduct: async (data) => {
    const response = await API.post(
      "/seller/products",
      data
    );

    return response.data;
  },

  // UPDATE PRODUCT
  updateProduct: async (
    id,
    data
  ) => {
    const response = await API.put(
      `/seller/products/${id}`,
      data
    );

    return response.data;
  },

  // DELETE PRODUCT
  deleteProduct: async (id) => {
    const response = await API.delete(
      `/seller/products/${id}`
    );

    return response.data;
  },
};

export default productService;