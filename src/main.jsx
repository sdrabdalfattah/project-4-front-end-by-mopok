import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />


  <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            width: "auto",
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 5000, 
        }}
      />

  </StrictMode>,
)
