import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CompItem = ({docid, data}) => {
  let {date, time, outputUrl, title, timestamp} = data //timestamp 정렬할 때 사용 
  outputUrl = outputUrl? outputUrl : 'https://firebasestorage.googleapis.com/v0/b/todoapp-95d59.appspot.com/o/common%2Fno-image.jpg?alt=media&token=d5af1c38-c500-4d67-b995-27805425fa5e'

  return (
    <li>
      <Link to={`/detail/${docid}`}>
        <img className='thumnail' src={outputUrl} alt="" />
        <div className="metabox">
          <p>
            <time className='date'>
              <img src={require('../../assets/img/icons/icon-calendar.png')} alt="" />{date}
            </time>

            <time className='time'>
              <img src={require('../../assets/img/icons/icon-clock.png')} alt="" />{time}
            </time>
          </p>

          <p>
            <em className='title'>
              <img src={require('../../assets/img/icons/icon-pencil.png')} alt="" />{title}
            </em>
          </p>
        </div>
        <img className='more' src={require('../../assets/img/list/more.png')} alt="" />
      </Link>
    </li>
  );
};

export default CompItem;