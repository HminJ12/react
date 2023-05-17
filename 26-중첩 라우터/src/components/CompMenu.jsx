import React from 'react';
import { Link } from 'react-router-dom';
import CompMenuAbout from './CompMenuAbout';
import CompMenuBiz from './CompMenuBiz';
import CompMenuNotice from './CompMenuNotice';

const CompMenu = () => {
  return (
    <ul>
      <CompMenuAbout/>
      <CompMenuBiz/>
      <CompMenuNotice/>
    </ul>
  );
};

export default CompMenu;

// 여기는 대메뉴
// 소메뉴를 따로 만들어야 한다, 숨겨야 해서, 조건부 이용한다
// sidebar 메뉴 클릭한 탭만 나오게 하는 것을 만든다