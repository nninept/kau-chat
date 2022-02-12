import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import "./PostSummary.css"


function PostSummary({post}) {
    return (
        <div className="post-summary">
            <Link to={{
            pathname : "/home/community/article",
            state: {
                post
            }
            }}>
            <h3 className='title'>{post.title}</h3>
            <h6 className='content'>{post.content}</h6>
            <div>{post.time} <span>{post.nickname}</span></div>
            </Link>
    </div>
    );
}

export default PostSummary;

