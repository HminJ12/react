import React from 'react';
import { Link } from 'react-router-dom';

const CompItem = () => {
  return (
    <li>
      <Link to='/detail'>
        <img className='thumnail' src={require('../../assets/img/list/no-image.jpg')} alt="" />
        <div className="metabox">
          <p>
            <time className='date'>
              <img src={require('../../assets/img/icons/icon-calendar.png')} alt="" />2022-05-01
            </time>

            <time className='time'>
              <img src={require('../../assets/img/icons/icon-clock.png')} alt="" />18:20
            </time>
          </p>

          <p>
            <em className='title'>
              <img src={require('../../assets/img/icons/icon-pencil.png')} alt="" />일정이름입니다
            </em>
          </p>
        </div>
        <img className='more' src={require('../../assets/img/list/more.png')} alt="" />
      </Link>
    </li>
  );
};

export default CompItem;