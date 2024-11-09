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

    // 랜덤색깔(흰색 제외)
    const getRandomColor = () => {
        let color;
        do {
            color = `#${((1 << 24) * Math.random() | 0).toString(16)}`;
        } while (color === '#ffffff'); // 흰색 제외
        return color;
    };

    // 가격 포맷
    const formatPrice = (value) => {
        if (value === null || value === undefined) return '';
        return `${value.toLocaleString()}원`;  // 천 단위로 구분, 원화 표기
    };

    return (
        <>
            {priceData && priceData.length > 0 ? (
                <>
                    <h3>[ 구분 : {timeIntervals} ]</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={priceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickMargin={15} />
                            <YAxis 
                                domain={['dataMin - 50', 'dataMax + 50']}
                                tickFormatter={formatPrice}
                            />
                            <Tooltip formatter={(value) => `${value.toLocaleString()}원`} />
                            {countries.map((country) => (
                                <Line 
                                key={country} 
                                type="monotone" 
                                dataKey={country}
                                name={country}
                                stroke={getRandomColor()} // random color
                                style={{ strokeWidth: 2 }}
                                dot={false}
                                />
                            ))}
                            <Legend wrapperStyle={{ paddingTop: "20px" }} />
                            {/* 오른쪽 위/아이콘 둥글게 */}
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
