"use client"

import React from "react"
import { motion } from "motion/react"

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
    Brush
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

function BrushSlider({
  dataKey,
  height = 60,
  travellerWidth = 8,
  startIndex = 0,
  endIndex,
  ...props
}) {
  return (
    <Brush
      dataKey={dataKey}
      height={height}
      travellerWidth={travellerWidth}
      startIndex={startIndex}
      endIndex={endIndex}
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
  dot = false,
  activeDot = true,
  animation = "none",
  duration = 0.3,
  variant = "gradient",
  colors = [],

  ...props
}) {
  const gradientId = `line-gradient-${dataKey}`

  return (
    <>
      {variant === "gradient" && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {colors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>
      )}

      <Line
        dataKey={dataKey}
        stroke={
          variant === "gradient"
            ? `url(#${gradientId})`
            : stroke
        }
        strokeWidth={strokeWidth}
        dot={dot}
        activeDot={activeDot}
        isAnimationActive={false}
        shape={(lineProps) => {
          const { points } = lineProps

          if (!points || points.length === 0) {
            return null
          }

          const path = points
            .map((point, index) =>
              `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
            )
            .join(" ")

          const lineStroke =
            variant === "gradient"
              ? `url(#${gradientId})`
              : stroke

          if (animation === "appear") {
            return (
              <motion.path
                d={path}
                fill="none"
                stroke={lineStroke}
                strokeWidth={strokeWidth}
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration,
                  ease: "easeOut",
                }}
              />
            )
          }

          return (
            <path
              d={path}
              fill="none"
              stroke={lineStroke}
              strokeWidth={strokeWidth}
            />
          )
        }}
        {...props}
      />
    </>
  )
}



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



EdenLineCharts.XAxis = XAxis
EdenLineCharts.YAxis = YAxis
EdenLineCharts.Grid = Grid
EdenLineCharts.Line = EdenLine
EdenLineCharts.Tooltip = Tooltip
EdenLineCharts.Legend = Legend
EdenLineCharts.Brush = Brush

export default EdenLineCharts