import React, { useContext } from 'react';
import { AppContext } from '../../App';
import CompHomeOutput from './CompHomeOutput';



const CompHome = () => {
  const {_docsArr} = useContext(AppContext)
  return (
    <section className='section-home'>
      {
        _docsArr
          ? <CompHomeOutput/>
          : <p>데이터를 불러오는 중</p>
      }
    </section>
  );
};

export default CompHome;