import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { fnSetWeatherInfo } from '../../js/weather';
import CompSvg from './CompSvg';

const CompCurrentOutput = () => {

  //_weatherData가 존재해야 출력이 되므로 바로 데이터를 사용할 수 있음
  const {
    fnAppInit, _weatherData, _addressEn, _addressKo, 
  } = useContext(AppContext)

  const {
    temp,
    icon, bg, desc,
    windDeg, windSpeed, humidity, rain, uvi, uviDesc, snow,
    sunrise, sunset, date, day, time, apm, feelsLike,
  } = fnSetWeatherInfo(_weatherData.current, _weatherData.timezone)

  const fnResetHandler = function () {
    let result = window.confirm('현재위치로 날씨정보를 갱신하시겠습니까?')
    if (result) fnAppInit()
  }


  return (
    <div className='current-output' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/weather/${bg}.jpg)` }}>

      <button className='reset' onClick={fnResetHandler}>
        <i className="fa-solid fa-arrows-rotate"></i>
      </button>

      <address>
        <span>[{ _addressKo} { _addressEn}]</span>
        <span>[{ _addressKo} { _addressEn}]</span>
      </address>
      <div className="circle-container">
        <div className="sunset">
          <CompSvg currentData={_weatherData.current} />
          <time className='rise-time'>
            {sunrise}
          </time>

          <time className='set-time'>
            {sunset}
          </time>
        </div>

        <div className='circle-container-inner'>
          <p className='temp'>
            <em>{temp}<sup>&#176;c</sup></em>
            <img src={`${process.env.PUBLIC_URL}/img/icons/${icon}.gif`} alt="" />
            <span>
              <i>체감</i>
              <b>{feelsLike}<sup>&#176;c</sup></b>
            </span>
          </p>
          <p className='desc'>" {desc} "</p>
          <p className='etc'>
            <span className='wind'>
              <i style={{ transform: `rotate(${windDeg - 45}deg)` }} className="fa-solid fa-location-arrow"></i>
              <i className="fa-solid fa-wind"></i>
              <b>{windSpeed}</b>
              <small>k/h</small>
            </span>

            <span className='humidity'>
              <i className="fa-solid fa-droplet"></i>
              <b>{humidity}</b>
              <small>%</small>
            </span>

            <span className='uvi'>
              <i className="fa-regular fa-sun"></i>
              <b>{uvi}</b>
              <small>{uviDesc}</small>
            </span>

            {
              (rain!==0)&&
              <span className='rain'>
                <i className="fa-solid fa-umbrella"></i>
                <b>{rain}</b>
                <small>mm</small>
              </span>
            }

            {
              (snow!==0)&&
              <span className='snow'>
                <i className="fa-solid fa-snowflake"></i>
                <b>{snow}</b>
                <small>mm</small>
              </span>
            }
          </p>

          <p className='time-date'>
            <time className='time'>
              <small>{apm}</small> {time}
            </time>
            <time className='date'>{date} ({day})</time>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompCurrentOutput;

//state가 변하면 다 바뀌기 때문에 변수를 사용할 수 있다