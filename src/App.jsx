import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Onboarding from "./components/Onboarding/Onboarding";
import SellerDashboard from "./components/Dashboard/SellerDashboard";
import BuyerProfile from "./components/profile/BuyerProfile";
import DealRoom from "./components/DealRoom/DealRoom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider, useUser } from "./contexts/UserContext";

// Update the AuthRedirect component
const AuthRedirect = () => {
  const { user } = useUser();
  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/onboarding" replace />
  );
};

// Add a new component to handle onboarding access
const OnboardingRoute = () => {
  const { user } = useUser();
  return user ? <Navigate to="/dashboard" replace /> : <Onboarding />;
};

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<AuthRedirect />} />
              <Route path="/onboarding" element={<OnboardingRoute />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/buyer/:id"
                element={
                  <ProtectedRoute>
                    <BuyerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/deal/:id"
                element={
                  <ProtectedRoute>
                    <DealRoom />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<AuthRedirect />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
