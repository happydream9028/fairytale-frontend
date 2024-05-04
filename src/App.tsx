import React from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { store } from "./redux/store";

import "./i18n";
import routes from "./routes";

import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { LayoutProvider } from "./contexts/LayoutContext";
import ChartJsDefaults from "./utils/ChartJsDefaults";

import { AuthProvider } from "./contexts/FairytaleAuthContext";

import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";

export const ReactErrorFallbackComponent = ({ error }: { error: Error }) => {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
};

const App = () => {
  const content = useRoutes(routes);
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Club Admin & Dashboard" defaultTitle="Club Admin & Dashboard" />
      <Provider store={store}>
        <ThemeProvider>
          <SidebarProvider>
            <LayoutProvider>
              <ChartJsDefaults />
              <ErrorBoundary FallbackComponent={ReactErrorFallbackComponent}>
                <AuthProvider>{content}</AuthProvider>
              </ErrorBoundary>
            </LayoutProvider>
          </SidebarProvider>
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
