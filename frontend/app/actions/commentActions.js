import Axios from 'axios';

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

    COMMENT_UPDATE_REQUEST,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_UPDATE_FAIL,

} from '../constants';

const api = "/api/v1/comment";

export const commentAdd = (comment) => async (dispatch) => {
    dispatch({ type: COMMENT_ADD_REQUEST });
    try {
        const { data, status } = await Axios.post(api, {
            comment
        });

        if (status == 201)
            dispatch({ type: COMMENT_ADD_SUCCESS, payload: data });
        if (status == 400)
            dispatch({ type: COMMENT_ADD_FAIL, payload: data });
       
    } catch (error) {
        dispatch({
            type: COMMENT_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const commentList = () => async (dispatch) => {
    dispatch({ type: COMMENT_LIST_REQUEST });
    try {

        const { data } = await Axios.get(api);

        dispatch({ type: COMMENT_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: COMMENT_LIST_FAIL, payload: message });
    }
};

export const commentUpdate = (comment) => async (dispatch) => {
    dispatch({ type: COMMENT_UPDATE_REQUEST, payload: comment });
    
    try {
        const { data, status } = await Axios.put(`${api}/${comment.id}`, comment);
        dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: data });
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: COMMENT_UPDATE_FAIL, payload: message });
    }
};


export const commentDelete = (comment) => async (dispatch) => {
    dispatch({ type: COMMENT_DELETE_REQUEST, payload: comment });
    
    try {
        const { data, status } = await Axios.delete(`${api}/${comment.id}`, comment);        
        dispatch({ type: COMMENT_DELETE_SUCCESS, payload: data });
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: COMMENT_DELETE_FAIL, payload: message });
    }
};