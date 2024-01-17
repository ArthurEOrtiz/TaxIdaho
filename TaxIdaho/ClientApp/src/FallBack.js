import React from 'react';

export const FallBack = ({ error, resetErrorBoundary }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Oops! Something went wrong</h2>
      <div style={styles.errorContainer}>
        <p style={styles.errorMessage}>Error Message:</p>
        <pre style={styles.errorPre}>{error.message}</pre>
      </div>
      <button style={styles.retryButton} onClick={resetErrorBoundary}>
        Retry
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  errorContainer: {
    backgroundColor: '#FFEBE5',
    padding: '1rem',
    borderRadius: '8px',
    margin: '1rem',
  },
  errorMessage: {
    fontWeight: 'bold',
  },
  errorPre: {
    color: '#FF0000',
    whiteSpace: 'pre-wrap',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    marginTop: '1rem',
  },
};

