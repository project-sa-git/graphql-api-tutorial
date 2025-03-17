const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "吾輩は猫である",
    author: "夏目漱石",
  },
  {
    title: "坊ちゃん",
    author: "夏目漱石",
  },
  {
    title: "走れメロス",
    author: "太宰治",
  },
];

// スキーマ定義：GraphQLの問い合わせの型を定義
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    test: [Book]
  }
`;

// リゾルバー
const resolvers = {
  Query: {
    test: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
