import { gql, useQuery } from "@apollo/client";
import "./App.css";

const BOOKS = gql`
  query {
    test {
      title
      author
    }
  }
`;

console.log(BOOKS);

function Books() {
  const { loading, data } = useQuery(BOOKS);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return data.test.map((book: { title: string; author: string }) => (
    <div key={book.title}>
      <p>
        {book.title}：{book.author}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <h2>GraphQL Client</h2>
      <Books />
    </div>
  );
}

export default App;
