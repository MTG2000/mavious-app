const { gql } = require("apollo-server-express");

const productSchema = require("./product.schema");
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;
module.exports = [linkSchema, productSchema];
