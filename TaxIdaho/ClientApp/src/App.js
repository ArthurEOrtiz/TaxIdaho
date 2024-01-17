"use client";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { ErrorBoundary } from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ Fallback }>
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
