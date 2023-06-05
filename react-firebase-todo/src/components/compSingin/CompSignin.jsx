import React from 'react';

const CompSignin = () => {
  return (
    <section className='section-signin'>
      <h2><img src={require('../../assets/img/login/title-sign-in.png')} alt="" /></h2>
      <form>
        <p className='email'>
          <input type="text" placeholder='가입하신 이메일 주소를 입력하세요' />
        </p>
        <p className='password'>
          <input type="password" placeholder='가입하신 비밀번호를 입력하세요' />
        </p>
        <p className='btn'>
          <button disabled={true}><img src={require('../../assets/img/login/btn-login.png')} alt="" /></button>
          <button><img src={require('../../assets/img/login/btn-google-login.png')} alt="" /></button>
        </p>
        <p className='remember'>
          <input id='remember' className='hidden' type="checkbox" />
          <label htmlFor="remember">
            <img src={require('../../assets/img/login/remember-check.png')} alt="" />
            <img src={require('../../assets/img/login/remember-checked.png')} alt="" />
          </label>
        </p>

      </form>
    </section>
  );
};

export default CompSignin;