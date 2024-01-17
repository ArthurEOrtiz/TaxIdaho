/*"use client";*/
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { ErrorBoundary } from 'react-error-boundary';
import { FallBack } from './FallBack';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ FallBack }>
      <Layout>
        <Routes>
          {AppRoutes.map(({ element, ...rest }, index) => (
            <Route key={index} {...rest} element={element} />
          ))}
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
