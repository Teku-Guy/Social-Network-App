import { createContext, useReducer } from 'react';
import Auth from './auth';

const initialState = {
  user: ''
};

if(Auth.loggedIn()) {
  const getUser = Auth.getProfile();

  if(Auth.isTokenExpired()) {
    localStorage.removeItem('id_token');
  } else {
    initialState.user = getUser;
  }
}

const AuthContext = createContext({
  user: '',
  login: (userData) => {},
  logout: () => {}
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    Auth.login(userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    Auth.logout();
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };