"use client"

import React from "react"

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts"

import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"


// ─────────────────────────────
// ROOT
// ─────────────────────────────

function EdenLineCharts({
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
      <LineChart
        accessibilityLayer
        data={data}
      >
        {children}
      </LineChart>
    </ChartContainer>
  )
}


// ─────────────────────────────
// X AXIS
// ─────────────────────────────

function XAxis({
  dataKey,
  tickLine = false,
  tickMargin = 7,
  axisLine = false,
  tickFormatter,
  ...props
}) {
  return (
    <RechartsXAxis
      dataKey={dataKey}
      tickLine={tickLine}
      tickMargin={tickMargin}
      axisLine={axisLine}
      tickFormatter={tickFormatter}
      {...props}
    />
  )
}


// ─────────────────────────────
// Y AXIS
// ─────────────────────────────

function YAxis({
  dataKey,
  tickLine = false,
  tickMargin = 7,
  axisLine = false,
  tickFormatter,
  ...props
}) {
  return (
    <RechartsYAxis
      dataKey={dataKey}
      tickLine={tickLine}
      tickMargin={tickMargin}
      axisLine={axisLine}
      tickFormatter={tickFormatter}
      {...props}
    />
  )
}


// ─────────────────────────────
// GRID
// ─────────────────────────────

function Grid({
  vertical = false,
  horizontal = true,
  strokeDasharray = "3 3",
  ...props
}) {
  return (
    <CartesianGrid
      vertical={vertical}
      horizontal={horizontal}
      strokeDasharray={strokeDasharray}
      {...props}
    />
  )
}


// ─────────────────────────────
// LINE
// ─────────────────────────────

function EdenLine({
  dataKey,
  stroke = "var(--color-desktop)",
  strokeWidth = 2,
  type = "monotone",
  dot = false,
  activeDot = true,
  ...props
}) {
  return (
    <Line
      dataKey={dataKey}
      stroke={stroke}
      strokeWidth={strokeWidth}
      type={type}
      dot={dot}
      activeDot={activeDot}
      {...props}
    />
  )
}


// ─────────────────────────────
// TOOLTIP
// ─────────────────────────────

function Tooltip({
  cursor = false,
  ...props
}) {
  return (
    <RechartsTooltip
      cursor={cursor}
      {...props}
    />
  )
}


// ─────────────────────────────
// LEGEND
// ─────────────────────────────

function Legend({
  verticalAlign = "top",
  align = "right",
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

EdenLineCharts.XAxis = XAxis
EdenLineCharts.YAxis = YAxis
EdenLineCharts.Grid = Grid
EdenLineCharts.Line = EdenLine
EdenLineCharts.Tooltip = Tooltip
EdenLineCharts.Legend = Legend

export default EdenLineCharts