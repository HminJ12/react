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
  return {temp}
}