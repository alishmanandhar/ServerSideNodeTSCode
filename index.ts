import mongoose from 'mongoose';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import express from "express";
import path from "path";
import { ApolloServer } from 'apollo-server-express';
import http from 'http';



const MONGODB =  'mongodb+srv://admin:admin@cluster0.isavuhb.mongodb.net/?retryWrites=true&w=majority';

//Apollo Server for running GraphQL
//typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve Queries / mutations


// Start the Apollo Server
async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();

    const app = express();
    // Serve static files from the 'public' directory
    app.use(express.static(path.resolve('./public')));
  
    // Apply the Apollo middleware to Express app
    server.applyMiddleware({ app });
  
    // Create a combined HTTP server
    const httpServer = http.createServer(app);
  
    // Listen on the desired port
    const PORT = 8000;
    httpServer.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`GraphQL server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  }
// connecting to mongodb database
mongoose.connect(MONGODB, {})
    .then(()=>{
        console.log("mongodb connected");
        // start server if connected to server.
        return  startApolloServer();
    })
    .then((res: any)=>{
        console.log(`sever running at ${res.url}`)
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });