"use client"
import Image from "next/image";
import EdenAreaCharts from "./charts/EdenAreaCharts";
import { ChartConfig } from "@/components/ui/chart";
import EdenBarChart from "./charts/EdenBarChart";
import EdenLineCharts from "./charts/EdenLineCharts";
import EdenPieChart from "./charts/EdenPieCharts";
import EdenRadarCharts from "./charts/EdenRadarCharts";

export default function Home() {
const chartConfig = {
  chrome: {
    label: "Chrome",
    colors: {
      light: ["#3b82f6"],
      dark: ["#60a5fa"],
    },
  },
  safari: {
    label: "Safari",
    colors: {
      light: ["#10b981"],
      dark: ["#34d399"],
    },
  },
  firefox: {
    label: "Firefox",
    colors: {
      light: ["#f59e0b"],
      dark: ["#fbbf24"],
    },
  },
  edge: {
    label: "Edge",
    colors: {
      light: ["#8b5cf6"],
      dark: ["#a78bfa"],
    },
  },
  other: {
    label: "Other",
    colors: {
      light: ["#6b7280"],
      dark: ["#9ca3af"],
    },
  },
} satisfies ChartConfig;



const data = [
  { browser: "chrome", visitors: 275 },
  { browser: "safari", visitors: 200 },
  { browser: "firefox", visitors: 187 },
  { browser: "edge", visitors: 173 },
  { browser: "other", visitors: 90 },
];

  return (

 
  <EdenRadarCharts
  data={data}
  config={chartConfig}

 
>
  <EdenRadarCharts.Grid />
  <EdenRadarCharts.AngleAxis dataKey="browser" />
  <EdenRadarCharts.RadiusAxis />

  <EdenRadarCharts.Radar
    dataKey="visitors"
    variant="gradient"
    animation="appear"
    fill="gradient"
  />

  <EdenRadarCharts.Tooltip />
  <EdenRadarCharts.Legend />
</EdenRadarCharts>
  

  );
}
