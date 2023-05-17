import { Route, Routes } from "react-router-dom";
import CompAdd from "./components/CompAdd";
import CompDetail from "./components/CompDetail";
import CompMain from "./components/CompMain";
import { createContext, useState } from "react";
export const AppContext = createContext()


const fnSetArr = () =>{
  let todoStorage = window.localStorage.getItem('todoStorage') 
  if(todoStorage){
    return JSON.parse(todoStorage) //자바스크립트 형태로 return한다
  }else{
    return [] //빈배열을 만든다, 빈배열이 없으면 컴포넌트main에서 length 찾다가 에러가 난다
  }
  //return arr
} //함수를 만든다 return해서 값을 받는다, 값이 없으면 null이 나온다
//초기에 storage가 있는지 없는지 확인한다 초기값을 만들어주는 거다

function App() {
  const [_orgArr, _setOrgArr] = useState(fnSetArr()) //원본배열
  const [_outputArr, _setOutputArr] = useState(fnSetArr()) //출력배열

  return (
    <AppContext.Provider value={{_orgArr, _setOrgArr, _outputArr, _setOutputArr}}>
      <h1>TodoApp</h1>
      <hr />
      <Routes>
        <Route path="/" element={<CompMain/>}/>
        <Route path="/add" element={<CompAdd/>}/>
        <Route path="/detail/:id" element={<CompDetail/>}/>
      </Routes> 
    </AppContext.Provider>
  );
}

export default App;

// detail에서 사용하기 위해 라우터에서 약속을 한다 path="/detail/:id" :id로 준다