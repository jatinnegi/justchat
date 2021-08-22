import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setAuthToken } from "./api";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.key !== currentState.auth.key) {
    const { key } = currentState.auth;
    setAuthToken(key);
  }
});

export default store;
