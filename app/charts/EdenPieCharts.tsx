"use client"

import React from "react"

import {
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  Cell,
} from "recharts"

import {
  ChartContainer,
} from "@/components/ui/chart"


// ─────────────────────────────
// ROOT
// ─────────────────────────────

function EdenPieCharts({
  data,
  config,
  classname = "h-[300px] w-full",
  children,
}) {
  return (
    <ChartContainer
      config={config}
      className={classname}
    >
      <PieChart accessibilityLayer>
        {children}
      </PieChart>
    </ChartContainer>
  )
}


// ─────────────────────────────
// PIE
// ─────────────────────────────

function EdenPie({
  data,
  dataKey,
  nameKey,
  fill = "var(--color-desktop)",
  innerRadius = 0,
  outerRadius = "80%",
  paddingAngle = 0,
  ...props
}) {
  return (
    <Pie
      data={data}
      dataKey={dataKey}
      nameKey={nameKey}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      paddingAngle={paddingAngle}
      {...props}
    >
      {data?.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={entry.fill || fill}
        />
      ))}
    </Pie>
  )
}


// ─────────────────────────────
// TOOLTIP
// ─────────────────────────────

function Tooltip({
  ...props
}) {
  return (
    <RechartsTooltip
      {...props}
    />
  )
}


// ─────────────────────────────
// LEGEND
// ─────────────────────────────

function Legend({
  verticalAlign = "bottom",
  align = "center",
  ...props
}) {
  return (
    <RechartsLegend
      verticalAlign={verticalAlign}
      align={align}
      {...props}
    />
  )
}


// ─────────────────────────────
// COMPOUND API
// ─────────────────────────────

EdenPieCharts.Pie = EdenPie
EdenPieCharts.Tooltip = Tooltip
EdenPieCharts.Legend = Legend

export default EdenPieCharts