import React, { useContext } from 'react';
import { fnSetWeatherInfo } from '../../js/weather';
import { AppContext } from '../../App';

const CompHourlyLi = ({data}) => {
  const {_weatherData} = useContext(AppContext)
  const {
    hhmm, mmdd,
    rain, snow,
    icon,
  } = fnSetWeatherInfo(data, _weatherData.timezone)
  

  return (
    <li>
      <p>
        <img src={`${process.env.PUBLIC_URL}/img/icons/${icon}.gif`} alt="" />
      </p>
      <p>
        {mmdd}
      </p>
      <p>
        {hhmm}
      </p>
      <p>
        {
          (rain !== 0)&& <><i className="fa-solid fa-umbrella"></i> {rain} </>
        }
        {
          (snow !== 0)&& <><i className="fa-solid fa-snowflake"></i> {snow} </>
        }
      </p>
    </li>
  );
};

export default CompHourlyLi;