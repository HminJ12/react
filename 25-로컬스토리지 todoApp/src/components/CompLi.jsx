import React from 'react';
import { Link } from 'react-router-dom';

const CompLi = ({id, title}) => {
  return (
    <li>
      <Link to={`/detail/${id}`}>{title}</Link>
    </li>
  );
};

export default CompLi;

// id를 가져와서 사용하는 거 쿼리스트링, 유즈파람(파람즈)