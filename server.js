var express = require("express");
var graphqlHTTP = require("express-graphql");
var graphql = require("graphql");
var inMemoryDatabase = require("./inMemoryDatabase").inMemoryDatabase;


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
      resolve: function(_, { id }) {
        return inMemoryDatabase.filter(function(user) {
          return user.id === id;
        })[0];
      }
    }
  }
});



var schema = new graphql.GraphQLSchema({ query: queryType });

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
