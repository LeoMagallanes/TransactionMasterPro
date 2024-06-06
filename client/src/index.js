import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Crea un contenedor raíz en el DOM donde se montará la aplicación React
const root = ReactDOM.createRoot(document.getElementById('root'));
// Renderiza el componente App dentro de StrictMode, que ayuda a identificar problemas potenciales en la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
