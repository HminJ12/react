import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './css/reset.css';
import './css/style.css';
import './css/header.css';
import './css/section-signin.css';
import './css/section-home.css';
import './css/section-signup.css';
import './css/section-add.css';
import './css/section-detail.css';
import './css/loader.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <img className='deco-top' src={require('./assets/img/common/top.png')} alt="" />
    <App />
    <footer>
      <img className='gif' src={require('./assets/img/footer/pencil-animated.gif')} alt="" />
      <p>Made by hanmm512@gmail.com</p>
      <img className='pencil' src={require('./assets/img/footer/pencil-footer.png')} alt="" />
    </footer> {/* 코드 줄일려고 여기서 footer를 만든다 */}
  </BrowserRouter>
);


