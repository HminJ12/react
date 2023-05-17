import React, { useEffect } from 'react';

console.log(`--CompTitle outside`);
const CompTitle = () => {
  console.log(`--CompTitle inside 업데이트 시작`);

  useEffect(()=>{
    console.log(`--CompTitle inside 업데이트 완료`);
  })

  return (
    <h1>Life Cycle</h1>
  );
};

export default CompTitle;