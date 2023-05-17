import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fnGetTheme } from '../../js/compMenu';
import { AppContext } from '../../App';



const CompMenu = () => {
  const {_theme, _setTheme} = useContext(AppContext)
  const [_key, _setKey] = useState(1)

  const fnChangeHandler = function(e){
    let n = e.target.value
    let obj = {1:false, 2:false, 3:false}
    obj[n] = true
    _setKey(prev=>prev+3) //3을 더하는 이유는 실행했을 때 세가지 key값과 겹치지 않기 위해서
    _setTheme(obj) //테마가 변경
    localStorage.setItem('themeStorage',JSON.stringify(obj))

    let theme
    if(n === '1'){
      theme = 'gray'
    }else if(n === '2'){
      theme = 'skyblue' 
    }else{
      theme = 'beige'
    }

    document.body.setAttribute('class', theme) //강제로 색깔을 바꿔준다 바닐라 문법으로, App.js는 body보다 안쪽에 있어서 state 사용불가

  } // input checked가 바뀔 때마다 하는 이벤트


  useEffect(()=>{
    _setKey(prev=> prev+3)
    _setTheme(fnGetTheme())
  },[]) //시작할 때 한번 실행해라, 리랜더링을 막는다 fnGetTheme()은 js에서 있는 거 호출함 key를 바꿔야 checked가 변경이 된다


  return (
    <section className='menu'>
      <h1>Neumorphi Calculator</h1>
      <form className="theme"> 
        <fieldset>
          <legend><i className="fa-solid fa-palette"></i>Choice App Theme</legend>
          <div>
            <input key={_key} onChange={fnChangeHandler} defaultValue="1" defaultChecked={_theme['1']} id='radio1' type="radio" name='theme' />
            <label htmlFor="radio1"></label>
            <input key={_key+1} onChange={fnChangeHandler} defaultValue="2" defaultChecked={_theme['2']} id='radio2' type="radio" name='theme' />
            <label htmlFor="radio2"></label>
            <input key={_key+2} onChange={fnChangeHandler} defaultValue="3" defaultChecked={_theme['3']} id='radio3' type="radio" name='theme' />
            <label htmlFor="radio3"></label>
          </div>
        </fieldset>
      </form>
      <nav>
        <Link to="/calc"><i className="fa-solid fa-calculator"></i>calculator</Link>
        <Link to="/bmi"><i className="fa-solid fa-weight-scale"></i>bmi</Link>
        <Link to="/dday"><i className="fa-solid fa-calendar-days"></i>dday</Link>
      </nav>
    </section>
  );
};

export default CompMenu;