"use client"
import Image from "next/image";
import EdenAreaCharts from "./charts/EdenAreaCharts";
import { ChartConfig } from "@/components/ui/chart";
import EdenBarChart from "./charts/EdenBarChart";
import EdenLineCharts from "./charts/EdenLineCharts";

export default function Home() {
  const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

  const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
  return (

 <EdenAreaCharts config={chartConfig} data={chartData}>
  <EdenAreaCharts.Area dataKey="mobile" animation="appear"></EdenAreaCharts.Area>
 </EdenAreaCharts>

  );
}
