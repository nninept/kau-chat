import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import "./PostSummary.css"


function PostSummary({post}) {    
    const KR_TIME_DIFF = 9*60*60*1000
    const postTime = new Date((new Date(post.time)).getTime() - KR_TIME_DIFF)
    const dateDiff = Date.now() - postTime
    const newTimeFormat = (Math.ceil(dateDiff/(1000*60*60)) > 24) ? 
                (new Date()).getMonth()+"/"+(new Date()).getDate() 
                        : (postTime).getHours()+":"+(postTime).getMinutes()
    
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
            <ul className='meta-data'>
                <div>
                <li className='time'>{newTimeFormat}</li>
                <li className='nickname'>{post.nickname}</li>
                </div>
                <div className='post-related-data'>
                <li className='votes'>{post.likes}</li>
                <li className='comment'>{post.comment}</li>
                </div>
            </ul>
            </Link>
    </div>
    );
}

export default PostSummary;

