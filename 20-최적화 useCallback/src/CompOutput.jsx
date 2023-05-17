import React, { useEffect } from 'react';

const CompOutput = ({_n}) => {

  useEffect(()=>{
    console.log('--Output Update');
  }) //뭔가 바뀔 때마다(state가 변경될 때마다)
  
  return (
    <p>
      _n : {_n}
    </p>
  );
};

export default CompOutput;