export const ratingsDefs = `

    input Review {
        country: String!
        state: String!
        adderss: String!
        review: String!
    }

    type Rating {
        _id: ID!
        country: String!
        state: String!
        adderss: String!
        review: String!
        createdBy: String!
    }
    
    type Mutation {
        createRating(data: Review!): Rating
        updateRating(id: ID!, data: Review!): Rating
        deleteRating(id: ID!): String!

        upvote(reviewId: ID!): [Rating]
    }

    type Query {
        getRating(id: ID!): Rating
        getRatings: [Rating]
        search(text: String!): [Results]
    }

`;
