import React from 'react';
import { Link } from 'react-router-dom';

const CompLi = ({title, id}) => {
  
  return (
    <li>
      <p><Link to={`/detail/${id}`}>{title}</Link></p> {/* 주소 표시하려고 */}
    </li>
  );
};

export default CompLi;