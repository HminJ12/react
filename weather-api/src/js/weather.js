import { codeEnArr, codeKrArr } from "./conditionCode"

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
export const fnSetWeatherInfo = function(weatherDataObj){
  let temp = (weatherDataObj.temp - 273.15).toFixed(1)
  let sunriseHours =  new Date(weatherDataObj.sunrise * 1000).getHours() //초가 나옴, 날짜가 만들어진다
  let sunriseApm = (sunriseHours <= 12)? 'AM' : 'PM' //hour보다 apm을 먼저 해야한다
  sunriseHours = (sunriseHours > 12)? sunriseHours - 12 : sunriseHours
  sunriseHours = (sunriseHours < 10)? '0' + sunriseHours : sunriseHours
  let sunriseMinutes = new Date(weatherDataObj.sunrise * 1000).getMinutes()
  sunriseMinutes = (sunriseMinutes < 10 )? '0' + sunriseMinutes : sunriseMinutes


  let sunsetHours = new Date(weatherDataObj.sunset * 1000).getHours()
  let sunsetApm = (sunsetHours <= 12)? 'AM' : 'PM'
  sunsetHours = (sunsetHours > 12)? sunsetHours - 12 : sunsetHours
  sunsetHours = (sunsetHours < 10)? '0' + sunsetHours : sunsetHours
  let sunsetMinutes = new Date(weatherDataObj.sunrise * 1000).getMinutes()
  sunsetMinutes = (sunsetMinutes < 10 )? '0' + sunsetMinutes : sunsetMinutes

  let icon = weatherDataObj.weather[0].icon
  let bg = weatherDataObj.weather[0].main
  let desc = weatherDataObj.weather[0].description
  desc = codeKrArr[codeEnArr.indexOf(desc)] 
  let windDeg = weatherDataObj.wind_deg
  let windSpeed = weatherDataObj.wind_speed

  let humidity = weatherDataObj.humidity
  let rain = (weatherDataObj.rain)? weatherDataObj.rain['1h'] : 0
  let uvi = weatherDataObj.uvi
  let uviDesc  
  if(uvi <= 3) uviDesc = '낮음'
  else if(uvi > 3 && uvi <= 6) uviDesc = '보통'
  else if(uvi > 6 && uvi <= 8) uviDesc = '높음'
  else if(uvi > 8 && uvi <= 11) uviDesc = '매우높음'
  else uviDesc = '위험'
  
  let dtDate = new Date(weatherDataObj.dt * 1000)

  let hour = dtDate.getHours()
  let apm = (hour <= 12)? '오전' : '오후'
  hour = (hour >= 12)? hour - 12 : hour
  hour = (hour < 10)? '0' + hour : hour 
  let min = dtDate.getMinutes()
  min = (min < 10)? '0' + min : min 
  let year = dtDate.getFullYear()
  let month = dtDate.getMonth() + 1
  let date = dtDate.getDate()
  let dayArr = ['일','월','화','수','목','금','토']
  let day = dayArr[dtDate.getDay()]


  return {
    temp, 
    sunriseHours,sunriseMinutes, sunriseApm, 
    sunsetHours, sunsetMinutes, sunsetApm, 
    icon, bg, desc, windDeg, windSpeed, humidity, rain, uvi, uviDesc,
    hour, apm, min, year, month, date, day
  }
}