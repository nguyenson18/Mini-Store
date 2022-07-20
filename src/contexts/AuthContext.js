import { createContext, useReducer, useEffect } from "react";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};
const AuthContext = createContext();

const INITIALIZATION = "INITIALIZATION";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER";
const LOGIN_ERROR = "LOGIN_ERROR";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZATION:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        user,
        isInitialized: true,
      };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload.user,  };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    case LOGIN_ERROR :
      return {...state, isAuthenticated:false, user:null,error: "username or password requied",} 
    default:
      return state;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const username = window.localStorage.getItem("username");
    const password = window.localStorage.getItem("password");
    if (username && password) {
      dispatch({
        type: INITIALIZATION,
        payload: { isAuthenticated: true, user: { username, password } },
      });
    } else {
      dispatch({
        type: INITIALIZATION,
        payload: { isAuthenticated: false, user: null },
      });
    }
  }, []);

  const login = ({username,password}, cb) => {
    dispatch({ type: LOGIN_SUCCESS, payload: { user: { username, password }}});
    cb();
  };

  const logout = (cb) => {
    dispatch({ type: LOGOUT });
    cb();
  };
  const register = ({username,password, email},cb) => {
    dispatch({type: REGISTER, payload: {user: { username, password, email}}});
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("password", password);
    window.localStorage.setItem("email", email);
    cb()
  }
  const loginError = (cb) =>{
    dispatch({type: LOGIN_ERROR})
    cb()
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register,loginError }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
