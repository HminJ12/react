import React, { useContext, useLayoutEffect } from 'react';
import { AppContext } from '../../App';
import { fnInitMap } from '../../js/map';
import CompLoader from '../compLoader/CompLoader';


const CompMap = () => {
  const {_latLng, _setLatLng,} = useContext(AppContext)

  //fnInitMap의 파라미터로 전달되어서 클릭이벤트내에서 호출될 함수 
  const fnMapClickHandler = function(n){
    alert(n)
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