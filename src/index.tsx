import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

declare global {
  interface Window {
    Kakao: any;
  }
}

// 카카오 JavaScript SDK 초기화
const JAVASCRIPT_KEY =  process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

if (window.Kakao && !window.Kakao.isInitialized()) {
  if (!JAVASCRIPT_KEY) {
    console.error('Kakao JavaScript Key is missing.');
  } else {
    window.Kakao.init(JAVASCRIPT_KEY);
  }
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
    <App />
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
