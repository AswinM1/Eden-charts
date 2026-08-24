"use client"

import React from "react"

import { ChartContainer } from "@/components/ui/chart"
import { type ChartConfig } from "@/components/ui/chart"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend as RechartsLegend,
  Tooltip as RechartsTooltip,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
} from "recharts"

function EdenAreaCharts({
  data,
  config,
  classname = "h-[300px] w-full",
  children,
}) {
  return (
    <div>
      <ChartContainer
        config={config}
        className={classname}
      >
        <AreaChart
          accessibilityLayer
          data={data}
        >
          {children}
        </AreaChart>
      </ChartContainer>
    </div>
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
// AREA
// ─────────────────────────────

function EdenArea({
  dataKey,
  variation = "solid",
  stroke = "var(--color-desktop)",
  strokeWidth = 2,
  fillOpacity = 0.3,
  ...props
}) {
  const gradientId = `gradient-${dataKey}`

  return (
    <>
      <defs>
        {variation === "gradient" && (
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor={stroke}
              stopOpacity={0.5}
            />

            <stop
              offset="50%"
              stopColor={stroke}
              stopOpacity={0.2}
            />

            <stop
              offset="100%"
              stopColor={stroke}
              stopOpacity={0}
            />
          </linearGradient>
        )}
      </defs>

      <Area
        dataKey={dataKey}
        
        fill={
          variation === "gradient"
            ? `url(#${gradientId})`
            : stroke
        }
        stroke={stroke}
        strokeWidth={strokeWidth}
        fillOpacity={fillOpacity}
        {...props}
      />
    </>
  )
}


// ─────────────────────────────
// BAR
// ─────────────────────────────

function EdenBar({
  dataKey,
  fill = "var(--color-desktop)",
  radius = 4,
  ...props
}) {
  return (
    <Bar
      dataKey={dataKey}
      fill={fill}
      radius={radius}
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

EdenAreaCharts.XAxis = XAxis
EdenAreaCharts.YAxis = YAxis
EdenAreaCharts.Grid = Grid
EdenAreaCharts.Area = EdenArea
EdenAreaCharts.Bar = EdenBar
EdenAreaCharts.Tooltip = Tooltip
EdenAreaCharts.Legend = Legend

export default EdenAreaCharts