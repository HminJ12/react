import React, { useEffect } from 'react';

const CompTitle = () => {

  useEffect(()=>{
    console.log('--Title Update');
  }) //뭔가 바뀔 때마다(state가 변경될 때마다)

  return (
    <h1>
      Memo 최적화
    </h1>
  );
};

export default React.memo(CompTitle);