import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { DemoHeroGeometric } from './Demo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoHeroGeometric />
  </StrictMode>,
)
