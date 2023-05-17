import React from 'react';
import CompMenu from './CompMenu';
import CompMenuAbout from './CompMenuAbout';
import CompMenuBiz from './CompMenuBiz';
import { useLocation } from 'react-router-dom';
import CompMenuNotice from './CompMenuNotice';

const CompSidebar = () => {
  const location = useLocation()
  const menu = location.pathname.split('/')[1] //location.pathname -> /about/greet, split 사용하면 배열 3개가 나온다

  return (
    <aside>
      <p>sidebar</p>
      <ul>
        {(menu === 'about')&&<CompMenuAbout/>} {/* 이항연산자 사용하기 */}
        {(menu === 'biz')&&<CompMenuBiz/>}
        {(menu === 'customer')&&<CompMenuNotice/>}
      </ul>
    </aside>
  );
};

export default CompSidebar;

// 조건부로 출력해야 해서 compMenuAbout과 CompMenuBiz를 호출한다
// 자잘한 건 css를 이용한다