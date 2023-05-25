//현재 위치 정보를 리턴해주는 함수
export const fnGetLatLng = function(){
  return new Promise((resolve, reject)=>{
    navigator.geolocation.getCurrentPosition(
      (location)=>{
        resolve(
          {
            lat : location.coords.latitude,
            lng : location.coords.longitude,  
          }
        )
      }, //성공했을 때 할 일 success 
      (error)=>{
        if(error.code === 1) alert('위치 접근 권한을 허용해주세요')
        else alert('위치 접근 수신중 오류가 발생했습니다')
        reject(new Error('에러가 났습니다')) //throw new Error('에러가 났습니다')
      } //실패했을 때 할 일 failed
    ) //getCurrentPosition method
  })
} 

//위경도를 받아서 구글맵을 출력하는 함수
export const fnInitMap = function(latLngObj, fn){
  const {lat, lng} = latLngObj
  let map = new window.google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng },
    zoom: 8,
    styles: [
      {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#e0efef"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "hue": "#1900ff"
              },
              {
                  "color": "#c0e8e8"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 100
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 700
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#7dcdcd"
              }
          ]
      }
    ]
  })//map
  let center = { lat: lat, lng: lng }
  let marker = new window.google.maps.Marker({position: center, map: map});
 
  map.addListener('click', async (e) => {
    const result = window.confirm('해당위치로 날씨정보를 갱신하시겠습니까?')
    if(result){
      let lat = e.latLng.lat()
      let lng = e.latLng.lng()
      marker.setPosition({lat,lng}) //클릭했을 때 마커가 변하는 거
      fn({lat,lng}) //클릭한 위치의 위경도를 받아서 주소와 날씨정보 갱신
    }

  })//click
} //간단하게 하려면 컴포넌트를 만들어서 사용하면 된다

//위경도를 받아서 주소를 반환하는 함수
export const fnGetAddress = function(latLngObj){
    return new Promise((resolve)=>{
        let geocoder = new window.google.maps.Geocoder;
        let address
        geocoder.geocode({ 'location': latLngObj }, function (results, status) {
          try{ 
            address = `[${results[3].formatted_address}] [${results[0].formatted_address}]`
          }catch{ //formatted_address정보가 없을 경우 예외처리
            address = `"해당 위치의 주소는 존재하지 않습니다, 정상적인 위치인지 확인 후 다시 검색해주세요"`
          }
          resolve(address)
        }); //시간이 걸림, 주소를 받아오고나서 할 일, 주소를 리턴해준다
      })
}
