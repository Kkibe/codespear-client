import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { ModeContextProvider } from './ModeContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModeContextProvider>
  </React.StrictMode>,
)
