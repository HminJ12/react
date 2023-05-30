import { createContext, useLayoutEffect, useState } from "react";
import CompCurrent from "./components/compCurrent/CompCurrent";
import CompDaily from "./components/compDaily/CompDaily";
import CompHourly from "./components/compHourly/CompHourly";
import CompMap from "./components/compMap/CompMap";
import { fnGetAddress, fnGetLatLng, } from "./js/map";
import { fnGetWeatherData } from "./js/weather";


export const AppContext = createContext()
//export 다음에 import를 하면 안 된다!

function App() {
  const [_latLng, _setLatLng] = useState(null) //객체로 세팅, 위경도 
  const [_weatherData, _setWeatherData] = useState(null) //날씨 데이터
  const [_addressEn, _setAddressEn] = useState(null)
  const [_addressKo, _setAddressKo] = useState(null)


  //moment() 괄호 안에 아무것도 안 넣으면 현재 시간을 말한다 moment(Date.now())

  //위경도, 주소, 날씨 정보를 초기설정하는 함수 
  const fnAppInit = async () => {
    let latLngObj = await fnGetLatLng() //위도와 경도를 객체로 반환
    _setLatLng(latLngObj) //위경도 상태 설정

    let addressKo = await fnGetAddress(latLngObj, 'ko') //주소를 반환해주는 함수, 한글
    _setAddressKo(addressKo)
    let addressEn = await fnGetAddress(latLngObj, 'en') //주소를 반환해주는 함수, 영어
    _setAddressEn(addressEn)
    const weatherData = await fnGetWeatherData(latLngObj) //api비동기 통신으로 날씨정보를 반환
    _setWeatherData(weatherData)

  
    
  } //await을 못한다 컴포넌트에는 그래서 함수를 또 만든다 fnGetLatLng()를 실행하기 위해
  //weatherData 안에 다 들어있다 timezone

  useLayoutEffect(()=>{ //리얼돔이 구축된 후
    fnAppInit() //비동기로 위경도를 받아옴
  },[]) //랜더링이 시작되기 전에, 한단계 빨리 실행이 된다 비동기일 때는 의미가 없다 리얼돔으로 바뀌는 그 순간, 시점, 최적화 목적이다

  return (
    <AppContext.Provider value={{
      fnAppInit, 
      _latLng, _setLatLng, //위경도
      _weatherData, _setWeatherData, //날씨정보 
      _addressEn, _setAddressEn, _addressKo, _setAddressKo, //주소정보
    }}>
      <h1><img src={`${process.env.PUBLIC_URL}/img/main/title.png`} alt=""/></h1>
      <div className="app-inner">
        <CompCurrent/>
        <CompMap/>
        <CompHourly/>
        <CompDaily/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
