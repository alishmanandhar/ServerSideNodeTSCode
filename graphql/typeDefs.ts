import {gql} from 'apollo-server';

const typeDefs = gql`
    scalar Date
    scalar File
    
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

    type Icon {
        id: ID!
        name: String
        path: String
        createdAt: Date
    }

    input IconInput {
        name: String
    }

    type Marker {
        id: ID!
        title: String
        lat: Float
        long: Float
        rotation: Int
        color: String
        icon: String
        createdAt: Date
    }

    input MarkerInput {
        title: String
        lat: Float
        long: Float
        rotation: Int
        color: String
        icon: String
    }
    
    type Query {
        user(ID: ID!): User!
        getUsers(pageNumber:Int, number: Int, name: String, sort: String): [User]
        getIcons: [Icon]
        icon(ID: ID!): Icon!
        getMarkers:[Marker]
    }

    type Mutation {
        createUser(userInput: UserInput): User!
        deleteUser(ID: ID!): Boolean
        editUser(ID: ID!, userInput: UserInput): Boolean
        createIcon(iconInput: IconInput): Icon!
        editIcon(ID: ID!, iconInput: IconInput): Boolean
        deleteIcon(ID: ID!): Boolean
        createMarker(markerInput: MarkerInput): Marker!
        editMarker(ID: ID!, markerInput: MarkerInput): Boolean
        deleteMarker(ID: ID!): Boolean
    }

    
`

export default typeDefs;