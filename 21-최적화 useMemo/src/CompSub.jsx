import React from 'react';

const CompSub = ({n2, _setN2}) => {
  return (
    <div>
      <p>n2 : {n2}</p>
      <button onClick={()=>{_setN2(p => p-1)}}>감소</button>
    </div>
  );
};

export default CompSub;