import React from 'react';

const CompSignOut = () => {
  return (
    <div>
      로고
      로그인
      <form>
        <p>일자 : <input type="date" /></p>
        <p>일정명 : <input type="text" /></p>
      </form>
      
    </div>
  );
};

export default CompSignOut;

/* 
{
  "uses1": 
  [
    {
        "title":"user1 일정1",
        "date":"2000-01-01"
    }
  ],

  "uses2": 
  [
    {
        "title":"user2 일정1",
        "date":"2000-01-01"
    },
    {
        "title":"user2 일정2",
        "date":"2000-01-02"
    }
  ],
  
  "uses3": 
  [
    {
        "title":"user3 일정1",
        "date":"2000-01-01"
    },
    {
        "title":"user3 일정2",
        "date":"2000-01-02"
    },
    {
        "title":"user3 일정3",
        "date":"2000-01-03"
    }
  ]
}
*/