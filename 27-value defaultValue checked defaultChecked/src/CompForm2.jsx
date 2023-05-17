import React, { useEffect, useState } from 'react';

const CompForm2 = () => {
  const [_chkObj, _setChkObj] =useState({chk1:true, chk2:false})
  const [_input, _setInput] = useState('')

  const [_keyArr, _setKeyArr] = useState([0,1,2])

  //state를 이용해서 값을 변경
  const fnSubmitHandler = function(e){
    e.preventDefault()
    const chkObj = {..._chkObj}
    chkObj.chk1 = true
    chkObj.chk2 = false
    _setChkObj(chkObj)
    _setInput('')
    const keyArr = [..._keyArr]
    keyArr.forEach((v,i) => {
      keyArr[i] += 3
    }) //배열을 return 받을 필요가 없을 때 forEach를 사용한다, v는 지우면 안 된다, 지우면 i가 v 역할을 하게 된다
    //배열의 값을 직접 바꾼다, keyArr[i] 배열의 값을 바꾸는 거 

    _setKeyArr(keyArr)
  }

  const fnInputHandler = function(e){
    _setInput(e.target.value)
  }

  return (
    <form onSubmit={fnSubmitHandler}>
      <fieldset>
        <legend>default 속성 활용하기</legend>
        <p>
          <input key={_keyArr[0]} defaultChecked={_chkObj.chk1} value="1" type="radio" name='radio1'/>라디오1
          <input key={_keyArr[1]} defaultChecked={_chkObj.chk2} value="2" type="radio" name='radio1'/>라디오2
        </p>
        <p>
          <input key={_keyArr[2]} onInput={fnInputHandler} defaultValue={_input} type="text" />
        </p>
        <p>
          <button>초기화하기</button>
        </p>
        <p>
          {_input}
        </p>
      </fieldset>
    </form>
  );
};

export default CompForm2;

/* 

*/