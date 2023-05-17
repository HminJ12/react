import React from 'react';
import { NavLink } from 'react-router-dom';

const CompLi = ({id, title}) => {
  return (
    <li>
      <NavLink to={`/detail/${id}`}>{title}</NavLink> {/* 값을 넣는다 */}
    </li> 
  );
};

export default CompLi;

// detail page로 가지만 각자 다른 정보를 가져와야 한다, 주소에 id를 줘야 한다
// App.js에서 해야 한다 쿼리스팅 