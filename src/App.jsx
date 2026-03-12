import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import NavigationTracker from "@/lib/NavigationTracker";
import { pagesConfig } from "./pages.config";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import ProductDetail from "./pages/ProductDetail";

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) =>
  Layout ? (
    <Layout currentPageName={currentPageName}>{children}</Layout>
  ) : (
    <>{children}</>
  );

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } =
    useAuth();

  // Loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />;
    } else if (authError.type === "auth_required") {
      navigateToLogin();
      return null;
    }
  }

  // ✅ Dynamic routes from config (exclude ProductDetail so we control it explicitly)
  const dynamicRoutes = Object.entries(Pages).filter(
    ([key]) => key !== "ProductDetail"
  );

  return (
    <Routes>
      {/* Main page */}
      <Route
        path="/"
        element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        }
      />

      {/* ✅ ProductDetail routes (supports both ?id= and /:id) */}
      <Route
        path="/ProductDetail"
        element={
          <LayoutWrapper currentPageName="ProductDetail">
            <ProductDetail />
          </LayoutWrapper>
        }
      />
      <Route
        path="/ProductDetail/:id"
        element={
          <LayoutWrapper currentPageName="ProductDetail">
            <ProductDetail />
          </LayoutWrapper>
        }
      />
      <Route
        path="/product/:id"
        element={
          <LayoutWrapper currentPageName="ProductDetail">
            <ProductDetail />
          </LayoutWrapper>
        }
      />

      {/* Dynamic routes */}
      {dynamicRoutes.map(([key, Page]) => (
        <Route
          key={key}
          path={`/${key}`} // e.g. "Cart" -> "/Cart"
          element={
            <LayoutWrapper currentPageName={key}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
