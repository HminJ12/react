export const fnChkObj = function(n){
  let obj = {}
  for(let i = 1; i <=2; i++){
    obj[i] = false
  }
  obj[n] = true
  return obj
}

export const fnCheckBMI = (gender, cm, kg) => {
  const m = cm / 100
  let bmi = (kg / (m * m)).toFixed(2)
  let fillColor
  let morphN //사람 번호
  let deg

  //사람클래스이름,사람 색깔 
  if((gender==='male' && bmi < 15)||(gender==='female' && bmi < 20)){
    morphN = 1;
    fillColor = '#8eacc9';
  }else if((gender==='male' && bmi >= 15 && bmi < 20)||(gender==='female' && bmi >= 20 && bmi < 25)){
    morphN = 2;
    fillColor = '#97c93c';
  }else if((gender==='male' && bmi >= 20 && bmi < 25)||(gender==='female' && bmi >= 25 && bmi < 30)){
    morphN = 3;
    fillColor = '#fdd500';
  }else if((gender==='male' && bmi >= 25 && bmi < 30)||(gender==='female' && bmi >= 30 && bmi < 35)){
    morphN = 4;
    fillColor = '#f5881f';
  }else{
    morphN = 5;
    fillColor = '#ef5023';
  }

  /* 각도구하기 */
  let max = (gender === 'male')? 35:40
  let min = (gender === 'male')? 10:15
  deg = ((bmi - min) / (max - min)) * 180
  if(deg < 0) deg = 0
  if(deg > 180) deg = 180
  
  /* 에러여부 확인 */
  //let err = (bmi <= 5 || bmi > 55)? true : false
  let err = (bmi < 8 || bmi > 60) && true 
  
  if(!err){
    let timeoutID
    clearTimeout(timeoutID)
    timeoutID = setTimeout(()=>{
      window.TweenMax.to(".manorg",1,{morphSVG:`.man${morphN}`,fill:fillColor,ease:window.Linear.easeNone})
      window.TweenMax.to(".womanorg",1,{morphSVG:`.woman${morphN}`,fill:fillColor,ease:window.Linear.easeNone})
    },500)
  } //에러가 false일 때만

  return {bmi, deg, err}
}

