import { Provider, ErrorBoundary } from '@rollbar/react';

function TestError() {
  const a = null;
  return a.hello();
}

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
        <TestError />
      </ErrorBoundary>
    </Provider>
  );
};

export default CollectorProvider;