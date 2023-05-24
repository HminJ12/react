import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { fnSetWeatherInfo } from '../../js/weather';

const CompCurrentOutput = () => {

  //_weatherData가 존재해야 출력이 되므로 바로 데이터를 사용할 수 있음
  const {_weatherData, _address} = useContext(AppContext)

  const {temp} = fnSetWeatherInfo(_weatherData.current)
  

  return (
    <div className='current-output' style={{backgroundImage:`url(${process.env.PUBLIC_URL}/img/weather/Clear.jpg)`}}>
    
      <address>{_address}</address>
      <div className="circle-container">
        <div className="circle-inner">
          {temp}
        </div>
      </div>
    </div>
  );
};

export default CompCurrentOutput;

//state가 변하면 다 바뀌기 때문에 변수를 사용할 수 있다