import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import apiClient, { setAuthHeaders } from "../api/baseApi";
import { AUTH_TOKEN, X_USER_IDENTITY } from "../config/authConfig";
import MetricsDropdown from "./MetricsDropdown";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceChart = ({
  startDate = "2024-06-08",
  endDate = "2024-07-07",
}) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetrics, setSelectedMetrics] = useState(["CPC", "CR_perc", "ROAS"]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);

        setAuthHeaders(AUTH_TOKEN, X_USER_IDENTITY);

        const response = await apiClient.post(
          "/day-parting/DayPartingPerformanceGraphList",
          {
            startDate,
            endDate,
            metrics: selectedMetrics,
          }
        );

        if (response.data.success) {
          const categories = response.data.result.categories;
          const series = response.data.result.series;

          const datasets = series.map((item) => ({
            label: item.name,
            data: item.data,
            borderColor: getRandomColor(),
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderWidth: 1.5,
            tension: 0.4,
          }));

          setChartData({
            labels: categories,
            datasets: datasets,
          });
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [startDate, endDate, selectedMetrics]);

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  const handleSelectMetric = (metrics) => {
    setSelectedMetrics(metrics);
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", paddingTop: "10px", height: "500px" }}>
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div>
          <h3 style={{ fontSize: "1.2rem", textAlign: "start", fontWeight: "bold" }}>Performance Chart</h3>
          <p style={{ fontSize: "0.9rem", textAlign: "start", color: "grey", margin: 0 }}>
            Key Metrics for Dayparting Schedule Performance Evaluation
          </p>
        </div>
        {/* Metrics Dropdown */}
        <div style={{ width: "250px" }}>
          <MetricsDropdown onSelectMetric={handleSelectMetric} />
        </div>
      </div>

      {/* Divider */}
      <hr style={{ margin: "10px 0", borderColor: "#e0e0e0", borderWidth: "0.3px" }} />

      {/* Chart Section */}
      <div style={{ height: "80%", position: "relative" ,padding: "10px"}}>
        {loading ? (
          <div className="spinner"></div>
        ) : chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                },
              },
              scales: {
                x: {
                  ticks: {
                    font: {
                      size: 10,
                    },
                    maxTicksLimit: 10,
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    font: {
                      size: 10,
                    },
                    stepSize: 2,
                  },
                  grid: {
                    display: true,
                  },
                },
              },
              plugins: {
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: (tooltipItem) => {
                      const datasetLabel = tooltipItem.dataset.label || "";
                      const dataPointValue = tooltipItem.raw;
                      return `${datasetLabel}: ${dataPointValue.toFixed(2)}`;
                    },
                    footer: (tooltipItems) => {
                      const tooltipValues = tooltipItems.map((item) => item.raw);
                      const total = tooltipValues.reduce((acc, val) => acc + val, 0);
                      const average = (total / tooltipValues.length).toFixed(2);
                      return `Average: ${average}%`;
                    },
                  },
                },
                legend: {
                  labels: {
                    font: {
                      size: 10,
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default PerformanceChart;
