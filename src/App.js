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
import Unavailable from "./pages/404";
import { useEffect } from "react";

// jwt decoder
import jwt_decode from "jwt-decode";

// redux-store
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "./utils/reducer/authReducer";

function App() {
  const { user } = useSelector(reducer => reducer.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("_user")) {
      const token = localStorage.getItem("_user");
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("_user");
        dispatch({
          type: actionTypes.user,
          user: null,
        });
      } else {
        dispatch({
          type: actionTypes.user,
          user: { username: decodedToken.username, id: decodedToken.id },
        });
      }
    }
  }, []);


  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={!user ? Login : Unavailable} />
        <Route path="/register" component={!user ? Register : Unavailable} />
      </Container>
    </Router>
  );
}

export default App;
