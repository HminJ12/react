import fb from "./fb/config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fb/auth";

import { Route, Routes, useNavigate } from "react-router-dom";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

import CompFooter from "./components/CompFooter";
import CompHeader from "./components/CompHeader";
import CompHome from "./components/CompHome";
import CompSignIn from "./components/CompSignIn";
import CompSignUp from "./components/CompSignUp";
import CompAdd from "./components/CompAdd";
import { fnWatchCollection } from "./fb/db";
import CompDetail from "./components/CompDetail";

export const AppContext = createContext()

function App() {
  const navi = useNavigate()
  const [_isLogged, _setIsLogged] = useState(false)
  const [_isLoaded, _setIsLoaded] = useState(false)
  const [_todoArr, _setTodoArr] = useState() 
  const [_todoOutputArr, _setTodoOutputArr] = useState() 
  

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        _setIsLogged(true)
        console.log(auth.currentUser); //로그인 됐을 때
        fnWatchCollection(auth.currentUser.uid, _setTodoArr, _setTodoOutputArr) //데이터베이스 변화 감지하는 함수
      } else {
        _setIsLogged(false)
        navi('/signin')
      }
      _setIsLoaded(true)
    });
  }, []) //빠르게 이벤트 관찰자를 확인하기 위해?, 화면이 출력되기 바로 직전, 파이어베이스만의 기능이다

  return (
    <AppContext.Provider value={{
      navi,
      _isLogged, _setIsLogged,
      _todoArr, _setTodoArr,
      _todoOutputArr, _setTodoOutputArr,
    }}>

      {
        (_isLoaded) ?
          <>
            <CompHeader />
            <Routes>
              <Route path="/" element={<CompHome />} />
              <Route path="/signin" element={<CompSignIn />} />
              <Route path="/signup" element={<CompSignUp />} />
              <Route path="/add" element={<CompAdd/>} />
              <Route path="/detail/:docid" element={<CompDetail/>} />
            </Routes>
            <CompFooter />
          </>
          :
          '회원정보를 가져오는 중입니다..'
      }

    </AppContext.Provider>
  );
}

export default App;
