"use client"

import React from "react"

import { ChartContainer } from "@/components/ui/chart"
import { type ChartConfig } from "@/components/ui/chart"
import {motion} from "motion/react"

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
import { mask } from "motion/react-client"

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

  variant = "solid",

  stroke = "var(--color-desktop)",
  strokeWidth = 2,
  fillOpacity = 0.3,

  colors = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
  ],

  animation = "none",

  duration = 1,

  ...props
}) {
  const maskId = `area-mask-${dataKey}`
  const gradientId = `area-gradient-${dataKey}`

  return (
    <>
      <defs>

       
        {animation === "appear" && (
          <mask id={maskId}>
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="white"
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration,
                ease: [0, 0.7, 0.5, 1],
              }}
              style={{
                originX: 0,
              }}
            />
          </mask>
        )}

       
        {variant === "gradient" && (
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            {colors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={color}
                stopOpacity={
                  index === colors.length - 1
                    ? 0
                    : 0.5
                }
              />
            ))}
          </linearGradient>
        )}

      </defs>

      <Area
        dataKey={dataKey}

        stroke={stroke}
        strokeWidth={strokeWidth}

        fill={
          variant === "gradient"
            ? `url(#${gradientId})`
            : stroke
        }

        fillOpacity={fillOpacity}

        style={
          animation === "appear"
            ? {
                mask: `url(#${maskId})`,
              }
            : undefined
        }

        {...props}
      />
    </>
  )
}

// ─────────────────────────────
// BAR
// ─────────────────────────────




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
EdenAreaCharts.Tooltip = Tooltip
EdenAreaCharts.Legend = Legend

export default EdenAreaCharts