import React, { useContext } from 'react';
import CompHour from './CompHour';
import CompMin from './CompMin';
import CompSec from './CompSec';
import { AppContext } from '../App';

const CompClock = () => {
  const {_hour, _min, _year, _mon, _date, _day}= useContext(AppContext)
  const dayArr = ['일','월','화','수','목','금','토']
  

  let n
  if(_hour >= 12){n='pm'}
  if(_hour < 12){n='am'}

  return (
    <div className='clock'>
      <CompHour/>
      <CompMin/>
      <CompSec/>
      <div className='digital'>{_hour}:{_min}{n}</div>
      <div className='year'>{_year}-{_mon+1}-{_date}-({dayArr[_day]})</div>
    </div>
  );
}

export default CompClock;