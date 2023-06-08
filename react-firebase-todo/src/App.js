import { createContext, useEffect, useState } from "react";
import fb from "./fb/config";
import CompHeader from "./components/compHeader/CompHeader";

import { auth } from "./fb/auth";
import { onAuthStateChanged } from "firebase/auth";
import CompSignin from "./components/compSingin/CompSignin";
import { Route, Routes, useNavigate } from "react-router-dom";
import CompHome from "./components/compHome/CompHome";
import Comp404 from "./components/comp404/Comp404";
import CompSignup from "./components/compSignup/CompSignup";
import CompAdd from "./components/compAdd/CompAdd";
import CompDetail from "./components/compDetail/CompDetail";
import CompLoader from "./components/compLoader/CompLoader";

export const AppContext = createContext()

function App() {
  const [_islogged, _setIsLogged] = useState(null) //로그인 됐는지 확인하는 변수
  const [_showLoader, _setShowLoader] = useState(true) //true 보여주겠다
  const [_fadeOut, _setFadeOut] = useState(false)
  const navi = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user && auth.currentUser.emailVerified) {
        _setIsLogged(true)
        navi('/')
      } else {
        _setIsLogged(false)
        navi('/signin')
      }
      _setFadeOut(true)
    }) //변화가 감지될 때마다
  },[])

  return (
    <AppContext.Provider value={{
      _islogged, _setIsLogged,
      _showLoader, _setShowLoader,
      _fadeOut, _setFadeOut,
    }}>
      <main>
        <img className="main-bg" src={require('./assets/img/common/main-bg.png')} alt="" />
        <h1>
          <img src={require('./assets/img/header/title-main.png')} alt="" />
        </h1>
        <article>
          <CompHeader />
          <Routes>
            <Route path="/" element={<CompHome />} />
            <Route path="/signin" element={<CompSignin />} />
            <Route path="/signup" element={<CompSignup />} />
            <Route path="/add" element={<CompAdd />} />
            <Route path="/detail" element={<CompDetail />} />
            <Route path="*" element={<Comp404 />} />
          </Routes>
        </article>
      </main>
      {(_showLoader)&&<CompLoader />}
    </AppContext.Provider>
  );
}

export default App;

/* 
app 자체가 main이다 
리액트에서는 반드시 alt=""로 해야 한다
*/