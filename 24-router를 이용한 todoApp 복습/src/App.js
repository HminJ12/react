import { Route, Routes } from "react-router-dom";
import CompTitle from "./components/CompTitle";
import CompMain from "./components/CompMain";
import CompAdd from "./components/CompAdd";
import CompDetail from "./components/CompDetail";
import Comp404 from "./components/Comp404";
import sampleArr from "./store/store"
import { createContext, useState } from "react";
export const AppContext = createContext()

const todoArr = [...sampleArr] // 원본배열은 밖에서 만든다 초기화 되지 말아라, samleArr을 복사한다


function App() {
  const [_orgArr, _setOrgArr] = useState(todoArr) //조건을 걸 배열
  const [_todoArr, _setTodoArr] = useState(todoArr) //초기값으로 넣어줌, 출력

  return (
    <AppContext.Provider value={{_orgArr, _setOrgArr, _todoArr, _setTodoArr}}>
      <CompTitle/> {/* 주소 상관없이 무조건 나온다 */}
      <hr />
      <Routes>
        <Route path="/" element={<CompMain/>}/>
        <Route path="/add" element={<CompAdd/>}/>
        <Route path="/detail/:id" element={<CompDetail/>}/> {/* id 선언 */}
        <Route path="/*" element={<Comp404/>}/> {/* else if인 셈이다, 순서가 중요하다, 반드시 아래에 만들어줘야 한다*/}
        {/* Route 주소 설정 */}
      </Routes> {/* 묶어줄 범위 설정 */}
    </AppContext.Provider>
  );
}

export default App;

// 브라우저 라우터를 먼저 감싸줘야 한다(index.js에서 감싸준다)
// 라우츠 라우터