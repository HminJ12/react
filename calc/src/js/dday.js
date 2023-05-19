export const fnGetDateInfo = function (yymmdd) {
  /*   
  //yymmdd (new Date().getFullYear() + 1) + '-01-01T00:00' <-2024-01-01T00:00
  let yymmddArr = yymmdd.split('T') //['2024-01-01', '00:00']
  let dateArr = yymmddArr[0].split('-') //['2024','01','01']
  let timeArr = yymmddArr[1].split(':') //['00','00'] 
  */

  let dday = new Date(yymmdd) //new Date(`2024-01-01T00:00`)

  let dayArr = ['sun','mon','tue','wed','thr','fri','sat']
  let day = dayArr[dday.getDay()] //0에서 6까지 나온다

  let year = dday.getFullYear()
  let month = dday.getMonth() + 1 //0부터 나온다 1 더해서 출력해야 한다
  month = (month < 10)? '0' + month : month //0이 나오는 조건
  let date = dday.getDate()
  date = (date < 10)? '0' + date : date //0이 나오는 조건
  let ap = (dday.getHours() <= 12) ? 'am' : 'pm'  //시간이 나오는데 13시부터 1시가 나오게 조건을 건다
  let hour = (dday.getHours() <= 12) ? dday.getHours() : dday.getHours() - 12
  hour = (hour < 10)? '0' + hour : hour //0이 나오는 조건
  let min = dday.getMinutes()
  min = (min < 10)? '0' + min : min //0이 나오는 조건
  let sec = dday.getSeconds()
  sec = (sec < 10)? '0' + sec : sec //0이 나오는 조건
  let timeStamp = dday.getTime()

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
      dday : (new Date().getFullYear() + 1) + '-01-01T00:00', //내년 1월 1일로 새로운 날짜를 준다, 글자만 들어가야 한다 여기서 전체로 new Date 사용하면 안 된다
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

  if(diffTimeStamp < 0){
    remainDays=0; remainHours=0; remainMinutes=0; remainSecs=0
  } //음수가 나오지 않도록 강제로 고정

  return {remainDays, remainHours, remainMinutes, remainSecs}
}