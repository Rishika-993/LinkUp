import { useState } from "react";
import { buyers as initialBuyers } from "../../mockData";
import { useUser } from "../../contexts/UserContext";
import BuyerCard from "./BuyerCard";
import "./SellerDashboard.css";


const SellerDashboard = () => {
  const [buyers, setBuyers] = useState(initialBuyers);
  const [filter, setFilter] = useState("all");
  const { user } = useUser();

  const handleDecision = (buyerId) => {
    // In a real app, this would be an API call. Here, we just filter the list.
    setBuyers((currentBuyers) => currentBuyers.filter((b) => b.id !== buyerId));
  };

  const isInRange = (buyerRange, filterRange) => {
    // Extract numbers from ranges (e.g., "$2M - $5M" -> [2, 5])
    const getNumbers = (range) => {
      return range.match(/\d+/g).map(Number);
    };

    if (filterRange === "1M-5M") {
      const [min, max] = getNumbers(buyerRange);
      return min >= 1 && max <= 5;
    }

    if (filterRange === "5M+") {
      const [min] = getNumbers(buyerRange);
      return min >= 5;
    }

    return false;
  };

  const filteredBuyers = buyers.filter((buyer) => {
    if (filter === "all") return true;
    if (filter === "verified") return buyer.isVerified;

    return isInRange(buyer.investmentRange, filter);
  });

  const renderWelcomeMessage = () => {
    const hour = new Date().getHours();
    let greeting = "";
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";

    return `${greeting}, ${user?.name || "Seller"}!`;
  };

  if (buyers.length === 0) {
    return (
      <div className="seller-dashboard">
        <div className="dashboard-header">
          <h1>{renderWelcomeMessage()}</h1>
          <p className="last-update">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="no-buyers-card">
          <h2>All Done!</h2>
          <p>
            You've reviewed all potential buyers for now. We'll notify you when
            new buyers match your profile.
          </p>
          <button
            className="refresh-button"
            onClick={() => setBuyers(initialBuyers)}
          >
            Refresh Buyers List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>{renderWelcomeMessage()}</h1>
        <p className="last-update">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
      <div className="dashboard-controls">
        <div className="dashboard-title">
          <div className="title-wrapper">
            <h2>Potential Buyers</h2>
            <div
              className="info-wrapper"
              title="Click on any buyer to view their detailed profile"
            >
              <span className="info-icon">ℹ️</span>
            </div>
          </div>
          <p className="dashboard-subtitle">
            You have <span className="highlight">{filteredBuyers.length}</span>{" "}
            potential buyers interested in your business
          </p>
        </div>
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Buyers</option>
            <option value="verified">Verified Only</option>
            <option value="1M-5M">$1M-$5M Range</option>
            <option value="5M+">$5M+ Range</option>
          </select>
        </div>
      </div>
      <div className="buyer-cards-container">
        {filteredBuyers.map((buyer) => (
          <BuyerCard key={buyer.id} buyer={buyer} onDecision={handleDecision} />
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
