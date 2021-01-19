import { LOGIN, LOGOUT } from '../actions/actionTypes';

const initialState = false;

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return action.loginValue;
    }

    case LOGOUT: {
      return action.logoutValue;
    }
    default: {
      return state;
    }
  }
};

export default authentication;
