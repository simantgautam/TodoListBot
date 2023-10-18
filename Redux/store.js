import { createStore, applyMiddleware } from "redux";
import todoReducer from "./reducer";
import thunk from "redux-thunk";

const middleware = [thunk];

const store = createStore(todoReducer, applyMiddleware(...middleware));

export default store;
