import React, { useState, useMemo, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDispatch, useSelector } from 'react-redux';
import { commentDelete, commentList } from '../../actions';
import {toast} from 'react-toastify';

export default function DeleteModal(props) {
    const { comment, onClose } = props;

    const dispatch = useDispatch();
    const deleteState = useSelector((state) => state.commentDelete);

    const {
        loading, 
        error,
        success
    } = deleteState;

    const initialDelete = useMemo(() => ({
        comment: false,
        open: false
    }));

    const onDelete = (e) => {
        e.preventDefault();

        if (comment.comment) {
            dispatch(commentDelete(comment.comment));
        }
    }

    useEffect(() => {
        if (success) {
            toast.success("Delete successfully");
            onClose(initialDelete);
            dispatch(commentList());
        }

        if (error) {
            toast.dark("Delete Error");
            onClose(initialDelete);
        }
    }, [success, error]);

    return (
        <Modal open={comment.open} onClose={() => {onClose(initialDelete)}}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Delete Comment
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Are you sure you want to delete a comment?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto  focus:outline-none  " onClick={(e) => {onDelete(e)}}>
                    Delete
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded  border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto   focus:outline-none " onClick={(e) => {onClose(initialDelete)}}>
                    Cancel
                </button>
            </div>
        </Modal>
    );
}