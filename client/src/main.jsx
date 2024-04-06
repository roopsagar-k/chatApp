import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StyleEngineProvider } from '@mui/material/styles'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyleEngineProvider injectFirst>
      <App />
    </StyleEngineProvider>
  </React.StrictMode>,
)