import React from 'react';

const CompSum = ({n1, _setN1}) => {
  return (
    <div>
      <p>n1 : {n1}</p>
      <button onClick={()=>{_setN1(p => p + 1)}}>증가</button>
    </div>
  );
};

export default CompSum;