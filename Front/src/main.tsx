import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import App from './App.tsx'
import './index.css'
import Layout from './layout.tsx'
import { TimerProvider } from './context/TimerProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <TimerProvider>
          <App />
        </TimerProvider>
      </Layout>
    </ThemeProvider>
  </StrictMode>,
)
