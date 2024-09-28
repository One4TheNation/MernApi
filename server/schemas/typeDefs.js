const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    bookCount: String
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type auth {
    toke: ID
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

input BookInput {
bookId: ID
authors: [String]
description: String
title: String
image: String
link: String
}

  type Query {
    me: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput): User
    removeBook(bookId: ID!, commentId: ID!): User
  }
`;

module.exports = typeDefs;
