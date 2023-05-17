export const fnGetDateInfo = function (dateObj) {
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
  let timeStamp = dateObj.getTime()

  return {day, year, month, date, ap, hour, min, sec, timeStamp}
}

/* 
fnGetNow(new Date(2023,12,25,15,23)) 이런 식으로 호출할 수 있다
*/

export const fnDDayArrInit = function(){
  let ddayArrStorage = localStorage.getItem('ddayArrStorage')
  let ddayArr = (ddayArrStorage) 
  ? //사용자가 dday 목록이 로컬스토리지에 존재하면
  JSON.parse(ddayArrStorage) //로컬스토리지 배열을 리턴한다
  : //사용자가 dday 목록이 로컬스토리지에 없다면
  [
    {
      id : Date.now(), //2개 만들 때는 다른 객체에는 Date.now()+1을 해야 한다
      title : '내년 신정(sample data)',
      dday : new Date(new Date().getFullYear()+1,0,1), //내년 1월 1일로 새로운 날짜를 준다
    },
  ]
  return ddayArr
}
//배열 초기화 

export const fnTimer = function(ddayTimeStamp){
  let diffTimeStamp = ddayTimeStamp - Date.now() 
  let diffSec = parseInt(diffTimeStamp / 1000) //초로 나눈 거
  let remain
  let remainDays = parseInt(diffSec / (60*60*24))
  remain = parseInt(diffSec % (60*60*24))
  let remainHours = parseInt(remain / (60*60))
  remain = parseInt(remain % (60*60))
  let remainMinutes = parseInt(remain / 60)
  let remainSecs = parseInt(remain % 60)
  return {remainDays, remainHours, remainMinutes, remainSecs}
}