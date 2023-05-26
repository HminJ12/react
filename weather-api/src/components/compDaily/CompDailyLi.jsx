import React, { useContext } from 'react';
import { fnSetWeatherInfo } from '../../js/weather';
import { AppContext } from '../../App';

const CompDailyLi = ({data}) => { //data는 객체
  const {_weatherData} = useContext(AppContext)

  const{
    day, mmdd, 
    desc, icon, 
    tempMin, tempMax, tempMorn, tempDay, tempNight,
    rain, snow,
  } = fnSetWeatherInfo(data, _weatherData.timezone) //출력용 함수


  return (
    <li>
      <a href='#'>
        <p className='date'>
          <span><i className="fa-regular fa-calendar-days"></i> {mmdd} ({day})</span>
          <span className='desc'>"{desc}"</span>
          <i className="fa-solid fa-arrow-down"></i>
        </p>
        <p className='info'>
          <img src={`${process.env.PUBLIC_URL}/img/icons/${icon}.gif`} alt="" />
          <span className='temp'>
            <i className="fa-solid fa-temperature-three-quarters"></i>
            <em>{tempMin} / {tempMax}<sup>&#176;c</sup></em>
          </span>

          {
            (rain!==0)&&
            <span>
              <i className="fa-solid fa-umbrella"></i>
              <em>{rain} mm</em>
            </span>
          } 

          {
            (snow!==0)&&
            <span>
              <i className="fa-solid fa-snowflake"></i>
              <em>{snow} mm</em>
            </span>
          }

        </p>
      </a>

      <div className="detail">
        detail
      </div>
    </li>
  );
};

export default CompDailyLi;