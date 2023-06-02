import { Route, Routes, useNavigate } from "react-router-dom";
import CompHeader from "./CompHeader";
import CompHome from "./CompHome";
import CompSignin from "./CompSignin";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

export const AppContext = createContext()

const fnSetUser = () => {
  let user = localStorage.getItem('localStorageUser')
  if(user){ //user가 있다면(로그인 기록이 있다면)
    return JSON.parse(user)  //user가 객체여서 미리 parse를 한 거다
  }else{ //로그인 기록이 없다면
    return null
  }
} //로컬 스토리지에 무슨 값이 있는지 확인하는 함수

function App() {
  const [_user, _setUser] = useState(fnSetUser())
  const navi = useNavigate()
  const [_list, _setList] = useState([])

  useEffect(()=>{
    if(!_user){ //user가 없으면 (로그인이 안 된 상태)
      navi('/signin')
    }
  },[])


  return (
    <AppContext.Provider value={{_user, _setUser, _list, _setList}}>
      <CompHeader/>
      <Routes>
        <Route path="/" element={<CompHome/>}/>
        <Route path="/signin" element={<CompSignin/>}/>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
