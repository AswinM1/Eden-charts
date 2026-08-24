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
    <EdenAreaCharts data={data} config={chartConfig}>
      <EdenAreaCharts.Grid />
      <EdenAreaCharts.XAxis dataKey="month" />
      <EdenAreaCharts.YAxis />

      <EdenAreaCharts.Area
        dataKey="desktop"
        variant="gradient"
        animation="appear"
         
        fill="white"
      />

      <EdenAreaCharts.Area
        dataKey="mobile"
        variant="gradient"
        colors={["yellow","red"]}
        fill="white"
        animation="appear"
        fillOpacity={1}
      />

      <EdenAreaCharts.Tooltip />
      <EdenAreaCharts.Legend />
    </EdenAreaCharts>
  );
}