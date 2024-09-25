import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Auth0Provider
      domain="dev-h3zygjqg5n1u3yk8.us.auth0.com"
      clientId="YOIUQJ4um2e0v32KvPI6n2Y7xVLKc3Wh"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
        <App />
    </Auth0Provider>
  </StrictMode>
);
