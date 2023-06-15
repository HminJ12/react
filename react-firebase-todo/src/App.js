import { createContext, useCallback, useEffect, useState } from "react";
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
import CompCoatch from "./components/compLoader/CompCoatch";

const fnCoatchShow = () => {
  return (window.localStorage.getItem('coatchExpires'))? false : true
}

export const AppContext = createContext()


function App() {
  const [_init, _setInit] = useState(true) //초기화
  const [_isLogged, _setIsLogged] = useState(null) //로그인 됐는지 확인하는 변수
  const [_showLoader, _setShowLoader] = useState(true) //true 보여주겠다
  const [_fadeOut, _setFadeOut] = useState(false)
  const [_docsCnt, _setDocsCnt] = useState(0)
  const [_loadedCnt, _setLoadedCnt] = useState(0)
  const [_docsArr, _setDocsArr] = useState(null) //처음에는 null을 넣는다
  const [_docsOutputArr, _setDocsOutputArr] = useState(null)
  const [_nextDoc, _setNextDoc] = useState(null)
  const [_isPending, _setIsPending] = useState(true) //보류하는 거
  const [_scrollTop, _setScrollTop] = useState(0)
  const [_coatchShow, _setCoatchShow] = useState(fnCoatchShow())
  const navi = useNavigate()

  const fnGetDocsHandler = useCallback( //highorder function
    async (cnt) => {
      _setIsPending(true)
      const { docsArr, nextDoc } = await fnGetDocs(auth.currentUser.uid, cnt) //목록을 새로 만들거나 삭제할 때 목록 5개만 나오게 하겠다 스크롤바가 생길 정도로 만들어야 한다
      const docsCnt = await fnGetDocsCnt(auth.currentUser.uid) //순서, onSnapshot 안쪽에서는 캐싱이 되는 걸로 추측됨
      _setDocsCnt(docsCnt); _setDocsArr(docsArr); _setDocsOutputArr(docsArr); _setNextDoc(nextDoc);
      _setLoadedCnt(cnt)
      _setIsPending(false)
    }
  ,[])


  useEffect(() => {
    let init = true //변수를 사용해야 한다
    //로그인 상태가 변할 때마다 할 일
    onAuthStateChanged(auth, () => {
      if (auth.currentUser && (auth.currentUser.emailVerified || auth.currentUser.email === 'guest@mail.com')) { //로그인 상태라면
        _setIsLogged(true)
        navi('/')

        //앱이 시작했을 때 문서를 가져온다
        fnGetDocsHandler(5)

        //데이터 베이스가 변할 때마다 할 일(문서를 가져온다)
        onSnapshot(collection(db, auth.currentUser.uid), (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added" || change.type === "removed") { //문서를 추가하거나 삭제했을 때
              _setScrollTop(0)
              fnGetDocsHandler(5) //문서목록을 불러온다
            }
          })
        })
      } else { //로그아웃 상태라면
        _setIsLogged(false)
        navi('/signin')
      }

      
      if (init) { //처음 접속했을 경우
        _setFadeOut(true) //모달은 사라진다
        init = false //처음에만 로그인이 등록이 된 순간만 동작해라
      }
    }) //변화가 감지될 때마다 


    if(window.localStorage.getItem('coatchExpires')){
      const expires = parseInt(window.localStorage.getItem('coatchExpires'))
      if(Date.now() > expires){
        _setCoatchShow(true)
        window.localStorage.removeItem('coatchExpires')
      }
    }

  }, []) //이벤트는 한번만, 변하는 state는 절대로 useEffect안에서 사용하면 안 된다, 변수로 사용해야 한다

  return (
    <AppContext.Provider value={{
      _isLogged, _setIsLogged,
      _showLoader, _setShowLoader,
      _fadeOut, _setFadeOut,
      _docsCnt, _setDocsCnt,
      _docsArr, _setDocsArr,
      _docsOutputArr, _setDocsOutputArr,
      _nextDoc, _setNextDoc,
      _isPending, _setIsPending,
      _loadedCnt, _setLoadedCnt,
      _scrollTop, _setScrollTop,
      fnGetDocsHandler,
      _coatchShow, _setCoatchShow,
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
            <Route path="/detail/:docid" element={<CompDetail />} />
            <Route path="*" element={<Comp404 />} />
          </Routes>
        </article>
      </main>
      {(_showLoader) && <CompLoader />}
      {_coatchShow && <CompCoatch/>}
    </AppContext.Provider>
  );
}

export default App;

/* 
app 자체가 main이다 
리액트에서는 반드시 alt=""로 해야 한다
*/