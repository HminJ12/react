import React, { useEffect } from 'react';

console.log(`--Compbtn outside`);
const Compbtn = ({_setN}) => {
  console.log(`--Compbtn inside 업데이트 시작`);

  useEffect(()=>{
    console.log(`--Compbtn inside 업데이트 완료`);
  })

  return (
    <button onClick={e=>{_setN(prev=>prev+1)}}>
      버튼
    </button>
  );
};

export default Compbtn;