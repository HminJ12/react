import React from 'react';

const CompModal = ({_pointArr}) => {

  return (
    <div className='modal'>
      점수 : 
      {
        _pointArr.filter(v=>v==="정답").length
      }
    </div>
  );
};

export default CompModal;