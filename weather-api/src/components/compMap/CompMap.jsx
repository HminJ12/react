import React, { useContext, useLayoutEffect } from 'react';
import { AppContext } from '../../App';
import { fnGetAddress, fnInitMap } from '../../js/map';
import CompLoader from '../compLoader/CompLoader';
import { fnGetWeatherData } from '../../js/weather';


const CompMap = () => {
  const {_latLng, _setWeatherData, _setAddress} = useContext(AppContext)

  
  //fnInitMap의 파라미터로 전달되어서 클릭이벤트내에서 호출될 함수, 세팅은 여기서
  const fnMapClickHandler = async function(latLngObj){
    let address = await fnGetAddress(latLngObj) //주소를 반환해주는 함수
    _setAddress(address)
    const weatherData = await fnGetWeatherData(latLngObj)
    _setWeatherData(weatherData)
  }

  useLayoutEffect(()=>{
    (_latLng) && fnInitMap(_latLng, fnMapClickHandler)
  },[_latLng])

  return (
    <section className='comp-map'>
      <div className='section-inner'>
        {
          (_latLng)?  
          <div id="map"></div> 
          : 
          <CompLoader/>
        }
      </div>
    </section>
  );
};

export default CompMap;