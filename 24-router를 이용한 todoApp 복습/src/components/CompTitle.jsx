import React from 'react';

const CompTitle = () => {
  return (
    <h1>TodoApp</h1>
  );
};

export default React.memo(CompTitle);

// title은 바뀔 필요가 전혀 없다
// 이런 경우 리랜더링 되지 말라고 memo를 해준다