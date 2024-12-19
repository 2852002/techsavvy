import React, { useEffect, useState } from "react";
import apiClient, { setAuthHeaders } from "../api/baseApi.js";
import { AUTH_TOKEN, X_USER_IDENTITY } from "../config/authConfig.js";
import "../styles/HeatMapTable.css";
import "../styles/performanceChart.css";


const HeatMapTable = () => {
  const [heatMapData, setHeatMapData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeatMap = async () => {
      try {
        setAuthHeaders(AUTH_TOKEN, X_USER_IDENTITY);

        const response = await apiClient.post("/day-parting/heatmap-list", {
          startDate: "2024-06-08",
          endDate: "2024-07-07",
          metrics: ["CPC", "CR_perc", "ROAS"],
        });

        if (response.data.success) {
          setHeatMapData(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeatMap();
  }, []);

  const calculateTotals = () => {
    const totals = heatMapData.reduce(
      (acc, weekData) => {
        weekData.Hourly_Data.forEach((hourData) => {
          acc.Total_CPC += hourData.CPC || 0;
          acc.Total_CR_perc += hourData.CR_perc || 0;
          acc.Total_ROAS += hourData.ROAS || 0;
        });
        return acc;
      },
      { Total_CPC: 0, Total_CR_perc: 0, Total_ROAS: 0 }
    );
    return totals;
  };

  const totals = calculateTotals();

  const renderTableHeader = () => {
    const weekdays = Array.from(
      new Set(heatMapData.map((data) => data.weekday))
    );
    return (
      <tr>
        <th>Time</th>
        {weekdays.map((day) => (
          <th colSpan="3" key={day}>
            {day}
          </th>
        ))}
      </tr>
    );
  };

  const renderMetricHeaders = () => {
    return (
      <tr>
        <th></th>
        {heatMapData.map((data) => (
          <>
            <th>CPC</th>
            <th>CR%</th>
            <th>ROAS</th>
          </>
        ))}
      </tr>
    );
  };

  const renderTableBody = () => {
    const timeIntervals = Array.from(
      new Set(heatMapData.flatMap((data) => data.Hourly_Data.map((hour) => hour.time_part)))
    );

    return timeIntervals.map((time, rowIndex) => (
      <tr key={`row-${rowIndex}`}>
        <td>{time}</td>
        {heatMapData.map((data) => {
          const hourData = data.Hourly_Data.find((hour) => hour.time_part === time);
          return (
            <>
              <td
                key={`${data.weekday}-CPC-${time}`}
                className="heat-cell"
                style={{ backgroundColor: getColor(hourData?.CPC) }}
                title={`CPC: ${hourData?.CPC || 0}`}
              >
                {hourData ? hourData.CPC.toFixed(4) : "-"}
              </td>
              <td
                key={`${data.weekday}-CR_perc-${time}`}
                className="heat-cell"
                style={{ backgroundColor: getColor(hourData?.CR_perc) }}
                title={`CR%: ${hourData?.CR_perc || 0}`}
              >
                {hourData ? hourData.CR_perc.toFixed(4) : "-"}
              </td>
              <td
                key={`${data.weekday}-ROAS-${time}`}
                className="heat-cell"
                style={{ backgroundColor: getColor(hourData?.ROAS) }}
                title={`ROAS: ${hourData?.ROAS || 0}`}
              >
                {hourData ? hourData.ROAS.toFixed(4) : "-"}
              </td>
            </>
          );
        })}
      </tr>
    ));
  };

  const renderTotalRow = () => {
    return (
      <tr>
        <td>Total</td>
        {heatMapData.map(() => (
          <>
            <td>{totals.Total_CPC.toFixed(4)}</td>
            <td>{totals.Total_CR_perc.toFixed(4)}</td>
            <td>{totals.Total_ROAS.toFixed(4)}</td>
          </>
        ))}
      </tr>
    );
  };

  const getColor = (value) => {
    if (!value) return "#ffffff"; 
    const max = 10;
    const intensity = Math.min(value / max, 1); 
    const lightBlue = { r: 22, g: 171, b: 212 }; // #16ABD4
    const lightCyan = { r: 144, g: 222, b: 243 }; // #90DEF3
    const lightPink = { r: 255, g: 217, b: 243 }; // #FFD9F3
    const lavenderPink = { r: 255, g: 191, b: 235 }; // #FFBFEB
    const lightPurple = { r: 191, g: 175, b: 243 }; // #BFADF3


    let startColor, endColor;

    if (intensity <= 0.25) {
      startColor = lightBlue;
      endColor = lightCyan;
    } else if (intensity <= 0.5) {
      startColor = lightCyan;
      endColor = lightPink;
    } else if (intensity <= 0.75) {
      startColor = lightPink;
      endColor = lavenderPink;
    } else {
      startColor = lavenderPink;
      endColor = lightPurple;
    }

    const blendedColor = blendColors(startColor, endColor, intensity);

    return rgbToRgba(blendedColor, 1); 
  };
  const blendColors = (color1, color2, ratio) => {
    const r = Math.round(color1.r + (color2.r - color1.r) * ratio);
    const g = Math.round(color1.g + (color2.g - color1.g) * ratio);
    const b = Math.round(color1.b + (color2.b - color1.b) * ratio);

    return { r, g, b };
  };
  const rgbToRgba = (rgb, alpha) => {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="heatmap-table-container">
      <h2>Heat Map</h2>

    <p className="select-hours-text">Select hours to schedule Dayparting</p> 
      <table className="heatmap-table">
        <thead>
          {renderTableHeader()}
          {renderMetricHeaders()}
        </thead>
        <tbody>
          {renderTableBody()}
          {renderTotalRow()}
        </tbody>
      </table>
    </div>
  );
};

export default HeatMapTable;
