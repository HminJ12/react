import { Route, Routes } from "react-router-dom";
import CompSignIn from "./components/CompSignIn";
import CompSignOut from "./components/CompSignOut";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CompSignOut/>}/>
        <Route path="/signin" element={<CompSignIn/>}/>
      </Routes>
    </>
  );
}

export default App;
