import React, { useContext } from 'react';
import CompLoggedBefore from './CompLoggedBefore';
import CompLoggedAfter from './CompLoggedAfter';
import { AppContext } from '../../App';

const CompHeader = () => {
  const {_islogged, _setIsLogged} = useContext(AppContext)
  return (
    <header>
      <img className="pin" src={require('../../assets/img/common/pin.png')} alt="" />  
      {(_islogged===false)&&<CompLoggedBefore/>}
      {(_islogged===true)&&<CompLoggedAfter/>}
    </header>
  );
};

export default CompHeader;