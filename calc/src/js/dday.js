export const fnGetNow = function (dateObj) {
  //dateObj new Date(), Date객체를 가져온다

  let dayArr = ['sun','mon','tue','wed','thr','fri','sat']
  let day = dayArr[dateObj.getDay()] //0에서 6까지 나온다

  let year = dateObj.getFullYear()
  let month = dateObj.getMonth() + 1 //0부터 나온다 1 더해서 출력해야 한다
  month = (month < 10)? '0' + month : month //0이 나오는 조건
  let date = dateObj.getDate()
  date = (date < 10)? '0' + date : date //0이 나오는 조건
  let ap = (dateObj.getHours() <= 12) ? 'am' : 'pm'  //시간이 나오는데 13시부터 1시가 나오게 조건을 건다
  let hour = (dateObj.getHours() <= 12) ? dateObj.getHours() : dateObj.getHours() - 12
  hour = (hour < 10)? '0' + hour : hour //0이 나오는 조건
  let min = dateObj.getMinutes()
  min = (min < 10)? '0' + min : min //0이 나오는 조건
  let sec = dateObj.getSeconds()
  sec = (sec < 10)? '0' + sec : sec //0이 나오는 조건

  return {day, year, month, date, ap, hour, min, sec}
}

/* 
fnGetNow(new Date(2023,12,25,15,23)) 이런 식으로 호출할 수 있다
*/