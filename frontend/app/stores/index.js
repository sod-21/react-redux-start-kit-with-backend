import { commentAddReducer, commentListReducer, commentDeleteReducer, commentUpdateReducer } from "./commentReducer"
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";

const initialState = {
    commentList: []
}

const reducer = combineReducers({
    commentDelete: commentDeleteReducer,
    commentList: commentListReducer,
    commentAdd: commentAddReducer,
    commentUpdate: commentUpdateReducer,
});

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
