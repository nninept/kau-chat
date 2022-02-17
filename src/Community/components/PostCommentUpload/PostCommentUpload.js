import {useState, useRef} from 'react'
import axios from 'axios'
import address from "../../../address-info"
import "./PostCommentUpload.css"

function PostCommentUpload({updateArticleCommentsList, articleIdx, postComment}) {
    const [commentText, setCommentText] = useState("")
    const textArea = useRef()
    const onCommentChange = (e)=>{
        setCommentText(e.currentTarget.value)
    }

    const onClick = (e)=>{
        if(commentText.trim().length == 0)
            alert("내용을 입력해 주세요")
        else {
        axios.post(address.url + "/api/kauboard/community/add-comments",{articleIdx,commentText,stcode:JSON.parse(window.localStorage.getItem("loginInfo")).id})
        .then(res => {
            textArea.current.value = ""
            setCommentText("")
            updateArticleCommentsList(postComment+1)
        })}
        e.preventDefault()
    }

    return (
        <div className="post-comment-upload" >
        <input ref={textArea} type="text" className='post-text' placeholder="댓글을 입력하세요" onChange={onCommentChange}></input>
        <button className='post-button' onClick={onClick}></button>
    </div>
    );
}

export default PostCommentUpload;

