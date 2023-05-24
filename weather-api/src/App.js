import { createContext, useLayoutEffect, useState } from "react";
import CompCurrent from "./components/compCurrent/CompCurrent";
import CompDaily from "./components/compDaily/CompDaily";
import CompHourly from "./components/compHourly/CompHourly";
import CompMap from "./components/compMap/CompMap";
import { fnGetAddress, fnGetLatLng } from "./js/map";
import { fnGetWeatherData } from "./js/weather";

export const AppContext = createContext()

function App() {
  const [_latLng, _setLatLng] = useState(null) //객체로 세팅, 위경도 
  const [_weatherData, _setWeatherData] = useState(null) //날씨 데이터
  const [_address, _setAddress] = useState(null)

  //위경도, 주소, 날씨 정보를 초기설정하는 함수 
  const fnAppInit = async () => {
    let latLngObj = await fnGetLatLng() //위도와 경도를 객체로 반환
    _setLatLng(latLngObj) //위경도 상태 설정
    let address = await fnGetAddress(latLngObj) //주소를 반환해주는 함수
    _setAddress(address)
    const weatherData = await fnGetWeatherData(latLngObj) //api비동기 통신으로 날씨정보를 반환
    console.log(weatherData);
    _setWeatherData(weatherData)
    
  } //await을 못한다 컴포넌트에는 그래서 함수를 또 만든다 fnGetLatLng()를 실행하기 위해

  useLayoutEffect(()=>{ //리얼돔이 구축된 후
    fnAppInit() //비동기로 위경도를 받아옴
  },[]) //랜더링이 시작되기 전에, 한단계 빨리 실행이 된다 비동기일 때는 의미가 없다 리얼돔으로 바뀌는 그 순간, 시점, 최적화 목적이다

  return (
    <AppContext.Provider value={{_latLng, _setLatLng, _weatherData, _setWeatherData, _address, _setAddress}}>
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
