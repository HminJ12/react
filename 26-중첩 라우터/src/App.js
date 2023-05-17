import { Route, Routes } from "react-router-dom";
import CompFooter from "./components/CompFooter";
import CompHeader from "./components/CompHeader";
import CompMain from "./components/CompMain";
import CompGreet from "./components/CompGreet";
import CompSubWrap from "./components/CompSubWrap";
import CompLocation from "./components/CompLocation";
import CompBizIntro from "./components/CompBizIntro";
import CompBizArea from "./components/CompBizArea";
import CompAnnounment from "./components/CompAnnounment";
import CompFree from "./components/CompFree";

function App() {
  return (
    <>
      <CompHeader/>
        <Routes>
          <Route path="/" element={<CompMain/>}/>

          <Route path="/about" element={<CompSubWrap/>}> {/* 상위 주소 */}
            <Route path="greet" element={<CompGreet/>}/> {/* /about/greet에 있다는 의미, path에 이름만 적어야 한다 */}
            <Route path="location" element={<CompLocation/>}/>
          </Route>

          <Route path="/biz" element={<CompSubWrap/>}>
            <Route path="intro" element={<CompBizIntro/>}/>
            <Route path="area" element={<CompBizArea/>}/>
          </Route>

          <Route path="/customer" element={<CompSubWrap/>}>
            <Route path="notice" element={<CompAnnounment/>}/>
            <Route path="free" element={<CompFree/>}/>
          </Route>

        </Routes>
      <CompFooter/>
    </>
  );
}

export default App;
