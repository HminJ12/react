import React from 'react';
import { Link } from 'react-router-dom';

const CompDetail = () => {
  return (
    <section className='section-detail'>
      <h2><img src={require('../../assets/img/detail/title-detail.png')} alt="" /></h2>
      <form className='scroll-wrap'>
        <p className='date-wrap'>
          <input type="date" />
        </p>

        <p className='time-wrap'>
          <input type="time" />
        </p>

        <p className='title-wrap'>
          <input type="text" />
        </p>

        <p className='desc-wrap'>
          <textarea></textarea>
        </p>

        <p className='check-wrap'>
          <input id='check' type="checkbox" className='hidden'/>
          <label htmlFor="check">
            <img className='img-check' src={require('../../assets/img/detail/delete-check.png')} alt="" />
            <img className='img-checked' src={require('../../assets/img/detail/delete-checked.png')} alt="" />
          </label>
        </p>

        <p className='photo-wrap'>
          <input id='file' type="file" className='hidden' />
          <label htmlFor="file">일정과 관련된 사진을 업로드해주세요</label>
        </p>
      </form>

      <p className='btn-wrap'>
        <button><img src={require('../../assets/img/detail/btn-update-list.png')} alt="" /></button>
        <button><img src={require('../../assets/img/detail/btn-delete-list.png')} alt="" /></button>
        <Link to='/'><img src={require('../../assets/img/detail/btn-goto-list.png')} alt="" /></Link>
      </p>
    </section>
  );
};

export default CompDetail;