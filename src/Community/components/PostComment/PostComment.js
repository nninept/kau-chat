import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import "./PostComment.css"


function PostComment({comment}) {

    
    return (
        <div className="post-comment">
            <h3 className='nickname'>{comment.nickname}</h3>
            <h6 className='comment-text'>{comment.commentText}</h6>
            <div>{comment.time}</div>
    </div>
    );
}

export default PostComment;

