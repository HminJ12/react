import React from 'react';
import { Link } from 'react-router-dom';

const CompBackBtn = () => {
  return (
    <Link to="/" className='back-btn'>
      <i class="fa-solid fa-circle-left"></i>
    </Link>
  );
};

export default CompBackBtn;