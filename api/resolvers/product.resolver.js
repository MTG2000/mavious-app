const products_data = require("../../data");

module.exports = {
  Query: {
    products: (_, { limit = 6, offset = 0 }) => {
      return products_data.slice(offset, offset + limit);
    },
    getProduct: (_, { model }) =>
      products_data.filter(p => p.model === model)[0]
  }
};
