import { useState } from "react";
import CompHeader from "./components/compHeader/CompHeader";
import fb from "./fb/config";
import CompSignin from "./components/compSingin/CompSignin";


function App() {
  const [_islogged, _setIsLogged] = useState(null)


  return (
    <main>
      <img className="main-bg" src={require('./assets/img/common/main-bg.png')} alt="" />
      <h1>
        <img src={require('./assets/img/header/title-main.png')} alt="" />
      </h1>
      <article>
        <CompHeader/>
        <CompSignin/>
      </article>
    </main>
  );
}

export default App;

/* 
app 자체가 main이다 
리액트에서는 반드시 alt=""로 해야 한다
*/