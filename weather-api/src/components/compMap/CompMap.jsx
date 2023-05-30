import React, { useContext, useLayoutEffect, useState } from 'react';
import { AppContext } from '../../App';
import { fnGetAddress, fnInitMap } from '../../js/map';
import CompLoader from '../compLoader/CompLoader';
import { fnGetWeatherData } from '../../js/weather';


const CompMap = () => {
  const [_isActive, _setIsActive] = useState(false)
  const {_latLng, _setWeatherData, _setAddressEn,_setAddressKo,} = useContext(AppContext)

  
  //fnInitMap의 파라미터로 전달되어서 클릭이벤트내에서 호출될 함수, 세팅은 여기서
  const fnMapClickHandler = async function(latLngObj){
    let addressEn = await fnGetAddress(latLngObj, 'en') //주소를 반환해주는 함수
    _setAddressEn(addressEn)
    let addressKo = await fnGetAddress(latLngObj, 'ko') //주소를 반환해주는 함수
    _setAddressKo(addressKo)
    const weatherData = await fnGetWeatherData(latLngObj)
    _setWeatherData(weatherData)
    _setIsActive(false)
    document.querySelector(`.app-inner`).scrollTo({top:0, behavior:'smooth'})
    document.querySelectorAll(`.section-inner`).forEach((el)=>{
      el.scrollTo({top:0, left:0, behavior:'smooth'})
    })
  }

  useLayoutEffect(()=>{
    (_latLng) && fnInitMap(_latLng, fnMapClickHandler)
  },[_latLng])

  return (
    <section className={`comp-map  ${_isActive && 'active'}`}>
      <div className="btns">
        <button onClick={()=>{_setIsActive(true)}}><i className="fa-solid fa-map-location-dot"></i></button>
        <button onClick={()=>{_setIsActive(false)}}><i className="fa-solid fa-xmark"></i></button>
      </div>
      <div className='section-inner'>
        {
          (_latLng)?  //위경도가 출력되면
          <div id="map"></div> 
          : 
          <CompLoader/>
        }
      </div>
    </section>
  );
};

export default CompMap;