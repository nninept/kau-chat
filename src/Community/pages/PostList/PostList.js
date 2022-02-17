import {useState, useEffect} from 'react'
import PostSummary from '../../components/PostSummary/PostSummary';
import PostUpload from '../../components/PostUpload/PostUpload';
import axios from 'axios'
import "./PostList.css"
import address from "../../../address-info"

function PostList({match}) {
    const [postList, setPostList] = useState([])
    const [postArticle, setPostArticle] = useState(0)

    useEffect(()=>{
        axios.get(address.url + "/api/kauboard/community/get-articles")
        .then(res=>setPostList(res.data.result))
    },[postArticle])


    return (
        <div className="post-list">
            <div className='post-container'>
            <PostUpload updateArticleList={setPostArticle} postArticle={postArticle}/>
            {postList ? postList.map((elem,idx)=>{
                return <PostSummary post={elem} key={idx}/>
            }) : <h1>Loading</h1>}
            </div>
    </div>
    );
}

export default PostList;

