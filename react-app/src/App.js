import fb from "./fb/config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fb/auth";

import { Route, Routes, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import CompFooter from "./components/CompFooter";
import CompHeader from "./components/CompHeader";
import CompHome from "./components/CompHome";
import CompSignIn from "./components/CompSignIn";
import CompSignUp from "./components/CompSignUp";

export const AppContext = createContext()

function App() {
  const navi = useNavigate()
  const [_isLogged, _setIsLogged] = useState(false)

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        _setIsLogged(true)
        console.log(auth.currentUser);
      } else {
        _setIsLogged(false)
      }
    });
  },[])

  return (
    <AppContext.Provider value={{
      navi,
      _isLogged, _setIsLogged,
    }}>
      <CompHeader/>

      <Routes>
        <Route path="/" element={<CompHome/>}/>
        <Route path="/signin" element={<CompSignIn/>}/>
        <Route path="/signup" element={<CompSignUp/>}/>
      </Routes>

      <CompFooter/>
    </AppContext.Provider>
  );
}

export default App;
