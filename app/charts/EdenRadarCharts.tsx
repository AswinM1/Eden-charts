"use client"

import React from "react"

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts"

import { ChartContainer } from "@/components/ui/chart"

// ─────────────────────────────
// ROOT
// ─────────────────────────────

function EdenRadarCharts({
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
      <RadarChart
        accessibilityLayer
        data={data}
      >
        {children}
      </RadarChart>
    </ChartContainer>
  )
}

// ─────────────────────────────
// GRID
// ─────────────────────────────

function Grid({
  gridType = "polygon",
  radialLines = true,
  ...props
}) {
  return (
    <PolarGrid
      gridType={gridType}
      radialLines={radialLines}
      {...props}
    />
  )
}

// ─────────────────────────────
// ANGLE AXIS
// ─────────────────────────────

function AngleAxis({
  dataKey,
  ...props
}) {
  return (
    <PolarAngleAxis
      dataKey={dataKey}
      {...props}
    />
  )
}

// ─────────────────────────────
// RADIUS AXIS
// ─────────────────────────────

function RadiusAxis({
  tick = false,
  axisLine = false,
  tickCount = 5,
  ...props
}) {
  return (
    <PolarRadiusAxis
      tick={tick}
      axisLine={axisLine}
      tickCount={tickCount}
      {...props}
    />
  )
}

// ─────────────────────────────
// RADAR
// ─────────────────────────────

function EdenRadar({
  dataKey,
  stroke = "var(--color-desktop)",
  fill = "var(--color-desktop)",
  colors=["red","blue","green","yellow"],
  fillOpacity = 0.7,
  strokeWidth = 2,
  dot = false,
  ...props
}) {
    const gradientId = `radial-gradient-${dataKey}`
  return (
      <>
      <defs>
        {fill==="gradient" && (
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
           
                 {colors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          
          </linearGradient>
        )}
      </defs>
    <Radar
      dataKey={dataKey}
      stroke={stroke}
      fill={fill==="gradient" ? `url(#${gradientId})` : fill}
      fillOpacity={fillOpacity}
      strokeWidth={strokeWidth}
      dot={dot}
      {...props}
    />
    </>
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

EdenRadarCharts.Grid = Grid
EdenRadarCharts.AngleAxis = AngleAxis
EdenRadarCharts.RadiusAxis = RadiusAxis
EdenRadarCharts.Radar = EdenRadar
EdenRadarCharts.Tooltip = Tooltip
EdenRadarCharts.Legend = Legend

export default EdenRadarCharts