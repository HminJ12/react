import React, { useContext } from 'react';
import { AppContext } from '../../App';
import CompDetailOutput from './CompDetailOutput';

const CompDetail = () => {
  const {_isLogged} = useContext(AppContext)

  

  return (
    <section className='section-detail'>
      {
      (_isLogged)
        ? <CompDetailOutput/>
        : '로그인전에는 사용 못함...'
      }
    </section>
  );
};

export default CompDetail;