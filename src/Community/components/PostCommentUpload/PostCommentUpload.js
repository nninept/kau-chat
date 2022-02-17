import {useState} from 'react'
import axios from 'axios'
import address from "../../../address-info"
import "./PostCommentUpload.css"

function PostCommentUpload({updateArticleCommentsList, articleIdx, postComment}) {
    const [commentText, setCommentText] = useState(null)
    const onCommentChange = (e)=>{
        setCommentText(e.currentTarget.value)
    }

    const onSubmit = (e)=>{
        axios.post(address.url + "/api/kauboard/community/add-comments",{articleIdx,commentText,stcode:JSON.parse(window.localStorage.getItem("loginInfo")).id})
        .then(res => {
            e.target[0].value = ""
            updateArticleCommentsList(postComment+1)
        })
        e.preventDefault()
    }

    return (
        <div className="post-comment-upload" onSubmit={onSubmit}>
        <form className="upload-form">
        <input type="text" className='post-text' placeholder="댓글을 입력하세요" onChange={onCommentChange}></input>
        <button className='post-button'></button>
        </form>
    </div>
    );
}

export default PostCommentUpload;

