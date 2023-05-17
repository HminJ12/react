import React from 'react';
import CompSumLi from './CompSumLi';
let arrList = ['1','2','3']

const CompSumUl = ({_setShowUl, _point, _setPoint, _setShowModal}) => {
  return (
    <ul>
      {
        arrList.map((v,idx)=> <CompSumLi _setShowUl={_setShowUl} key={v} idx={idx} _point={_point} _setPoint={_setPoint} _setShowModal={_setShowModal}/>)
      }
    </ul>
  );
};

export default CompSumUl;