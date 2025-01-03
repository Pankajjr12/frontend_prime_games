import React, { useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchRevenueChart } from "../../../state/Seller/revenueChartSlice";

const SellingChart = ({ chartType }: { chartType: string }) => {
  const dispatch = useAppDispatch();
  const { revenueChart } = useAppSelector((store) => store);

  useEffect(() => {
    if (chartType) {
      dispatch(fetchRevenueChart({ type: chartType }));
    }
  }, [chartType]);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart
        data={revenueChart.chart}
        margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0, // Reduced bottom margin to prevent chart being cut off
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#8884d8" />
        <YAxis dataKey="revenue" stroke="#8884d8" />
        <Tooltip />
        <Area type="monotone" dataKey="revenue" stroke="#94a3b8" fill="#ffffff" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SellingChart;
