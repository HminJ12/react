import React, { useContext, useEffect } from 'react';
import { AppContext } from './App';
import CompLi from './CompLi';

const CompHome = () => {
  const {
    _user, _setUser, _list, _setList
  } = useContext(AppContext)

  const fnGetList = async () => {
    const jsonData = await fetch('https://raw.githubusercontent.com/kjhardcore76/json/main/data.json')
    const jsData = await jsonData.json()
    _setList(jsData[_user.id])
  }


  useEffect(()=>{
    fnGetList()
  })

  return (
    <div>
      {
        _list.length === 0
        ?
          '목록이 없습니다'
        :
          <ul>
            {_list.map(v=><CompLi/>)}
          </ul>
      }
    </div>
  );
};

export default CompHome;