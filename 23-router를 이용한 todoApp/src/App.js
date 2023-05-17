import { Route, Routes } from "react-router-dom";
import CompAddList from "./components/CompAddList";
import CompDetail from "./components/CompDetail";
import CompHome from "./components/CompHome"; /* 바뀌는 주소들은 import는 해준다 */
import CompTitle from "./components/CompTitle";
import { createContext, useState } from "react";

export const AppContext = createContext()

function App() {
  const [_todoArr, _setTodoArr] = useState([]) //빈배열로 시작
  return (
    <AppContext.Provider value={{_todoArr, _setTodoArr}}>
      <CompTitle/> {/* 페이지마다 나오게 한다라는 의미 */}
      <Routes>
        <Route path='/' element={<CompHome/>}/>
        <Route path='/add' element={<CompAddList/>}/>
        <Route path='/detail/:todoID' element={<CompDetail/>}/> {/* todoID 이름은 아무거나 적어도 상관없으나 id로 적는다 id말고 다른 것들도 받아야 한다*/}
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
