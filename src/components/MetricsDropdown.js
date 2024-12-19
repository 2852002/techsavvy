import React, { useEffect, useState } from "react";
import apiClient, { setAuthHeaders } from "../api/baseApi.js";
import { AUTH_TOKEN, X_USER_IDENTITY } from "../config/authConfig.js";
import "../styles/metricsDropdown.css"; 

const MetricsDropdown = ({ onSelectMetric }) => {
  const [metrics, setMetrics] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setAuthHeaders(AUTH_TOKEN, X_USER_IDENTITY);

        const response = await apiClient.post("/day-parting/DayPartingFilterList", {
          type: "customizeMetrics",
        });

        if (response.data.success) {
          setMetrics(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching metrics list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const handleCheckboxChange = (e, metricCode) => {
    if (e.target.checked) {
      setSelectedMetrics([...selectedMetrics, metricCode]);
    } else {
      setSelectedMetrics(selectedMetrics.filter((item) => item !== metricCode));
    }
  };

  const handleApply = () => {
    onSelectMetric(selectedMetrics);
    setIsDropdownOpen(false);
  };

  const handleCancel = () => {
    setSelectedMetrics([]);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span>Select Metric</span>
        <span style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▼
        </span>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-list">
          {loading ? (
             <div className="spinner"></div>
          ) : (
            <div className="metrics-list">
              {metrics.map((metric) => (
                <div key={metric.code} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={metric.code}
                    value={metric.code}
                    onChange={(e) => handleCheckboxChange(e, metric.code)}
                    checked={selectedMetrics.includes(metric.code)}
                  />
                  <label htmlFor={metric.code}>{metric.label}</label>
                </div>
              ))}
            </div>
          )}

          <div className="actions">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleApply}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsDropdown;
