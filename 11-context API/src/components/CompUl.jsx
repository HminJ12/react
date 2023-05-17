import React, { useContext } from 'react';
import CompLi from './CompLi';
import { AppContext } from '../App';

const listArr = ['key1','key2','key3']


const CompUl = () => {
  const {_reset} = useContext(AppContext)
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