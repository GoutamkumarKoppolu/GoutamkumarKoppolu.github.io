import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { prefersReducedMotion } from './hooks/useScrollEffect'

// Fade-ins are opt-in, so content stays visible without JS or with reduced motion
if (!prefersReducedMotion()) document.documentElement.classList.add('js-motion')

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
// The production build ships pre-rendered HTML (scripts/prerender.mjs); dev starts empty
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
