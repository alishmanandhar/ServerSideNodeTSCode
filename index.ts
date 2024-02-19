import {ApolloServer} from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const MONGODB =  'mongodb+srv://admin:admin@cluster0.isavuhb.mongodb.net/?retryWrites=true&w=majority';
const API_PORT = 8000;

//Apollo Server for running GraphQL
//typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve Queries / mutations

const server = new ApolloServer({
    typeDefs,
    resolvers
})

// connecting to mongodb database
mongoose.connect(MONGODB, {})
    .then(()=>{
        console.log("mongodb connected");
        // start server if connected to server.
        return server.listen({port:API_PORT})
    })
    .then((res: any)=>{
        console.log(`sever running at ${res.url}`)
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });