import {useState} from 'react'
import axios from 'axios'
import address from '../../../address-info'
import "./PostUpload.css"

function PostUpload({updateArticleList}) {
    const [isPostClicked, setIsPostClicked] = useState(false)
    const [title, setTitle] = useState(null)
    const [contents, setContents] = useState(null)
    const onTitleClick = (e)=>{
        setIsPostClicked(!isPostClicked)
    }

    const onTitleChange = (e)=>{
        setTitle(e.currentTarget.value)
    }

    const onContentsChange = (e)=>{
        setContents(e.currentTarget.value)
    }

    const onButtonClick = ()=>{
        axios.post(address.url + "/api/kauboard/community/add-article",{title,contents,stcode:JSON.parse(window.localStorage.getItem("loginInfo")).id})
        .then(res => {
            setIsPostClicked(false)
            updateArticleList()

        })
    }

    return (
        <div className="post-upload">
        {isPostClicked ? <>
        <input type="title" className='post-textarea post-focus-title' placeholder="제목" onChange={onTitleChange}></input>
        <textarea className='post-textarea post-content' placeholder="새 글을 작성해주세요!" onChange={onContentsChange}></textarea></>
        :
        <input type="title" className='post-textarea post-unfocus-title' placeholder="새 글을 작성해주세요!" onFocus={onTitleClick}></input> }
        <button onClick={onButtonClick}>Post</button>
        </div>);
}

export default PostUpload;

