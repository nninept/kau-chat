import "./PostComment.css"


function PostComment({comment}) {
    const KR_TIME_DIFF = 9*60*60*1000
    const commentTime = new Date((new Date(comment.time)).getTime() - KR_TIME_DIFF)
    const dateDiff = Date.now() - commentTime
    const newTimeFormat = (Math.ceil(dateDiff/(1000*60*60)) > 24) ? 
                (new Date()).getMonth()+"/"+(new Date()).getDate() 
                        : (commentTime).getHours()+":"+(commentTime).getMinutes()
    
    
    return (
        <div className="post-comment">
            <div className="user-data">
            <img src='./person.png' alt='person'/>
            <h6 className='nickname'>{comment.nickname}</h6>
            </div>
            <h6 className='comment-text'>{comment.commentText}</h6>
            <h6 className="time">{newTimeFormat}</h6>
    </div>
    );
}

export default PostComment;

