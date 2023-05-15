export const authorizeDefs = `

    input Credentials {
        email: String!
        password: String!
    }

    type AuthResponse {
        message: String!
        token: String
        email: String!
    }

    type Mutation {
        authorize(data: Credentials): AuthResponse!
    }

`;
