import React, { useContext, useEffect } from 'react';
import { AppContext } from './App';

const CompOutput = () => {
  useEffect(()=>{
    console.log('--output Update');
  })
  const {_n} = useContext(AppContext)
  return (
    <div>
      _n : {_n}
    </div>
  );
};

export default CompOutput;