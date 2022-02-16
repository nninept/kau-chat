import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import address from "../../../address-info"
import PostComment from '../../components/PostComment/PostComment'
import PostCommentUpload from "../../components/PostCommentUpload/PostCommentUpload"
import "./PostContents.css"


function PostContents({location}) {
    const post = location.state.post
    const [comments, setComments] = useState(null)
    const [postComment, setPostComment] = useState(0)

    useEffect(()=>{
        axios.post(address.url + "/api/kauboard/community/get-comments", {articleIdx : post.idx})
        .then(res=>setComments(res.data.result))
    },[postComment])

    return (
        <div className="post-contents">
            <div className='prev-link'><Link to={{
                pathname : "/home/community"
                }}><img src="./left-arrow.png"/></Link>
            </div>
            <div className='article'>
            <div className='article-container'>
            <div className='article-post'>
                <div className='user-data'>
                <img src='./person.png' alt='person'/>
                <div>
                <h3 className='nickname'>{post.nickname}</h3>
                <h3 className='date'>{post.time}</h3>
                </div>
                </div>
                <div className='main-contents'>
                <h3 className='title'>{post.title}</h3>
                <h3 className='contents'>{post.content}</h3>
                <div className='metadata'>
                    <h6 className='likes-count'>{post.likes}</h6>
                    <h6 className='comment-count'>{post.comment}</h6>
                </div>
                </div>
                <div className='buttons'>
                    <button>공감</button>
                </div>
            </div>
            <div className='article-comment'>
                {comments ? comments.map((elem, idx)=>{
                    return <PostComment comment={elem} key={idx}/>
                }) : null}
                <PostCommentUpload updateArticleCommentsList={setPostComment} articleIdx={post.idx}/>
            </div>
            </div>
            </div>
    </div>
    );
}

export default PostContents;

