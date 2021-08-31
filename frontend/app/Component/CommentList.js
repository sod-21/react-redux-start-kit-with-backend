import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentList } from '../actions';
import Table from 'react-tailwind-table';
import 'react-tailwind-table/dist/index.css';
import {toast} from 'react-toastify';
import moment from "moment";
import Loading from './Modal/Loading';
import DeleteModal from './Modal/DeleteModal';
import EditModal from './Modal/EditModal';

export default function CommentList() {

   const [delComment, setDelComment] = useState({
     comment: false,
     open: false
   });

   const [updateComment, setUpdateComment] = useState( {
     comment: false,
     open: false
   });

  const tableStyle  = useMemo(() => ({

    "table_head": {
        "table_row": "table-custom-header border-b-2 border-gray-100",
        "table_data": ""
    },

    "table_body": {
        "table_data": "px-4"
    },

    "top": {
      "elements": {
        "search": "table-custom-search"
      }
    },

    }), []);

  const columns = useMemo(() => [
    
    {
        field: "comment",        
        use: "Comment"
    },
    {
        field: "created",
        use: "Created"
    },
    {
        field: "id",
        use: "Delete"
    }
  ], []);

  const commentlist = useSelector((state) => state.commentList);
  const { loading, error, comments } = commentlist;

  const dispatch = useDispatch();

  const rowrendered = (row, column, display_value) => {

    if (column.field == "id") {
      return (<button className="bg-red-600 rounded  cursor-pointer border border-transparent shadow-sm px-4 py-2   text-base font-medium text-white hover:bg-red-700  sm:w-auto    focus:outline-none " onClick={(e) => {setDelComment({comment: row, open: true});}}>Delete</button>);
    }

    if (column.field == "comment") {
      return (<a className=" cursor-pointer" onClick={(e) => {setUpdateComment({comment: row, open: true})}}>{display_value} </a>)
    }

    if (column.field == "created") {
      return (<span>{ moment(display_value).format("MM/DD/YYYY h:mm:ss A")}</span>)
    }
    return display_value;
}

  useEffect(() => {
    dispatch(commentList());

  }, []);
  
  useEffect(() => {
    if (error) {
      toast.dark("Comment List error");
    }
  }, [error])

  return (
    <>
      <Loading open={loading}></Loading>
      <div className="comment-table-container">
        <Table  styling ={tableStyle}   should_export={ false } columns={columns} rows={comments ? comments : []} per_page={5}   row_render ={rowrendered} />      
      </div>
      <DeleteModal comment={delComment} onClose={setDelComment} />
      <EditModal modal={updateComment}  onClose={setUpdateComment}  />

    </>
  );
}
