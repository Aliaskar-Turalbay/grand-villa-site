import React from 'react'
import ReactDOM from 'react-dom/client'
import GrandVillaPortal from './GrandVillaPortal'
import './index.css' // <-- ОБЯЗАТЕЛЬНО ПРОВЕРЬ ЭТУ СТРОКУ

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GrandVillaPortal />
  </React.StrictMode>,
)