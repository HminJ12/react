import React, { useEffect } from 'react';

const CompTitle = () => {
  useEffect(()=>{
    console.log('--title Update');
  })
  return (
      <h1>Context와 최적화</h1>
  );
};

export default React.memo(CompTitle);