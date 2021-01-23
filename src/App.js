import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

// css
import "semantic-ui-css/semantic.min.css";
import "./App.css";

// menubar/navbar
import MenuBar from "./components/MenuBar/MenuBar";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Container>
    </Router>
  );
}

export default App;
