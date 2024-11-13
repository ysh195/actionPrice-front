/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { colors } from "../../assets/assest";

const PriceGraphView = ({ timeIntervals, priceData, countries }) => {
  /**
   * priceData
   * [
   *  {
   *      "date": date,
   *      "country1": price1,
   *      "country2": price2,
   *      ...,
   *  },
   *  ...,
   * ]
   */

  /**
   * countries
   * ["country1", "country2", ...]
   */

  /**
   * random color(except black, white)
   * @author 연상훈
   * @param None
   * @returns {number} color
   */
  const getRandomColor = () => {
    let color;
    do {
      color = `#${(((1 << 24) * Math.random()) | 0)
        .toString(16)
        .padStart(6, "0")}`;
    } while (color === "#ffffff" || color === "#000000");
    return color;
  };

  /**
   * useState and useEffect for saving line colors
   * @author 연상훈
   * @info If this is not present, the color changes every time the mouse is hovered over.
   */
  const [lineColors, setLineColors] = useState({});
  useEffect(() => {
    const colors = {};
    countries.forEach((country) => {
      colors[country] = getRandomColor();
    });
    setLineColors(colors);
  }, [countries]);

  /**
   * price format
   * @author 연상훈
   * @param {number} value
   * @returns {text} 0,000원
   * @info Display in Korean won with thousand-unit separators.
   */
  const formatPrice = (value) => {
    if (value === null || value === undefined) return "";
    return `${value.toLocaleString()}원`;
  };

  const [highLightedLine, setHighLightedLine] = useState(null);

  /**
   * mouse movement event on lines - activate
   * @author 연상훈
   * @param {text} country
   * @info set highlighted line if the new one differs from the existing one
   */
  // const handleMouseMove = (country) => {
  //   if (highLightedLine !== country) {
  //     setHighLightedLine(country);
  //   }
  // };

  const handleMouseMove = debounce((country) => {
    if (highLightedLine !== country) {
      setHighLightedLine(country);
    }
  }, 200); // 200ms delay before executing

  /**
   * mouse movement event on lines - unactivate
   * @author 연상훈
   * @info It is difficult to select the line
   * and the style kept changing every time the mouse moved, making it confusing.
   * so I disabled it.
   */
  // const handleMouseLeave = () => {
  //     setHighLightedLine(null);
  // };

  return (
    <div
      className="price-graph-container"
      style={{
        zIndex: 2,
        margin: "3rem 0",
        padding: "2rem 2rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "90%",
      }}
    >
      {priceData && priceData.length > 0 ? (
        <>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "500",
              color: "#333",
              marginBottom: "20px",
            }}
          >
            [ 구분 : {timeIntervals} ]
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={priceData} margin={{ left: 30, top: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* this applies only tickMargin, not margin. */}
              <XAxis dataKey="date" tickMargin={13} />
              <YAxis
                domain={["auto", "auto"]} // min & max values will be updated automatically
                tickFormatter={formatPrice}
              />
              <Tooltip formatter={formatPrice} />
              {countries.map((country) => (
                <Line
                  key={country}
                  type="monotone" // line style
                  dataKey={country}
                  name={country}
                  stroke={lineColors[country]} // saved random color
                  strokeWidth={highLightedLine === country ? 3 : 2} // line thickness and now highlight only the seleceted one
                  dot={highLightedLine === country ? { r: 6 } : false} // dot style for the price lines. and now activate only the seleceted one
                  activeDot={highLightedLine === country ? { r: 6 } : { r: 4 }}
                  // dot style for the date lines
                  onMouseMove={() => handleMouseMove(country)}
                />
              ))}

              {/* Legend applies only padding, not margin and tickMargin. */}
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "14px",
                  color: "#666",
                }}
              />
              {/* Up and right/circle icon */}

              {/* <Legend
                               align="right"
                             verticalAlign="top"
                            iconType="circle"
                             iconSize={12}
                               wrapperStyle={{ paddingBottom: "20px" }}
                      /> */}
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "400px",
          }}
        >
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "18px",
              color: "#888",
              textAlign: "center",
              pointerEvents: "none", // makes text unclickable
            }}
          >
            검색 결과가 없습니다.
          </p>
          {/* Render empty chart if no data */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[{ date: "", value: 0 }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={formatPrice} />
              <Tooltip formatter={(value) => `${value.toLocaleString()}원`} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ccc"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PriceGraphView;
