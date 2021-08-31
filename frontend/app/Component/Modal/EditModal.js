import React, { useState, useMemo, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDispatch, useSelector } from 'react-redux';
import { commentUpdate, commentList } from '../../actions';
import {toast} from 'react-toastify';
import { useForm } from "react-hook-form";

export default function EditModal(props) {
    const { modal, onClose } = props;
    const { register, setValue, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const updateState = useSelector((state) => state.commentUpdate);
    
    const [ form, setForm ] = useState({
        content: false
    });

    const {
        loading, 
        error,
        success
    } = updateState;

    const initialUpdate = useMemo(() => ({
        modal: false,
        open: false
    }));

       const submitHandler = (data) => {
        setForm(data);
        
        if (data.content) {
            const updateData = {
                ...modal.comment,
                comment: data.content
            };
            
            dispatch(commentUpdate(updateData));
        }
    }

    useEffect(() => {
        if (success) {
            toast.success("Udpate successfully");
            onClose(initialUpdate);
            dispatch(commentList());
        }

        if (error) {
            toast.dark("Update Error");
            onClose(initialUpdate);
        }
    }, [success, error]);

    useEffect(() => {
        if (modal.comment)
            setValue("content", modal.comment.comment);
    }, [modal.comment]);

    return (
        <Modal open={modal.open} onClose={() => {onClose(initialUpdate)}}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="bg-white  pt-5 pb-4  w-80 ">
                                      
                    <div className="mt-5 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Edit Comment
                        </h3>
                        <div className="mt-2">
                        
                            <div className="mb-1">
                                <textarea {...register("content")}  rows="6" className={"border w-full p-2  " + (form.content === "" ? " border-red-500" : " border-gray-100") } placeholder="input a comment"></textarea>

                                {  form.content === "" ? (
                                    <p class="font-medium text-red-500 text-xs mt-1 ml-1">
                                    {"Please input the field."}
                                    </p>
                                ) : (<></>)} 
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="  px-4 py-3 sm:px-6 sm:flex  ">
                    <button  className="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none   sm:ml-3 sm:w-auto  " >
                        {
                            loading ? (<div class="w-5 h-5 mr-3 border-b-2 border-white-900 rounded-full animate-spin"></div>) : (<></>)
                        }

                        Save
                    </button>
                    <button type="button" className="mt-3 w-full inline-flex justify-center rounded border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto  " onClick={(e) => {onClose(initialUpdate)}}>
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}