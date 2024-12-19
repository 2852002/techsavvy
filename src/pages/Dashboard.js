import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";
import PerformanceChart from "../components/PerformanceChart";
import HeatMapTable from "../components/HeatMapTable.js";
import "../styles/Dashboard.css";
import "../styles/performanceChart.css";
import "../styles/HeatMapTable.css";

const Dashboard = () => {
  const [selectedMetrics] = useState(["CPC", "CR_perc", "ROAS"]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <Sidebar setIsOpen={setIsSidebarOpen} />
      <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
        <Topbar />
        <div className="main-content">
          <div className="chart-container">
            <PerformanceChart metrics={selectedMetrics} />
          </div>
          <div className="heatmap-container">
            <HeatMapTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
