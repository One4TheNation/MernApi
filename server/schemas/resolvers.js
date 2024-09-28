const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async () => {
      if (context.user) {
        return User.find({});
      }
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError("No User Found");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError("Wrong Credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const book = await Book.findOneAndUpdate({ bookID: bookData.bookId });
      }
      throw new AuthenticationError("Login Please!");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return Thought.findOneAndDelete({ _id: bookId });
      }
    },
  },
};

module.exports = resolvers;
