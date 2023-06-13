import React, { useContext } from 'react';
import { AppContext } from '../../App';
import CompHomeOutput from './CompHomeOutput';
import CompListLoader from '../compLoader/CompListLoader';



const CompHome = () => {
  const {_isPending} = useContext(AppContext)
  return (
    <section className='section-home'>
      {
        _isPending
          ? <CompListLoader/> //대기중일 때 대기화면
          : <CompHomeOutput/>
      }
    </section>
  );
};

export default CompHome;