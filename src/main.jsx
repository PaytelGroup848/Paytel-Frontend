import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { queryClient } from './services/queryClient';
import App from './App.jsx';
import './index.css';

const DarkHtml = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  return children;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DarkHtml>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1E293B',
                color: '#F1F5F9',
                border: '1px solid rgba(255,255,255,0.10)',
              },
            }}
          />
        </DarkHtml>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
