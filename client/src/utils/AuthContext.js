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
  ...initialState,
  login: (userData) => {},
  logout: () => {},
  updateUser: (userData) => {}
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
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
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

  function updateUser(userData){
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    })
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, updateUser }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };