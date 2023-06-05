const btnsArr = [
  {type : 'clear', char:<i className="fa-solid fa-trash-can"></i>, id: '1', },
  {type : 'string', char:'(', id: '2', },
  {type : 'string', char:')', id: '3', },
  {type : 'string', char:'/', id: '4', },
  {type : 'string', char:'7', id: '5', },
  {type : 'string', char:'8', id: '6', },
  {type : 'string', char:'9', id: '7', },
  {type : 'string', char:'*', id: '8', },
  {type : 'string', char:'4', id: '9', },
  {type : 'string', char:'5', id: '10', },
  {type : 'string', char:'6', id: '11', },
  {type : 'string', char:'-', id: '12', },
  {type : 'string', char:'1', id: '13', },
  {type : 'string', char:'2', id: '14', },
  {type : 'string', char:'3', id: '15', },
  {type : 'string', char:'+', id: '16', },
  {type : 'del', char:<i className="fa-solid fa-eraser"></i>, id: '17', },
  {type : 'string', char:'0', id: '18', },
  {type : 'string', char:'.', id: '19', },
  {type : 'equal', char:'=', id: '20', },
]

const fnSetOutput = (output, char, type) => {
  let showModal = false
  let errMsg 
  if(type === 'string'){
    if(output.length >= 40){
      //alert('계산식이 너무 길어요')
      errMsg = '계산식이 너무 길어요'
      showModal = true
    }else{
      output += char
    }

  }else if(type === 'clear'){
    output = ''
  }else if(type === 'del'){
    output = output.slice(0,-1)
  }else{
    try{//예외처리구문
      const fnCalc = new Function(`return ${output}`) //const fnCalc = function(){return 9/3}
      const prevOutput = output
      output = fnCalc() 
      if(output === Infinity){
        errMsg = '0으로 숫자를 나눌수 없어요'
        showModal = true
        output = prevOutput
      }
      if(output <= Math.pow(10,18)){
        output = parseInt(output*100000)
        output = output / 100000
      }
      
      output = String(output)

      if(output.length >= 30){
        //alert('계산 결과가 너무 길어요')
        errMsg = '계산 결과가 너무 길어요'
        showModal = true
        output = prevOutput
      }
    }catch{
      //alert(`계산식이 잘못됐어요`)
      errMsg = '계산식이 잘못됐어요'
      showModal = true
    }

  }
  return {output, showModal, errMsg} //output : output, showModal:showModal
}


export {btnsArr, fnSetOutput};

/* 
id는 안 겹치는 걸로 하면 된다 
jsx라 따옴표 없어도 된다 ->i태그

slice
str = '가나다라'
str.slice(0,-1) ->뒤에서 한글자를 잘라낸다
str.slice(1, str.length-1) =>끝자리수 잘라내는 거
str.slice(0,2) -> '가나다'

// String(fnCalc()) 글자로 바꿔서 넣어야 한다 안 그러면 지우는 키를 눌렀을 때 에러가 난다
*/

