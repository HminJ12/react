import React, { useContext, useEffect } from 'react';
import CompLi from './CompLi';
import { AppContext } from '../App';

const CompUl = () => {
  const {_liCnt} = useContext(AppContext)
  
  const arr = [] //배열을 만들어야 한다 list를 반복하려고
  for(let i = 1; i <= _liCnt; i++){
    arr.push(i) //list마다 전부 다른 값이 들어가기만 하면 된다
  }  

  useEffect(()=>{
    console.log('--ul update');
  }) //업데이트 될 때마다

  return (
    <ul>
      {arr.map((v, i) => <CompLi i={i} key={v}/>)}
    </ul>
  );
};

export default CompUl;