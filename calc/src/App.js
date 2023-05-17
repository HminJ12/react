import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CompMenu from "./components/compMenu/CompMenu";
import CompCalc from "./components/compCalc/CompCalc";
import CompBMI from "./components/compBMI/CompBMI";
import CompDDay from "./components/compDDay/CompDDay";
import CompBackBtn from "./components/compBackBtn/CompBackBtn";
import { fnGetTheme } from './js/compMenu';
import { createContext, useEffect, useState } from "react";
export const AppContext = createContext()

function App() {
  const [_theme, _setTheme] = useState({1:false, 2:false, 3:false}) //처음에 아무도 체크 안 한다
  const location = useLocation()

  useEffect(()=>{
    _setTheme(fnGetTheme())
  },[])


  return (
    <AppContext.Provider value={{_theme, _setTheme}}>
      {(location.pathname !== '/')&&<CompBackBtn />}
      <Routes>
        <Route path="/" element={<CompMenu />} />
        <Route path="/calc" element={<CompCalc />} />
        <Route path="/bmi" element={<CompBMI />} />
        <Route path="/dday" element={<CompDDay />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
