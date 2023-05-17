import React from 'react';
import CompList from './CompList';
import { useState } from 'react';
import { createContext } from 'react';
import CompAdd from './CompAdd';
import CompTime from './CompTime';

export const DDayContext = createContext()

const CompDDay = () => {
  const [_showComp, _setShowComp] = useState('list')
  return (
    <DDayContext.Provider value={{
      _showComp, _setShowComp //값이 'list'이면 CompList, 'add'면 CompAdd
    }}>
      <section className='dday'>
        <h2>D-DAY</h2>
        <CompTime/>
        {(_showComp === 'list') && <CompList />}
        {(_showComp === 'add') && <CompAdd/>} 
      </section>
    </DDayContext.Provider>
  );
};

export default CompDDay;