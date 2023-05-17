import React from 'react';
import { NavLink } from 'react-router-dom';

const CompMenuBiz = () => {
  return (
    <li>
      <NavLink to='#'>business</NavLink>
      <ul>
        <li><NavLink to='/biz/intro'>사업소개</NavLink></li>
        <li><NavLink to='/biz/area'>사업영역</NavLink></li>
      </ul>
    </li>
  );
};

export default CompMenuBiz;