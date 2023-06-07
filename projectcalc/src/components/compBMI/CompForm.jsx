import React, { useContext } from 'react';
import { BMIContext } from './CompBMI';
import { fnCheckBMI, fnChkObj } from '../../js/bmi';


const CompForm = () => {
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

  /* 측정하기 버튼 클릭시 발생하는 이벤트 */
  const fnSubmitHandler = function(e){
    e.preventDefault()
    const {bmi, deg, err} = fnCheckBMI(_gender, _cm, _kg) //에러여부, ㄴbmi수치, 각도를 객체로  리턴, morph애니메이션 설정
    _setErr(err)
    _setActive('active') //결과 화면이 나온다
    _setDeg(deg)
    _setBmi(bmi)
  }

  const fnChangeHandler = function(e){
    _setChkObj(fnChkObj(e.target.getAttribute('data-n')))
    _setGender(e.target.value) //성별 state 변경
  }

  const fnInputHandler = function(e){
    if(e.target.id === 'tall'){
      _setCm(parseFloat(e.target.value))
    }else{
      _setKg(parseFloat(e.target.value))
    }
  }



  return (
    <form onSubmit={fnSubmitHandler}>
      <div className='radios'>
        <label><i className="fa-solid fa-venus-mars"></i> 성별을 입력하세요</label>
        <p>
          <input onChange={fnChangeHandler} checked={_chkObj[1]} value="male" data-n="1" id="male" type="radio" name='gender' required />
          <label htmlFor="male">
            <i className="fa-solid fa-person"></i> male
          </label>
          <input onChange={fnChangeHandler} checked={_chkObj[2]} value="female" data-n="2" id="female" type="radio" name='gender' required />
          <label htmlFor="female">
            <i className="fa-solid fa-person-dress"></i> female
          </label>
        </p>
      </div>
      <div>
        <label htmlFor="tall"><i className="fa-solid fa-ruler-vertical"></i> 신장을 입력하세요</label>
        <input id="tall" onInput={fnInputHandler} value={_cm||''} type="number" min="30" max="500" step={0.1} required placeholder='cm단위로 입력해주세요' />
      </div> 

      <div>
        <label htmlFor="weight"><i className="fa-solid fa-weight-scale"></i> 체중을 입력하세요</label>
        <input id="weight" onInput={fnInputHandler} value={_kg} type="number" min="30" max="500" step={0.1} required placeholder='kg단위로 입력해주세요' />
      </div>
      
      <button>측정하기</button>
    </form>
  );
};

export default CompForm;

/* 
초기값으로 male체크
체크가 변경이 가능해야 함
결과화면 다시 측정하기 클릭시 원래대로 돌아와야 함(male이 체크되어야 함)
*/