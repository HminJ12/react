import React from 'react';
import { btnsArr } from '../../js/btns';
import CompBtn from './CompBtn';

const CompBtnContainer = () => {
  return (
    <ul className="btn-container">
      {
        btnsArr.map(v => <CompBtn key={v.id} data={v} />)
      }
    </ul>
  );
};

export default CompBtnContainer;