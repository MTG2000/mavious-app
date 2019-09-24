const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const path = require("path");
const app = express();

// The GraphQL schema in string form
const typeDefs = require("./api/schemas");

// The resolvers
const resolvers = require("./api/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/graphql" });

app.use(express.static(path.resolve(__dirname, "client", "build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/order", (req, res) => {
  const order = req.body;
  //Here we can format the Data in a pretty way & send them to the owner email for example
  res.send({ success: true });
});

app.post("/api/contact", (req, res) => {
  const message = req.body;
  console.log(message);
  res.send({ success: true });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) return console.log(err);
  console.log("server running on port 5000", server.graphqlPath);
});

//READ THIS ::::::::::::::
//https://www.robinwieruch.de/graphql-apollo-server-tutorial
