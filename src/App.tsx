import React from 'react';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/MainLayout';

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
