import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema.js";
import { games, authors, reviews } from "./db.js";

const resolvers = {
  Query: {
    games() {
      return games;
    },
    reviews() {
      return reviews;
    },
    authors() {
      return authors;
    },
    review(parent, args) {
      return reviews.find((review) => review.id === args.id);
    },
    game(parent, args) {
      return games.find((game) => game.id === args.id);
    },
    author(parent, args) {
      return authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return games.find((g) => g.id === parent.author_id);
    },
  },
};
// server setup
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server is running at ${url}`);
