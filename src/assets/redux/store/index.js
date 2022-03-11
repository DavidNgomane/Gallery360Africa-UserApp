import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import Reducers from "../reducers";


export default store = createStore(Reducers, applyMiddleware(thunk));