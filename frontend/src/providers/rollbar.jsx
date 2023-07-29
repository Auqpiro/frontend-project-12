import { Provider, ErrorBoundary } from '@rollbar/react';

const CollectorProvider = ({ children }) => {
  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Provider>
  );
};

export default CollectorProvider;