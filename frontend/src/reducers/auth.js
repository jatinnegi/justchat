import { AUTH_SUCCESS, AUTH_FAIL, FETCH_USER, LOGOUT } from "../actions/types";

const initialState = {
  key: localStorage.getItem("key"),
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };

    case AUTH_SUCCESS:
      localStorage.setItem("key", payload);
      return {
        ...state,
        key: payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case LOGOUT:
    case AUTH_FAIL:
      localStorage.removeItem("key");
      return {
        ...state,
        key: null,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
}
