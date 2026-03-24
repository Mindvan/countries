import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './app/styles/globalStyle'
import { ThemeProvider } from './app/providers/ThemeProvider/ui/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <GlobalStyle />
    <App />
  </ThemeProvider>
)
