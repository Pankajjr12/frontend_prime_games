import React, { useEffect } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchSellerReport } from "../../../state/Seller/sellerSlice";
import ReportCard from "./report/ReportCard";
import SellingChart from "./SellingChart";
import { motion } from "framer-motion"; // For animations

const Chart = [
  { name: "Today", value: "today" },
  { name: "Last 7 days", value: "daily" },
  { name: "Last 12 Month", value: "monthly" },
];

const HomePage = () => {
  const { sellers } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const [chartType, setChartType] = React.useState(Chart[0].value);

  useEffect(() => {
    dispatch(fetchSellerReport(localStorage.getItem("jwt") || ""));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };

  return (
    <div className="space-y-5 px-2 sm:px-6 lg:px-10">
      {/* Report Cards Grid with Hover Animations */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {[
          { icon: <AccountBalanceIcon />, value: "$" + sellers.report?.totalEarnings, title: "Total Earnings" },
          { icon: <AccountBalanceIcon />, value: sellers.report?.totalSales, title: "Total Sales" },
          { icon: <AccountBalanceIcon />, value: sellers.report?.totalRefunds, title: "Total Refund" },
          { icon: <AccountBalanceIcon />, value: sellers.report?.canceledOrders, title: "Cancel Orders" },
        ].map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="transition-transform duration-300 rounded-lg bg-gradient-to-r from-primary-color to-gray-950 p-2 shadow-lg hover:shadow-xl"
          >
            <ReportCard icon={card.icon} value={card.value} title={card.title} />
          </motion.div>
        ))}
      </motion.section>

      {/* Chart and Select with Smooth Transition */}
      <motion.div
        className="h-auto space-y-5 p-5 bg-slate-800 rounded-md shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-full sm:w-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <FormControl fullWidth>
            <InputLabel sx={{ color: "white" }} id="chart-type-select-label">
              Chart Type
            </InputLabel>
            <Select
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                ".MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              labelId="chart-type-select-label"
              id="chart-type-select"
              value={chartType}
              label="Chart Type"
              onChange={handleChange}
            >
              {Chart.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </motion.div>

        {/* Animated Chart Component */}
        <motion.div
          className="h-[300px] sm:h-[350px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <SellingChart chartType={chartType} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
