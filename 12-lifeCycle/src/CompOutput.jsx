import React, { useEffect } from 'react';

console.log(`--CompOutput outside`);
const CompOutput = ({_n}) => {
  console.log(`--CompOutput inside 업데이트 시작`);

  useEffect(()=>{
    console.log(`--CompOutput inside 업데이트 완료`);
  })
  
  return (
    <p>{_n}</p>
  );
};

export default CompOutput;