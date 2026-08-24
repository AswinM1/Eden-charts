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
  fill = "red",
  radius = 4,
  animation = "none",
  widthValue="12px",
 
  ...props
}) {
  return (
    <Bar
      dataKey={dataKey}
      fill={fill}
      radius={radius}
      isAnimationActive={false}
      shape={
        (barProps) => {
        const {
          x,
          y,
          width,
          height,
        } = barProps
      

        if (animation === "expand") {
              const initialX = x + (width - 10) / 2
          return (
            <motion.rect
              x={x}
              y={y}
              width={width}
              height={height}
              rx={radius}
              
              initial={{
                opacity: 1,
                z:0,
                filter:"blur(0px)"
            
              }}
              
              whileHover={{
                opacity: 1,
              
                z:10,
                scale:1.2,
               
             

              }}
              
              transition={{
                duration: 0.3,
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
            fill={fill}
          />
        )
      }}
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

EdenBarChart.XAxis = XAxis
EdenBarChart.YAxis = YAxis
EdenBarChart.Grid = Grid
EdenBarChart.Bar = EdenBar
EdenBarChart.Tooltip = Tooltip
EdenBarChart.Legend = Legend


export default EdenBarChart