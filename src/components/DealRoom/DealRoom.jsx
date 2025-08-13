import React, { useState } from "react";
import DealStageTracker from "./DealStageTracker";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./DealRoom.css";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const financialData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue ($k)",
      data: [120, 135, 150, 170, 160, 180],
      borderColor: "rgba(52, 120, 246, 1)",
      backgroundColor: "rgba(52, 120, 246, 0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const riskData = {
  labels: ["Low Risk (60%)", "Medium Risk (30%)", "High Risk (10%)"],
  datasets: [
    {
      label: "Risk Distribution",
      data: [60, 30, 10],
      backgroundColor: [
        "rgba(52, 196, 52, 0.7)", // Green for low risk
        "rgba(246, 192, 52, 0.7)", // Yellow for medium risk
        "rgba(246, 52, 52, 0.7)", // Red for high risk
      ],
      borderWidth: 1,
    },
  ],
};

/**
 * The central hub for a matched buyer and seller to complete the acquisition process.
 */
const DealRoom = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="deal-room-container">
      <div className="deal-room-header">
        <h1>Deal Room: Acquisition of "SaaSQuatch"</h1>
        <p>A secure, streamlined workspace to guide you from match to close.</p>
      </div>

      <DealStageTracker />

      <div className="deal-room-widgets">
        {/* Left column */}
        <div className="widget-column">
          <div className="widget">
            <h3>Secure Document Vault</h3>
            <p>
              Upload and share sensitive documents like financials and
              contracts. All files are encrypted and access is logged.
            </p>
            <button className="btn-secondary">Go to Vault</button>
          </div>
          <div className="widget">
            <h3>Secure Messaging</h3>
            <p>
              Keep all deal-related communication in one place. Your
              conversation history serves as a single source of truth.
            </p>
            <button className="btn-secondary">Open Chat</button>
          </div>
        </div>

        {/* Right column */}
        <div className="widget ai-widget">
          <div>
            <div className="ai-widget-header">
              <h3>AI Financial Analyzer</h3>
              <span className="ai-badge">BETA</span>
            </div>
            <p>
              Our AI can analyze uploaded financial statements (P&L, Balance
              Sheet) to summarize key metrics, identify trends, and flag
              potential risks, saving you hours of manual work.
            </p>
            <button
              className={`btn-primary ${isAnalyzing ? "loading" : ""}`}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Documents"}
            </button>
          </div>
          <div className="chart-container">
            <Line
              data={financialData}
              options={{
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>
      </div>

      <div className="chart-widgets">
        <div className="widget">
          <h3>Financial Trends</h3>
          <Line
            data={financialData}
            options={{
              plugins: { legend: { display: true } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>
        <div className="widget">
          <h3>Risk Distribution</h3>
          <Doughnut
            data={riskData}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    padding: 20,
                    font: {
                      size: 14,
                    },
                    generateLabels: (chart) => {
                      const datasets = chart.data.datasets;
                      return datasets[0].data.map((value, index) => ({
                        text: chart.data.labels[index],
                        fillStyle: datasets[0].backgroundColor[index],
                        strokeStyle: datasets[0].backgroundColor[index],
                        index: index,
                      }));
                    },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.label || "";
                      const value = context.formattedValue;
                      return `${label}: ${value}%`;
                    },
                  },
                },
              },
              cutout: "60%",
              radius: "90%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DealRoom;
