import React, { useContext } from 'react';
import { AppContext } from './App';

const CompBtn = () => {
  const {_listArr, _setListArr} = useContext(AppContext)

  const fnAddListHandler = function(){
    const obj = {}
    obj.key = Date.now()
    /*     
    const listArr = [..._listArr]
    listArr.push('') 
    */
    
    //_setListArr([..._listArr,''])

    _setListArr(c => [...c, obj]) //현재 배열을 풀어서 다음에 ''를 추가한다 
    //_setListArr((c) => {return [...c, '']})


  }

  return (
    <button onClick={fnAddListHandler}>
      추가하기
    </button>
  );
};

export default CompBtn;

/* 
공부해오기 배열 추가 하는 거!!!
로컬스토리지 52-56강

now.Date()
Date
버튼을 눌렀을 때 추가가 먼저다

배열을 이용해 map을 한다
배열이 필요하다
여러값을 출력하려면 */
