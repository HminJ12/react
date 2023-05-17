import React, { useContext } from 'react';
import { AppContext } from '../App';
import CompLi from './CompLi';
import { Link } from 'react-router-dom';

const CompMain = () => {
  const {_orgArr, _setOrgArr, _outputArr, _setOutputArr} = useContext(AppContext)
  
  const fnSearchHandler = function(e){
    e.preventDefault()
    let arr = [..._orgArr]
    const keyword = document.querySelector(`input`).value
    arr = (keyword)? arr.filter(v=> v.title.match(keyword)) : _orgArr
    _setOutputArr(arr) //_outputArr를 바꾸는 거
  } //v는 일정

  const fnSortHandler = function(e){
    const sortKey = e.target.value
    let arr = [..._orgArr]
    if(sortKey === 'new'){
      arr = arr.reverse()
    }else if(sortKey === 'date'){
      arr.sort((a,b)=>{
        let aTime = a.date+a.time
        let bTime = b.date+b.time
        if(aTime > bTime) return 1
        if(aTime < bTime) return -1
        if(aTime === bTime) return 0
      }) 
    }else if(sortKey === 'title'){
      arr.sort((a,b)=>{
        if(a.title > b.title) return 1
        if(a.title < b.title) return -1
        if(a.title === b.title) return 0
      })
    }
    _setOutputArr(arr)
  }

  return (
    <>
      {
        (_outputArr.length !== 0 )?  <ul>{_outputArr.map(v => <CompLi key={v.id} id={v.id} title={v.title}/>)}</ul> :  <p>등록된 일정이 없습니다</p> 
      }
      <hr />
      <Link to={'/add'}>일정추가하기</Link>
      <hr />
      <form onSubmit={fnSearchHandler}>
        <input type="text"/>
        <button style={{display : 'none'}}></button> {/* 엔터치면 새로고침이 일어난다 */}
      </form>
      <hr />
      <select onChange={fnSortHandler}>
        <option value="old">등록순</option> {/* 기본이 등록순이다 */}
        <option value="new">최신순</option>
        <option value="date">일짜순</option>
        <option value="title">제목순</option>
      </select>
    </>
  );
};

export default CompMain;

//map, filter 사용해서 배열 가져오기 (createContext 먼저 사용 후 useContext로 호출한다) 배열 공부하기!
//return문 안에서는 jsx만 사용할 수 있어서 스크립트 쓰려면 중괄호{}를 사용해야 한다
//li 만들기 배열만큼 li가 생긴다 반복 배열로 나온 객체는 key값을 달아줘야 한다
// v는 배열 안의 객체{}를 말한다
// 글자정렬