import React from "react";
import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const PriceGraghView = ({ timeIntervals, priceData, countries }) => {

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
     * random color(except white)
     * @author 연상훈
     * @param None
     * @returns {number} color
     */
    const getRandomColor = () => {
        let color;
        do {
            color = `#${((1 << 24) * Math.random() | 0).toString(16)}`;
        } while (color === '#ffffff');
        return color;
    };

    /**
     * price format
     * @author 연상훈
     * @param {number} value 
     * @returns {text} 0,000원
     * @info Display in Korean won with thousand-unit separators.
     */
    const formatPrice = (value) => {
        if (value === null || value === undefined) return '';
        return `${value.toLocaleString()}원`;
    };

    return (
        <>
            {priceData && priceData.length > 0 ? (
                <>
                    <h3>[ 구분 : {timeIntervals} ]</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={priceData} margin={{ left: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            {/* this applies only tickMargin, not margin. */}
                            <XAxis dataKey="date" tickMargin={15} />
                            <YAxis 
                                domain={['auto', 'auto']} // min & max values will be updated automatically
                                tickFormatter={formatPrice}
                            />
                            <Tooltip formatter={formatPrice} />
                            {countries.map((country) => (
                                <Line 
                                    key={country} 
                                    type="monotone" // line style
                                    dataKey={country}
                                    name={country}
                                    stroke={getRandomColor()} // random color
                                    style={{ strokeWidth: 2 }} // line thickness
                                    dot={false} // disable dots on line
                                />
                            ))}
                            {/* Legend applies only padding, not margin and tickMargin. */}
                            <Legend wrapperStyle={{ paddingTop: "20px" }} />
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
                <p>검색 결과가 없습니다.</p>
            )}
        </>
    );
};

export default PriceGraghView;
