const initialState = {
  user: null,
  login: (userData) => login(userData),
  logout: () => logout(),
};

export const actionTypes = {
    user: "SET_USER",
  login: "LOGIN_USER",
  logout: "LOGOUT_USER",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.user:
        
        return {
          ...state,
          user: action.user,
        };
    case actionTypes.login:
      state.login(action.user);
      return {
        ...state,
        user: action.user,
      };
      case actionTypes.logout:
        state.logout();
        return {
          ...state,
          user: null,
        };
    default:
      return state;
  }
};

export default authReducer;

function login({token}) {
    localStorage.setItem("_user", token);
};

function logout() {
    localStorage.removeItem("_user");
};
