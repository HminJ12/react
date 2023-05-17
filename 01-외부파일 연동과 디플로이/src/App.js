import './css/style.css';
import img2 from './img/img2.jpg'

function App() {
  let a = 1

  return (
    <>{/* 리액트 프래그먼트 */}
    <h1>리액트</h1>
    <p>리액트 {a} 시간</p>
    <img src={`${process.env.PUBLIC_URL}/img/img1.jpg`} alt="" /> <br />
    <img src={img2} alt="" /> <br />
    <img src={require('./img/img3.jpg')} alt="" />
    </>
  );
}

export default App;
