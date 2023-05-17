import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import CompLi from './CompLi';


const CompHome = () => {
  const {_todoArr} = useContext(AppContext)
  const navi = useNavigate()
  
  return (
    <>
      <h2>Home</h2>
      <ul>
        {
          (_todoArr.length === 0)? <li>등록된 일정이 없습니다</li> : _todoArr.map(v=><CompLi key={v.id} title={v.title} id={v.id}/>)
        } {/* key값은 prop으로 줄 수 없어서 id를 따로 prop을 준다 */}
      </ul>
      <hr />
      <button onClick={()=>{navi('/add')}}>목록추가</button>
    </>
  );
};

export default CompHome;