import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const root = createRoot(document.getElementById('root')!);

root.render(
  <Auth0Provider
    domain="dev-xokz6d5x25ooh8x6.us.auth0.com"
    clientId="93Y27SJni9vPCeAmlGcxMwKRurVaevFz"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Auth0Provider>
)
