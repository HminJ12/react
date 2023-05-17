import React, { useContext } from 'react';
import { AppContext } from '../App';
import CompLi from './CompLi';
import { Link } from 'react-router-dom';

const CompMain = () => {
  const {_orgArr, _todoArr, _setTodoArr} = useContext(AppContext)


  const fnSearchHandler = function(e){
    e.preventDefault()
    const keyword = document.querySelector(`input`).value;
    const filterArr = [..._orgArr].filter(v=>{
      return v.title.match(keyword) //특정 단어 들어있는지 찾는다, 배열이 나온다
    }) //검색하는데 필요한 원래 배열 복제해서 새배열로 가져온다
    _setTodoArr(filterArr) //원본배열은 건드리지 않는다
  }

  return (
    <main>
      <h2>일정목록</h2>
      <ul>
        {
          _todoArr.map(v => <CompLi key={v.id} title={v.title} id={v.id} />) //[<CompLi>,<CompLi>]
        }
      </ul>
      <hr />
      <Link to="/add">일정추가</Link>
      <hr />
      <form onSubmit={fnSearchHandler}>
        <input type="text" />
        <button style={{display:'none'}}></button> {/* submit 일어나게 하려고 */}
      </form>
      <button onClick={()=>{_setTodoArr(_orgArr)}}>전체목록</button>
    </main>
  );
};

export default CompMain;