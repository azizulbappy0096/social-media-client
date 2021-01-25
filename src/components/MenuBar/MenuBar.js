import { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

// redux-store
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../../utils/reducer/authReducer";

function MenuBar() {
  const { user } = useSelector(reducer => reducer.authReducer);
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState("");

    useEffect(() => {
        const pathname = window.location.pathname;
        const path = pathname === "/" ? "home" : pathname.substring(1);
        setActiveItem(path);
    }, [])

  const handleItemClick = (e, { name }) => {
    setActiveItem(name.toLowerCase());
  };

  return (
    <div>
      { user ? (
        <Menu pointing secondary>
        <Menu.Item
          content={user.username}
          active
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="LogOut"
            onClick={() => {dispatch({
              type: actionTypes.logout
            })
            setActiveItem("home")
          }}
          as={Link}
          to="/"
          />
        </Menu.Menu>
      </Menu>
      ) : (
        <Menu pointing secondary>
        <Menu.Item
          name="Home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="Login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="Register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
      )}
    </div>
  );
}

export default MenuBar;
