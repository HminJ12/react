import React, { useContext, useEffect, useState } from 'react';
import { BMIContext } from './CompBMI';
import { fnChkObj, fnSetDegree } from '../../js/bmi';
import CompMorph from './CompMorph';


const CompResult = () => {
  const {
    _active, _setActive, //_active state를 변경하는 함수, 'active' 문자열로 설정할 경우 _setActive('active') 결과화면이 나온다
    _gender, _setGender, //성별 state 변경, 라디오버튼을 change할 때마다 state가 변경 _setGender(e.target.value)
    _cm, _setCm, //신장 state, input의 값이 입력될 때마다 input의 value값으로 변경
    _kg, _setKg, //kg state, input의 값이 입력될 때마다 input의 value값으로 변경
    _chkObj, _setChkObj, //남,녀 라디오버튼 체크 상태를 관리하는 객체 state, fnChkObj(n) 함수를 이용해서 n번째 버튼의 check값만 true로 전달
    _err, _setErr,
    _deg, _setDeg,
    _bmi, _setBmi,
  } = useContext(BMIContext)



/*   useEffect(()=>{
    
  }) //디펜던시 사용하면 안 된다, 업데이트 될 때마다 사용
  //1초 후에 화면 나오고 변한다 */

  const fnResetHandler = function(){
    _setActive('') //결과 화면 바깥쪽으로 이동한다
    _setChkObj(fnChkObj(0)) //폼양식의 남녀체크 해제
    _setCm('') //폼양식의 cm input 초기화
    _setKg('') //폼양식의 kg input 초기화
    _setDeg(90)
    window.TweenMax.to(".manorg",1,{morphSVG:`.man3`,fill:'#000',ease:window.Linear.easeNone})
    window.TweenMax.to(".womanorg",1,{morphSVG:`.woman3`,fill:'#000',ease:window.Linear.easeNone})
  } //bmi수치 재검사할 수 있도록 초기화

  return (
    <div className={`bmi-result ${_active}`}>
      <h2>bmi result</h2>

    {
      (_err)?
        <div className='output err'> {/* bmi수치가 비정상 수치결과화면 */}
          <p>
            <i className="fa-solid fa-weight-scale"></i>
            <i className="fa-solid fa-xmark"></i>
          </p>
          <p>측정할 수 없는 BMI수치결과입니다</p>
        </div>
        :
        <div className='output result'> {/* 정상적인 결과화면 */}
          <CompMorph/>
          <figure className='board'>
            <img className='pin' style={{transform: `translate(7%, 50%) rotate(${_deg}deg)`}} src={require('../../assets/img/bmiPin.svg').default} alt="" />
            <img src={require('../../assets/img/bmiBoard.svg').default} alt="" />
          </figure>
          <p>{_bmi}</p>
        </div>
    }

      <button onClick={fnResetHandler}>
        <i className="fa-solid fa-rotate-right"></i> 다시 측정하기
      </button>
    </div>
  );
};

export default CompResult;