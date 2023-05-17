import { useState } from "react";
import CompSumUl from "./components/CompSumUl";
import CompPoint from "./components/CompPoint";
import CompModal from "./components/CompModal";

function App() {
  const [_showUl, _setShowUl] = useState(true)
  const [_point, _setPoint] = useState([new Array(3).fill('x')])
  const [_showModal, _setShowModal] = useState(false)

  return (
    <>
      <h1>중첩 컴포넌트</h1>
      <hr />

      {
        (_showUl) && <CompSumUl _setShowUl={_setShowUl} _point={_point} _setPoint={_setPoint} _setShowModal={_setShowModal}/>
      }

      <hr />
      <CompPoint _point={_point}/>
      {(_showModal) && <CompModal _setShowUl={_setShowUl} _setPoint={_setPoint} _setShowModal={_setShowModal} />}
    </>
  );
}

export default App;
