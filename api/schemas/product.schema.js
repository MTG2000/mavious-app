const { gql } = require("apollo-server-express");

module.exports = gql`
  type Product {
    id: Int!
    model: Int!
    name: String!
    price: String
    imgUrl: String!
    imgUrl_2: String!
    isNew: Boolean
    ingredients: String
    sizes: [[Int!]!]!
    colors: [String!]!
  }

  extend type Query {
    products(limit: Int, offset: Int): [Product!]
    getProduct(model: Int!): Product
  }
`;
