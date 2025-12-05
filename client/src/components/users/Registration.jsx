import { useState } from 'react';
import './Registration.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userCreateThunk, userImageUploadThunk } from '../../store/thunks/userCreateThunk.js';

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordChk, setPasswordChk] = useState('');
    const [nick, setNick] = useState('');    
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

  async function handleCreate(e) {
    e.preventDefault();

    try {
      const resultUpload = await dispatch(userImageUploadThunk(file)).unwrap();
      const profile = resultUpload.data.path;

      await dispatch(userCreateThunk({ email, profile, password, passwordChk, nick })).unwrap();

      alert('회원가입에 성공했습니다.\n다시 로그인하여 주십시오.')

      // 로그인 페이지로 이동
      return navigate(`/login`, {replace: true});
    } catch (error) {
      console.log('회원가입', error);
      alert(error)
    }
  }

  // 파일 변경시 처리 함수
  function changeFiles(e) {
    // 선택 파일 정보 획득(1개의 파일만 올리는걸 전제)
    const file = e.target.files[0];

    // 미리보기
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => { setPreview(fileReader.result) });
    
    setFile(file);
  }

  return (
    <>
      <form className="registration-container" onSubmit={handleCreate}>
        <input type="email" className='input-big-border' onChange={e => setEmail(e.target.value)} placeholder='email' />
        <input type="password" className='input-big-border' onChange={e => setPassword(e.target.value)} placeholder='password' />
        <input type="password" className='input-big-border' onChange={e => setPasswordChk(e.target.value)} placeholder='password check' />
        <input type="text" className='input-big-border' onChange={e => setNick(e.target.value)}  placeholder='name' />
        <input type="file" onDrop={changeFiles} onChange={changeFiles} accept="image/*" />
        {
          preview && (<div className="profile profile-medium" style={{backgroundImage: `url("${preview}")`}}></div>)
        }
        <button type="submit" className="btn-big bg-gray">Sign up</button>
      </form>
    </>
  )
}