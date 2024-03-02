"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = __importDefault(require("http"));
const MONGODB = 'mongodb+srv://admin:admin@cluster0.isavuhb.mongodb.net/?retryWrites=true&w=majority';
//Apollo Server for running GraphQL
//typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve Queries / mutations
// Start the Apollo Server
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.default,
            resolvers: resolvers_1.default
        });
        yield server.start();
        const app = (0, express_1.default)();
        // Serve static files from the 'public' directory
        app.use(express_1.default.static(path_1.default.resolve('./public')));
        // Apply the Apollo middleware to Express app
        server.applyMiddleware({ app });
        // Create a combined HTTP server
        const httpServer = http_1.default.createServer(app);
        // Listen on the desired port
        const PORT = 8000;
        httpServer.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`GraphQL server running at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}
// connecting to mongodb database
mongoose_1.default.connect(MONGODB, {})
    .then(() => {
    console.log("mongodb connected");
    // start server if connected to server.
    return startApolloServer();
})
    .then((res) => {
    console.log(`sever running at ${res.url}`);
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
