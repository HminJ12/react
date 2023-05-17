import React, { useEffect } from 'react';


const CompBtn = ({_setN}) => {
  useEffect(()=>{
    console.log('--button Update');
  })

  return (
    <button onClick={()=>{_setN(p => p + 1)}}>증가</button>
  );
};

export default React.memo(CompBtn);