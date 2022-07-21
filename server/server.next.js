const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();
const port = 5000;

const prisma = new PrismaClient();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
