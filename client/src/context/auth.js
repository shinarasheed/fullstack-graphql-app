import React, { useReducer, createContext } from 'react';
import jwt_decode from 'jwt-decode';

const initialState = {
  user: null,
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwt_decode(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userdata) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userdata) {
    localStorage.setItem('jwtToken', userdata.token);
    dispatch({
      type: 'LOGIN',
      payload: userdata,
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({
      type: 'LOGOUT',
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthContextProvider };
