import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SmoothScroll from './components/ui/SmoothScroll'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
)
