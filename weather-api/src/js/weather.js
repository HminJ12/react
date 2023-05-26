import moment from "moment-timezone";
import { codeEnArr, codeKrArr } from "./conditionCode";

export const fnGetWeatherData = function(latLngObj){
  return new Promise((resolve)=>{
    const {lat, lng} = latLngObj
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`
    fetch(url) //외부데이터 가져올 때 사용하는 내장함수
      .then((data)=>{
        resolve(data.json()) //다음 함수를 실행하게 해준다
      }) 
      .catch(()=>{
        alert('날씨정보를 받아오던 중 오류가 발생했습니다')
      }) //catch 자체 안에서 에러가 나면 자동으로 실행중지해준다
  })
}

//날씨 정보를 가공해서 리턴하는 함수
export const fnSetWeatherInfo = function(weatherDataObj, timezone){
  let sunrise; let sunset;
  if(weatherDataObj.sunrise){
    sunrise = moment(weatherDataObj.sunrise*1000).tz(timezone).format('A hh:mm:ss')
    sunset = moment(weatherDataObj.sunset*1000).tz(timezone).format('A hh:mm:ss')
  }else{
    sunrise = sunset = '-- : -- : --'

  }

  let date = moment(weatherDataObj.dt*1000).tz(timezone).format('YYYY년 M월 D일')
  let mmdd =  moment(weatherDataObj.dt*1000).tz(timezone).format('M월 D일')
  let time = moment(weatherDataObj.dt*1000).tz(timezone).format('hh:mm:ss')
  let apm = moment(weatherDataObj.dt*1000).tz(timezone).format('A')
  let dayArr = ['일','월','화','수','목','금','토']
  let day = dayArr[moment(weatherDataObj.dt*1000).tz(timezone).day()]

  let temp; let tempMin; let tempMax; let tempDay; let tempMorn; let tempNight;
  if(typeof(weatherDataObj.temp)==='object'){ //객체로 나와서 
    tempMin = (weatherDataObj.temp.min - 273.15).toFixed(1)
    tempMax = (weatherDataObj.temp.max - 273.15).toFixed(1)
    tempMorn = (weatherDataObj.temp.morn - 273.15).toFixed(1)
    tempDay = (weatherDataObj.temp.day - 273.15).toFixed(1)
    tempNight = (weatherDataObj.temp.night - 273.15).toFixed(1)
  }else{ //나머지는 number
    temp = (weatherDataObj.temp - 273.15).toFixed(1)
  }
 

  let icon = weatherDataObj.weather[0].icon
  let bg = weatherDataObj.weather[0].main
  let desc = weatherDataObj.weather[0].description
  desc = codeKrArr[codeEnArr.indexOf(desc)] 
  let windDeg = weatherDataObj.wind_deg
  let windSpeed = weatherDataObj.wind_speed
  let humidity = weatherDataObj.humidity
  
  let rain = (weatherDataObj.rain)
    ? (typeof(weatherDataObj.rain)==='object')
      ? weatherDataObj.rain['1h'] 
      : weatherDataObj.rain
    : 0

  let snow = (weatherDataObj.snow)
  ? (typeof(weatherDataObj.snow)==='object')
    ? weatherDataObj.snow['1h'] 
    : weatherDataObj.snow
  : 0


  let uvi = weatherDataObj.uvi
  let uviDesc  
  if(uvi <= 3) uviDesc = '낮음'
  else if(uvi > 3 && uvi <= 6) uviDesc = '보통'
  else if(uvi > 6 && uvi <= 8) uviDesc = '높음'
  else if(uvi > 8 && uvi <= 11) uviDesc = '매우높음'
  else uviDesc = '위험'
  
  


  return {
    temp, tempMin, tempMax, tempMorn, tempDay, tempNight,
    icon, bg, desc, 
    windDeg, windSpeed, humidity, rain, uvi, uviDesc, snow,
    sunrise, sunset, date, day, time, apm, mmdd, 
    
  }
}