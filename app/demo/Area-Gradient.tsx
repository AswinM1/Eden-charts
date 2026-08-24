"use client";

import EdenAreaCharts from "@/app/charts/EdenAreaCharts";

const data = [
  {
    month: "January",
    desktop: 186,
    mobile: 80,
  },
  {
    month: "February",
    desktop: 305,
    mobile: 200,
  },
  {
    month: "March",
    desktop: 237,
    mobile: 120,
  },
  {
    month: "April",
    desktop: 73,
    mobile: 190,
  },
  {
    month: "May",
    desktop: 209,
    mobile: 130,
  },
  {
    month: "June",
    desktop: 214,
    mobile: 140,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#3b82f6",
  },

  mobile: {
    label: "Mobile",
    color: "#8b5cf6",
  },
};

export default function AreaGradientDemo() {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-black/20 p-6">
      <EdenAreaCharts
        data={data}
        config={chartConfig}
      >
        <EdenAreaCharts.Grid />

        <EdenAreaCharts.XAxis
          dataKey="month"
        />

        <EdenAreaCharts.YAxis dataKey="mobile" tickFormatter={""} />

        <EdenAreaCharts.Area
          dataKey="desktop"
          stroke="#3b82f6"
          variation="gradient"
          animation="appear"
        />

        <EdenAreaCharts.Area
          dataKey="mobile"
          stroke="#8b5cf6"
          variation="gradient"
          animation="appear"
        />

        <EdenAreaCharts.Tooltip />

        <EdenAreaCharts.Legend />
      </EdenAreaCharts>
    </div>
  );
}