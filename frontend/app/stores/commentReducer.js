import {
    COMMENT_ADD_REQUEST,
    COMMENT_ADD_SUCCESS,
    COMMENT_ADD_FAIL,

    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_FAIL,

    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAIL,
    COMMENT_DELETE_RESET,

    COMMENT_UPDATE_REQUEST,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_UPDATE_FAIL,
    COMMENT_UPDATE_RESET

  } from '../constants';

export const commentAddReducer = (state = { }, action) => {
    switch (action.type) {
        case COMMENT_ADD_REQUEST:
            return { loading: true };
        case COMMENT_ADD_SUCCESS:
            return { loading: false, comment: action.payload };
        case COMMENT_ADD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const commentListReducer = (state = { loading: true, comments: [] }, action) => {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            return { loading: true };
        case COMMENT_LIST_SUCCESS:
            return { loading: false, comments: action.payload };
        case COMMENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const commentDeleteReducer = (state = { success: false}, action) => {
    switch (action.type) {
        case COMMENT_DELETE_REQUEST:
            return { loading: true };
        case COMMENT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case COMMENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case COMMENT_DELETE_RESET:
            return { };
        default:
            return state;
    }
};

export const commentUpdateReducer = (state = { }, action) => {
    switch (action.type) {
        case COMMENT_UPDATE_REQUEST:
            return { loading: true };
        case COMMENT_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case COMMENT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case COMMENT_UPDATE_RESET:
            return { };
        default:
            return state;
    }
};