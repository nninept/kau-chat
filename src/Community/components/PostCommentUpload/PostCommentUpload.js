import {useState} from 'react'
import axios from 'axios'
import address from "../../../address-info"
import "./PostCommentUpload.css"

function PostCommentUpload({updateArticleCommentsList, articleIdx}) {
    const [commentText, setCommentText] = useState(null)
    const onCommentChange = (e)=>{
        setCommentText(e.currentTarget.value)
    }

    const onButtonClick = ()=>{
        axios.post(address.url + "/api/kauboard/community/add-comments",{articleIdx,commentText,stcode:JSON.parse(window.localStorage.getItem("loginInfo")).id})
        .then(res => {
            updateArticleCommentsList()
        })
    }
    return (
        <div className="post-comment-upload">        
        <input type="text" className='post-text' placeholder="댓글을 입력하세요" onChange={onCommentChange}></input>
        <button className='post-button' onClick={onButtonClick}></button>
    </div>
    );
}

export default PostCommentUpload;

