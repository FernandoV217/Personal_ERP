import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { AppRouter } from './components/router/AppRouter.tsx'
import { store } from './app/store/store.ts'

// Core y Temas de PrimeReact (Esenciales para que se vea bien)
import "primereact/resources/themes/lara-light-indigo/theme.css";  // Tema
import "primereact/resources/primereact.min.css";                  // Estilos base
import "primeicons/primeicons.css";   

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
)
