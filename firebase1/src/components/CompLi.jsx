import React from 'react';
import { Link } from 'react-router-dom';

const CompLi = ({docid, data}) => {
  const {date, desc, title} = data
  return (
    <li>
      <Link to={`/detail/${docid}`}>{title}</Link>
    </li>
  );
};

export default CompLi;