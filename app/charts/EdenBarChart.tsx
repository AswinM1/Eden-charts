"use client"

import React from "react"
import {motion} from "motion/react"

import {
  Bar,
  BarChart,
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

function EdenBarChart({
  data,
  config,
  classname = "h-[300px] w-full",
  animation="none",
  children,
  gap="5%"
}) {

    
  return (
    <ChartContainer
      config={config}
      className={classname}
    >
      <BarChart
        accessibilityLayer
        data={data}
        barCategoryGap={gap}
     
        
      >
        {children}
      </BarChart>
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
// BAR
// ─────────────────────────────

function EdenBar({
  dataKey,
  fill = `var(--color-${dataKey})`,
  radius = 4,

  animation = "none",

  variant = "solid",
  colors = ["#3b82f6", "#8b5cf6", "#ec4899"],

  ...props
}) {
  const gradientId = `linear-gradient-${dataKey}`

  const barFill =
    variant === "gradient"
      ? `url(#${gradientId})`
      : fill

  return (
    <>
      {variant === "gradient" && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
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

      <Bar
        dataKey={dataKey}
        fill={barFill}
        radius={radius}
        isAnimationActive={false}
        shape={(barProps) => {
          const {
            x,
            y,
            width,
            height,
          } = barProps

          if (animation === "expand") {
            return (
              <motion.rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={radius}
                fill={barFill}
                initial={{
                  opacity: 0,
                  scaleY: 0,
                }}
                animate={{
                  opacity: 1,
                  scaleY: 1,
                }}
                style={{
                  transformOrigin: `${x + width / 2}px ${y + height}px`,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
              />
            )
          }

          return (
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              rx={radius}
              fill={barFill}
            />
          )
        }}
        {...props}
      />
    </>
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

EdenBarChart.XAxis = XAxis
EdenBarChart.YAxis = YAxis
EdenBarChart.Grid = Grid
EdenBarChart.Bar = EdenBar
EdenBarChart.Tooltip = Tooltip
EdenBarChart.Legend = Legend


export default EdenBarChart