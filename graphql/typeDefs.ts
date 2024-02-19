import {gql} from 'apollo-server';

const typeDefs = gql`
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
`

export default typeDefs;