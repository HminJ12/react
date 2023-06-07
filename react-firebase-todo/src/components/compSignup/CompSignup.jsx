import React from 'react';

const CompSignup = () => {
  return (
    <section className='section-signup'>
      <h2><img src={require('../../assets/img/register/title-register.png')} alt="" /></h2>
      <form>
        <p className='email-wrap'>
          <input type="text" placeholder='사용하실 이메일 주소를 입력하세요' />
        </p>
        
        <p className='password-wrap'>
          <input type="password" placeholder='사용하실 비밀번호를 입력하세요' />
        </p>

        <p className='nickname-wrap'>
          <input type="text" placeholder='사용하실 닉네임을 입력하세요' />
        </p>

        <p className='photo-wrap'>
        <input id='file' className='hidden' type="file" />
        <label htmlFor="file">프로필 사진을 업로드해주세요</label>
        </p>

        <p className='btn-wrap'>
          <button><img src={require('../../assets/img/register/btn-register.png')} alt="" /></button>
        </p>
      </form>
    </section>
  );
};

export default CompSignup;