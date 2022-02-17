import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import address from "../../../address-info"
import PostComment from '../../components/PostComment/PostComment'
import PostCommentUpload from "../../components/PostCommentUpload/PostCommentUpload"
import "./PostContents.css"


function PostContents({location}) {
    const KR_TIME_DIFF = 9*60*60*1000
    const post = location.state.post
    const [comments, setComments] = useState(null)
    const [postComment, setPostComment] = useState(0)
    const [commentCount, setCommentCount] = useState(post.comment)
    const [likesCount, setLikesCount] = useState(post.likes)
    const postTime = new Date((new Date(post.time)).getTime() - KR_TIME_DIFF)
    const dateDiff = Date.now() - postTime
    const newTimeFormat = (Math.ceil(dateDiff/(1000*60*60)) > 24) ? (new Date()).getMonth()+"/"+(new Date()).getDate() : (postTime).getHours()+":"+(postTime).getMinutes()

    const onVoteClick = (e) => {
        axios.post(address.url + "/api/kauboard/community/update-votes", {articleIdx : post.idx})
        .then(res=>{
            setLikesCount(likesCount+1)
        })
    }
    useEffect(()=>{
        axios.post(address.url + "/api/kauboard/community/get-comments", {articleIdx : post.idx})
        .then(res=>{
            setComments(res.data.result)
            setCommentCount(commentCount+1)
        })
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
                    <div className='user-text-data'>
                    <h3 className='nickname'>{post.nickname}</h3>
                    <h3 className='date'>{newTimeFormat}</h3>
                    </div>
                </div>
                <div className='main-contents'>
                <h3 className='title'>{post.title}</h3>
                <h3 className='contents'>{post.content}</h3>
                <ul className='meta-data'>

                    <li className='likes-count'>{likesCount}</li>
                    <li className='comment-count'>{commentCount}</li>
                </ul>
                </div>
                <div className='buttons'>
                    <button className='post-votes' onClick={onVoteClick}>공감</button>
                </div>
            </div>
            <div className='article-comment'>
                {comments ? comments.map((elem, idx)=>{
                    return <PostComment comment={elem} key={idx}/>
                }) : null}
                <PostCommentUpload updateArticleCommentsList={setPostComment} postComment={postComment} articleIdx={post.idx}/>
            </div>
            </div>
            </div>
    </div>
    );
}

export default PostContents;

