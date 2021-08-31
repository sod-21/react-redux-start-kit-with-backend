import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { commentAdd, commentList } from '../actions';
import { toast } from 'react-toastify';
import Loading from "./Modal/Loading";
import { useForm } from "react-hook-form";

export default function NewComment() {
    const { register, setValue, handleSubmit } = useForm();
    const [ form, setForm ] = useState({
        content: false
    });

    const commentadd = useSelector((state) => state.commentAdd);
    const { comment, loading, error } = commentadd;
    
    const dispatch = useDispatch();

    const submitHandler = (data) => {
        setForm(data);
        
        if (data.content) {
            dispatch(commentAdd(data.content));
        }
    }

    useEffect(() => {
        if (comment) {
            toast.success("Create a comment successfully");
            setForm({content: false});
            setValue("content",  "");
            dispatch(commentList());
        }

        if (error) {
            setForm({content: false});
            toast.dark("Create error");
        }
    }, [comment, error]);

    return (        
        <div className="rounded border">
         
            <Loading open={loading} />

            <div className="border-bottom bg-gray-100 p-2">
                Create new comment
            </div>
            <div className="p-4">                
                <h3 className="">Comment</h3>
                <form className="form" onSubmit={handleSubmit(submitHandler)}>
                    <div className="mb-1">
                        <textarea {...register("content")}  rows="6" className={"focus:outline-none focus:ring-1 border w-full p-2 lg:w-1/2 " + (form.content === "" ? " border-red-500" : " border-gray-100") } placeholder="input a comment"></textarea>

                        {  form.content === "" ? (
                            <p class="font-medium text-red-500 text-xs mt-1 ml-1">
                            {"Please input the field."}
                            </p>
                        ) : (<></>)} 
                    </div>
                    
                    <div className="">
                        <button className="bg-green-600 rounded  cursor-pointer border border-transparent shadow-sm px-4 py-2   text-base font-medium text-white hover:bg-green-700  focus:outline-none sm:w-auto   ">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}