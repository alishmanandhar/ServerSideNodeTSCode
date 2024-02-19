"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const MONGODB = 'mongodb+srv://admin:admin@cluster0.isavuhb.mongodb.net/?retryWrites=true&w=majority';
const API_PORT = 8000;
//Apollo Server for running GraphQL
//typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve Queries / mutations
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default
});
// connecting to mongodb database
mongoose_1.default.connect(MONGODB, {})
    .then(() => {
    console.log("mongodb connected");
    // start server if connected to server.
    return server.listen({ port: API_PORT });
})
    .then((res) => {
    console.log(`sever running at ${res.url}`);
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
