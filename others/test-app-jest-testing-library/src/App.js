import "./App.css";
import { Col, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";

function App() {
  return (
    <div className="app-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h1 className="text-center text-light mb-4">
              Jest/Testing Libraryのテスト
            </h1>
            <Login data-testid="child" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
