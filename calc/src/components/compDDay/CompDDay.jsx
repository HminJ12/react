import React from 'react';
import CompList from './CompList';
import { useState } from 'react';
import { createContext } from 'react';
import CompAdd from './CompAdd';
import CompTime from './CompTime';
import { fnDDayArrInit } from '../../js/dday';

export const DDayContext = createContext()

const CompDDay = () => {
  const [_showComp, _setShowComp] = useState('list')
  const [_ddayArr, _setDdayArr] = useState(fnDDayArrInit())  //원본 배열
  const [_ddayOutputArr, _setDdayOutputArr] = useState(_ddayArr) //출력용 배열



  return (
    <DDayContext.Provider value={{
      _showComp, _setShowComp, //값이 'list'이면 CompList, 'add'면 CompAdd
      _ddayArr, _setDdayArr, //dday 일정(객체)를 담고 있는 배열 
      _ddayOutputArr, _setDdayOutputArr, //dday 일정을 가공해서 출력할 배열
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