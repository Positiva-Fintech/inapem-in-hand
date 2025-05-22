import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { DemoHeroGeometric } from './Demo.tsx'
// import { SplashCursor } from "@/components/ui/splash-cursor"
import SplashCursor from './components/ui/SplashCursor.tsx'


// export function NoiseDemo() {
//   return (
//     // <SplashCursor />
//   )
// }


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SplashCursor />
    <DemoHeroGeometric />
  </StrictMode>,
)
