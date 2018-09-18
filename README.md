# GraphQL-playground
Experiments with basics of GraphQL

To run execute `npm install` then `npm start`. The server will run. Navigate in your browser to http://localhost:9000/graphql to play with the app.

To get user, execute:

query getUser {
  user(id: "31ce0260-2c23-4be5-ab78-4a5d1603cbc8"){
  	name 
  }
}

To update user, execute:

mutation updateUser {
  user(id: "31ce0260-2c23-4be5-ab78-4a5d1603cbc8", name: "Markus") {
    id
    name
  }
}