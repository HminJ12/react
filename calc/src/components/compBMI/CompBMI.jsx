import React, { createContext, useState } from 'react';
import CompForm from './CompForm';
import CompResult from './CompResult';
import { fnChkObj } from '../../js/bmi';
export const BMIContext = createContext()


const CompBMI = () => {
  const [_active, _setActive] = useState('')
  const [_gender, _setGender] = useState()
  const [_cm, _setCm] = useState()
  const [_kg, _setKg] = useState('')
  const [_chkObj, _setChkObj] = useState(fnChkObj(0))  
  const [_err, _setErr] = useState(false)
  const [_deg, _setDeg] = useState(90)
  const [_bmi, _setBmi] = useState(0)

  return (
    <BMIContext.Provider value={{
      _active, _setActive, //_active state를 변경하는 함수, 'active' 문자열로 설정할 경우 _setActive('active') 결과화면이 나온다
      _gender, _setGender, //성별 state 변경, 라디오버튼을 change할 때마다 state가 변경 _setGender(e.target.value)
      _cm, _setCm, //신장 state, input의 값이 입력될 때마다 input의 value값으로 변경
      _kg, _setKg, //kg state, input의 값이 입력될 때마다 input의 value값으로 변경
      _chkObj, _setChkObj, //남,녀 라디오버튼 체크 상태를 관리하는 객체 state, fnChkObj(n) 함수를 이용해서 n번째 버튼의 check값만 true로 전달
      _err, _setErr, //bmi결과에 따른 출력화면 관리 state
      _deg, _setDeg, //저울 각도 state
      _bmi, _setBmi, //bmi 수치출력 state
      }}>
      <section className='bmi'>
        <h2>bmi</h2>
        <CompForm/>
        <CompResult/>
      </section>
    </BMIContext.Provider>
  );
};

export default CompBMI;