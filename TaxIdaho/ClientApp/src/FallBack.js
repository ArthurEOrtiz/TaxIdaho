import React from 'react';
import './FallBack.css';

export const FallBack = ({ error, resetErrorBoundary }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div className="fallBackContainer">
      <h2 className="fallBackHeading">Oops! Something went wrong</h2>
      <div className="errorContainer">
        <p className="errorMessage">Error Message:</p>
        <pre className="errorPre">{error.message}</pre>
      </div>
      <button className="retryButton" onClick={resetErrorBoundary}>
        Retry
      </button>
    </div>
  );
};


