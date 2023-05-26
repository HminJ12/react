import React, { useContext, useEffect } from 'react';
import $ from 'jquery';
import { AppContext } from '../../App';
import CompLoader from '../compLoader/CompLoader';
import CompDailyLi from './CompDailyLi';

const CompDaily = () => {

  const { _weatherData } = useContext(AppContext)


  return (
    <section className='comp-daily'>
      <div className='section-inner'>
        <h2>Daily</h2>
        <ul>
          {
            (_weatherData) ?
              _weatherData.daily.map(v => <CompDailyLi key={v.dt} data={v} />)
              :
              <CompLoader />
          }
        </ul>
      </div>
    </section>
  );
};

export default CompDaily;

//data는 객체이다