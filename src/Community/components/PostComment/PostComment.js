import axios from "axios"
import address from "../../../address-info"
import "./PostComment.css"


function PostComment({comment, updateArticle, articleUpdateCount}) {
    const KR_TIME_DIFF = 9*60*60*1000
    const commentTime = new Date((new Date(comment.time)).getTime() - KR_TIME_DIFF)
    const dateDiff = Date.now() - commentTime
    const newTimeFormat = (Math.ceil(dateDiff/(1000*60*60)) > 24) ? 
                (new Date()).getMonth()+"/"+(new Date()).getDate() 
                        : (commentTime).getHours()+":"+(commentTime).getMinutes()

    const onCommentDelete = (e)=>{
        const deleteCheck = window.confirm("정말로 댓글을 삭제하시겠습니까?")
        if(deleteCheck){
        axios.post(address.url + "/api/kauboard/community/delete-comment", {idx : comment.idx})
        .then(res=>{
            updateArticle(articleUpdateCount+1)
        })}
    }
    
    return (
        <div className="post-comment">
            <div className="header">
            <div className="user-data">
            <img src='./person.png' alt='person'/>
            <h6 className='nickname'>{comment.nickname}</h6>
            </div>
            <ul className="modify-comment">
                <li className="delete" onClick={onCommentDelete}>삭제</li>
            </ul>
            </div>
            <h6 className='comment-text'>{comment.commentText}</h6>
            <h6 className="time">{newTimeFormat}</h6>
    </div>
    );
}

export default PostComment;

