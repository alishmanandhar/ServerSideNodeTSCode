"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
    scalar Date
    
    type User {
        id: ID!
        name: String
        age: Int
        bio: String
        createdAt: Date
    }

    input UserInput {
        name: String
        age: Int
        bio: String
        createdAt: Date
    }

    type Query {
        user(ID: ID!): User!
        getUsers(pageNumber:Int, number: Int, name: String, sort: String): [User]
    }

    type Mutation {
        createUser(userInput: UserInput): User!
        deleteUser(ID: ID!): Boolean
        editUser(ID: ID!, userInput: UserInput): Boolean
    }
`;
exports.default = typeDefs;
