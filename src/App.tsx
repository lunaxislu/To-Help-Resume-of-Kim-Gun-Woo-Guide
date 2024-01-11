import React from 'react';
import './App.css';
import Router from './router/Router';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
const queryclient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
