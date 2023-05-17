import React, { useContext } from 'react';
import CompLi from './CompLi';
import { AppContext } from '../App';



const CompUl = () => {
  const {_reset, _listCnt} = useContext(AppContext)
  
  const listArr = []
  for(let i = 1; i <= _listCnt; i++){
    listArr.push(i)
  }


  return (
    <ul key={_reset}>
      {
        //[<CompLi/>,<CompLi/>,<CompLi/>]
        listArr.map((v, i)=><CompLi key={v} i={i}/>)
      }
    </ul>
  );
};

export default CompUl;