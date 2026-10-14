import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { prefersReducedMotion } from './hooks/useScrollEffect'

// Fade-ins are opt-in, so content stays visible without JS or with reduced motion
if (!prefersReducedMotion()) document.documentElement.classList.add('js-motion')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
