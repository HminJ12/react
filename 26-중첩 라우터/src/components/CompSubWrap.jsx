import React from 'react';
import CompSidebar from './CompSidebar';
import { Outlet } from 'react-router-dom';

const CompSubWrap = () => {
  return (
    <>
      <div>서브 비주얼</div>
      <hr />
      <CompSidebar/>
      <hr />
      <main>
        {/* 서브페이지 본문 */}
        <Outlet /> {/* 주소에 따라 다 다르게 처리된다 */}
      </main>
      <hr />
      <div>서브페이지 공통 광고</div>
    </>
  );
};

export default CompSubWrap;