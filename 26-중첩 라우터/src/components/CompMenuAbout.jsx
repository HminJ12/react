import React from 'react';
import { NavLink } from 'react-router-dom';

const CompMenuAbout = () => {
  return (
    <li>
      <NavLink to='#'>about</NavLink>
      <ul>
        <li><NavLink to='/about/greet'>인사말</NavLink></li>
        <li><NavLink to='/about/location'>오시는길</NavLink></li>
      </ul>
    </li>
  );
};

export default CompMenuAbout;

// active 구현하려고 NavLink를 사용한다