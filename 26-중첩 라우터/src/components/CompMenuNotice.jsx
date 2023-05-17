import React from 'react';
import { NavLink } from 'react-router-dom';

const CompMenuNotice = () => {
  return (
    <li>
      <NavLink to='#'>notice</NavLink>
      <ul>
        <li><NavLink to='/customer/notice'>공지사항</NavLink></li>
        <li><NavLink to='/customer/free'>자유게시판</NavLink></li>
      </ul>
    </li>
  );
};

export default CompMenuNotice;