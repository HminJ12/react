export const fnSetObj = function(n){
  let obj = {}
  for(let i = 1; i <=2; i++){
    obj[i] = false
  }
  obj[n] = true
  return obj
}

//return을 꼭 해줘야 한다
//객체가 많이 있다는 가정 하에 함수를 만든다 for구문 

