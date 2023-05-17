import { createContext, useState } from "react";
import CompBtn from "./CompBtn";
import CompDiv from "./CompDiv";
export const AppContext = createContext()

const fnSetArr = function(){
  let listStorage = window.localStorage.getItem('listStorage')
  if(listStorage){
    return JSON.parse(listStorage)
  }else{
    return []
  }
  //return arr
}

function App() {
  const [_listArr, _setListArr] = useState([]) //timeStamp필요, 날짜 시간 정보 다 저장해야 함 {id, year, month, date,} 객체를 추가
  
  //배열의 길이만큼 동일하게 새로운 배열이 나오는 게 map


  return (
    <AppContext.Provider value={{_listArr, _setListArr}}>
      <p>
        버튼을 클릭할 때마다 div가 추가됩니다. <br />
        div의 키값으로는 timeStamp를 사용하세요 <br />
        브라우저를 종료 후 다시 실행할 경우 div의 숫자는 이전 숫자와 동일하게 출력되어야 합니다
      </p>
      <hr />
      {(_listArr.length === 0)? '<p>목록이 없어요</p>' : _listArr.map(v=><CompDiv key={v.key}/>)}
      <CompBtn />
    </AppContext.Provider>
  );
}

export default App;

/* 
CompBtn 클릭했을 때 배열을 늘린다
*/
