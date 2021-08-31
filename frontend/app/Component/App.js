import React from "react"
import NewComment from "./NewComment"
import CommentList from "./CommentList";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App(props) {
    return (
        <div className="container px-3 mx-auto">
            <h1 className="my-4 text-xl font-bold leading-tight">Component Management</h1>

            <div className="mb-5">
                <NewComment></NewComment>                
            </div>

            <div className="">
                <CommentList></CommentList>
            </div>
            <ToastContainer />
        </div>
    )
}