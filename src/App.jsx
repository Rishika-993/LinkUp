import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Onboarding from "./components/Onboarding/Onboarding";
import SellerDashboard from "./components/Dashboard/SellerDashboard";
import BuyerProfile from "./components/profile/BuyerProfile";
import DealRoom from "./components/DealRoom/DealRoom";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Redirect to onboarding for this prototype */}
          <Route path="/" element={<Navigate to="/onboarding" />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<SellerDashboard />} />
          <Route path="/buyer/:id" element={<BuyerProfile />} />
          {/* A sample deal room route */}
          <Route path="/deal/123" element={<DealRoom />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
