import { useEffect, useState } from 'react';
import PostComment from './comments/PostComment.jsx';
import './PostShow.css';
import PostDelete from './PostDelete.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postShowThunk } from '../../store/thunks/postShowThunk.js';
import { clearPostShow } from '../../store/slices/postShowSlice.js';
import { postLikeShowThunk } from '../../store/thunks/postLikeShowThunk.js';

export default function PostsShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { show } = useSelector(state => state.postShow);
  const [openDeleteFlg, setOpenDeleteFlg] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [heartFlg, setHeartFlg] = useState(false);

  useEffect(() => {
    async function test() {
      const result = await dispatch(postShowThunk(id));
      setLikeCnt(result.payload.cnt);
      setHeartFlg(result.payload.likeFlg)
      if(result.type.endsWith('/rejected')) {
        alert('없는 페이지입니다.')
        navigate('/posts')
      }
    }
    test()
    return () => {
      dispatch(clearPostShow());
    }
  }, [])


  function openDeleteModal() {
    setOpenDeleteFlg(true);
  }
  function closeDeleteModal() {
    setOpenDeleteFlg(false);
  }
  

  const toggleHeart = async () => {
    const result = await dispatch(postLikeShowThunk(id)).unwrap();
    console.log(result)
    const {cnt, likeStatus} = result.data
    setHeartFlg(likeStatus);
    setLikeCnt(cnt);
  }

    
  return (
    <>
      {
        show && (
          <div className="post-show-container">
            <div className="post-show-post-box bottom-line">
              <img className="post-show-post-img" src={`${show.image}`}></img>
              <div className="post-show-post-info-items">
                <div className="icon-delete" onClick={openDeleteModal} ></div>
                <div className="post-show-post-likes-items">
                  <p>{likeCnt}</p>
                    <div className={heartFlg ? 'icon-heart-fill' : 'icon-heart-empty'} onClick={toggleHeart}></div>
                </div>
              </div>
              <textarea className="post-show-post-constent" defaultValue={show.content}></textarea>
            </div>
            <PostComment id={ id } comments={ show.comments } /> 
          </div>
        )
      }
      {
        openDeleteFlg && <PostDelete id={ id } setCloseDeleteModal={closeDeleteModal} />
      }
    </>
  )
}