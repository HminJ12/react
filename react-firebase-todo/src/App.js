import { createContext, useEffect, useState } from "react";
import fb from "./fb/config";
import { auth } from "./fb/auth";

import { db, fnGetDocs, fnGetDocsCnt } from "./fb/db";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import CompHeader from "./components/compHeader/CompHeader";
import CompSignin from "./components/compSingin/CompSignin";
import CompHome from "./components/compHome/CompHome";
import Comp404 from "./components/comp404/Comp404";
import CompSignup from "./components/compSignup/CompSignup";
import CompAdd from "./components/compAdd/CompAdd";
import CompDetail from "./components/compDetail/CompDetail";
import CompLoader from "./components/compLoader/CompLoader";

export const AppContext = createContext()

function App() {
  const [_init, _setInit] = useState(true) //초기화
  const [_isLogged, _setIsLogged] = useState(null) //로그인 됐는지 확인하는 변수
  const [_showLoader, _setShowLoader] = useState(true) //true 보여주겠다
  const [_fadeOut, _setFadeOut] = useState(false)
  const [_docsCnt, _setDocsCnt] = useState(0)
  const [_docsArr, _setDocsArr] = useState(null) //처음에는 null을 넣는다
  const [_docsOutputArr, _setDocsOutputArr] = useState(null)
  const [_nextDoc, _setNextDoc] = useState(null)
  const navi = useNavigate()

  useEffect(()=>{
    let init = true //변수를 사용해야 한다
    onAuthStateChanged(auth, (user) => {
      if (user && auth.currentUser.emailVerified) {
        _setIsLogged(true)
        onSnapshot(collection(db, auth.currentUser.uid), async () => {
          const docsCnt = await fnGetDocsCnt(auth.currentUser.uid)
          const {docsArr, nextDoc} = await fnGetDocs(auth.currentUser.uid, 5) //목록을 새로 만들거나 삭제할 때 목록 5개만 나오게 하겠다 스크롤바가 생길 정도로 만들어야 한다
          _setDocsCnt(docsCnt); _setDocsArr(docsArr); _setDocsOutputArr(docsArr); _setNextDoc(nextDoc)
        })
        navi('/')
      } else {
        _setIsLogged(false)
        navi('/signin')
      }
      if(init){
        init = false //처음에만 로그인이 등록이 된 순간만 동작해라
        _setFadeOut(true) //모달은 사라진다
      }
    }) //변화가 감지될 때마다 
  },[]) //이벤트는 한번만, 변하는 state는 절대로 useEffect안에서 사용하면 안 된다, 변수로 사용해야 한다

  return (
    <AppContext.Provider value={{
      _isLogged, _setIsLogged,
      _showLoader, _setShowLoader,
      _fadeOut, _setFadeOut,
      _docsCnt, _setDocsCnt,
      _docsArr, _setDocsArr,
      _docsOutputArr, _setDocsOutputArr,
      _nextDoc, _setNextDoc,
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
            <Route path="/detail/:id" element={<CompDetail />} />
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