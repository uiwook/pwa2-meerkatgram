import { useDispatch } from 'react-redux';
import './PostDelete.css';
import { postDeleteThunk } from '../../store/thunks/postDeleteThunk.js';
import { useNavigate } from 'react-router-dom';

export default function PostDelete({id, setCloseDeleteModal}) {
const dispatch = useDispatch();
const navigate = useNavigate();

async function del (e) {
  e.preventDefault();
  
  try {
    await dispatch(postDeleteThunk(id)).unwrap();
    return navigate('/posts', { replace: true });
  } catch (error) {
    console.log('삭제 실패', error)
    alert('삭제 실패')
  }
}  

  return (
    <>
      <form className="post-delete-container" onSubmit={del}>
        <div className="post-delete-content-box bg-light">
          <div className="post-delete-content-info">
            <p>삭제된 게시글은 되돌릴 수 없습니다.{id}</p>
            <br />
            <p>정말 삭제하시겠습니까?</p>
          </div>
          <div className="post-delete-btn-box">
            <button type="submit" className='btn-medium bg-dark'>Delete</button>
            <button type="button" className='btn-medium bg-gray' onClick={setCloseDeleteModal}>Cancel</button>
          </div>
        </div>
      </form>
    </>
  )
}