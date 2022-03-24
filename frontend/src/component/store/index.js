import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer/rootReducer";

const middleWare = applyMiddleware(thunk);

const store = createStore(rootReducer, composeWithDevTools(middleWare));
export default store;
