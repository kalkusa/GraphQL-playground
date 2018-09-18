var express = require("express");
var graphqlHTTP = require("express-graphql");
var graphql = require("graphql");
var inMemoryDatabase = require("./inMemoryDatabase").inMemoryDatabase;
var _ = require("lodash-node");

var userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString }
  }
});

var queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function(parent, { id }) {
        return _.find(inMemoryDatabase, { id: id });
      }
    }
  }
});

var mutationType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString }
      },
      resolve: function(parent, { id, name }) {
        var index = _.findIndex(inMemoryDatabase, { id: id });
        inMemoryDatabase.splice(index, 1, { id: id, name: name });
        return _.find(inMemoryDatabase, { id: id });
      }
    }
  }
});

var schema = new graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

var port = 9000;
if (process.env.PORT) {
  port = process.env.PORT;
}

app.listen(port);
console.log("Running a GraphQL API server at localhost:" + port + "/graphql");
