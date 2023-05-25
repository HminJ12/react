import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { fnSetWeatherInfo } from '../../js/weather';
import CompSvg from './CompSvg';

const CompCurrentOutput = () => {

  //_weatherData가 존재해야 출력이 되므로 바로 데이터를 사용할 수 있음
  const {fnAppInit, _weatherData, _address } = useContext(AppContext)

  const { 
    temp, 
    sunriseHours, sunriseMinutes, sunriseApm, 
    sunsetHours, sunsetMinutes, sunsetApm, 
    icon, bg, desc, windDeg, windSpeed, humidity, rain, uvi, uviDesc,
    hour, apm, min, year, month, date, day
  } = fnSetWeatherInfo(_weatherData.current)

  const fnResetHandler = function(){
    let result = window.confirm('현재위치로 날씨정보를 갱신하시겠습니까?')
    if(result) fnAppInit()
  }


  return (
    <div className='current-output' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/weather/${bg}.jpg)` }}>

      <button className='reset' onClick={fnResetHandler}>
        <i className="fa-solid fa-arrows-rotate"></i>
      </button>

      <address>
        <span>{_address}</span>
        <span>{_address}</span>
      </address>
      <div className="circle-container">
        <div className="sunset">
          <CompSvg currentData={_weatherData.current} />
          <time className='rise-time'>
            <small>{sunriseApm}</small>
            <b>{sunriseHours}:</b>
            <b>{sunriseMinutes}</b>
          </time>

          <time className='set-time'>
            <small>{sunsetApm}</small>
            <b>{sunsetHours}:</b>
            <b>{sunsetMinutes}</b>
          </time>
        </div>

        <div className='circle-container-inner'>
          <p className='temp'>
            <em>{temp}<sup>&#176;c</sup></em>
            <img src={`${process.env.PUBLIC_URL}/img/icons/${icon}.gif`} alt="" />
            <span>
              <i>체감</i>
              <b>23<sup>&#176;c</sup></b>
            </span>
          </p>
          <p className='desc'>" {desc} "</p>
          <p className='etc'>
            <span className='wind'>
              <i style={{transform:`rotate(${windDeg-45}deg)`}} className="fa-solid fa-location-arrow"></i>
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

            <span className='rain'>
              <i className="fa-solid fa-umbrella"></i>
              <b>{rain}</b>
              <small>mm</small>
            </span>
          </p>

          <p className='time-date'>
            <time className='time'>{hour}:{min} {apm}</time>
            <time className='date'>{year}년 {month}월 {date}일 {day}</time>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompCurrentOutput;

//state가 변하면 다 바뀌기 때문에 변수를 사용할 수 있다