import React, { useEffect, useState } from 'react';

const CompInterval = () => {
  const [_num, _setNum] = useState(0)
  
  useEffect(()=>{
    const intervalID = setInterval(() => {
      _setNum(prev => prev + 1)
      console.log('t');
    }, 1000)  
    return (()=>{
      clearInterval(intervalID)
    })
  },[])

  return (
    <p>setInterval : {_num}</p>
  );
};

export default CompInterval;