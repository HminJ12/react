import React, { useContext } from 'react';
import $ from 'jquery';
import { fnSetWeatherInfo } from '../../js/weather';
import { AppContext } from '../../App';

const CompDailyLi = ({ data }) => { //data는 객체
  const { _weatherData } = useContext(AppContext)

  const {
    day, mmdd,
    desc, icon, uvi, uviDesc, windDeg, windSpeed,
    tempMin, tempMax, tempMorn, tempDay, tempNight,
    rain, snow, feelsLike, clouds, humidity, pressure,
  } = fnSetWeatherInfo(data, _weatherData.timezone) //출력용 함수

  const fnAccordion = function(e){
    e.preventDefault()
    $(`.comp-daily li .detail`).stop().slideUp()
    $(e.currentTarget).siblings('.detail').stop().slideToggle()
    $(`.comp-daily li a`).not($(e.currentTarget)).removeClass('active')
    $(e.currentTarget).toggleClass('active')
  } // $(e.currentTarget) -> $(this)이다  

  return (
    <li>
      <a onClick={fnAccordion} href='#'>
        <p className='date'>
          <span><i className="fa-regular fa-calendar-days"></i> {mmdd} ({day})</span>
          <span className='desc'>"{desc}"</span>
        </p>
        <p className='info'>
          <img src={`${process.env.PUBLIC_URL}/img/icons/${icon}.gif`} alt="" />
          <span className='temp'>
            <i className="fa-solid fa-temperature-three-quarters"></i>
            <em>{tempMin} / {tempMax}<sup>&#176;c</sup></em>
          </span>

          {
            (rain !== 0) &&
            <span>
              <i className="fa-solid fa-umbrella"></i>
              <em>{rain} mm</em>
            </span>
          }

          {
            (snow !== 0) &&
            <span>
              <i className="fa-solid fa-snowflake"></i>
              <em>{snow} mm</em>
            </span>
          }

        </p>
        <i className="fa-solid fa-arrow-down"></i>
      </a>

      <div className="detail">
        <p>
          <span>
            <i className="fa-solid fa-temperature-low"></i>
            <b>체감온도</b>
            <em>{feelsLike}<small>&#176;c</small></em>
          </span>
        </p>

        <p>
          <span>
            <i className="fa-solid fa-circle-arrow-up"></i>
            <b>풍향</b>
            <em>{windDeg}<small>&#176;</small></em>
          </span>

          <span>
            <i className="fa-solid fa-wind"></i>
            <b>풍속</b>
            <em>{windSpeed}<small>m/s</small></em>
          </span>
        </p>

        <p>
          <span>
            <i className="fa-solid fa-cloud"></i>
            <b>구름량</b>
            <em>{clouds}<small>%</small></em>
          </span>
        </p>

        <p>
          <span>
            <i className="fa-solid fa-droplet"></i>
            <b>습도</b>
            <em>{humidity}<small>%</small></em>
          </span>
        </p>

        <p>
          <span>
            <i className="fa-solid fa-temperature-arrow-down"></i>
            <b>기압</b>
            <em>{pressure}<small>hPa</small></em>
          </span>
        </p>

        <p>
          <span>
            <i className="fa-solid fa-sun-plant-wilt"></i>
            <b>자외선</b>
            <em>{uvi}, ({uviDesc})</em>
          </span>
        </p>
      </div>
    </li>
  );
};

export default CompDailyLi;