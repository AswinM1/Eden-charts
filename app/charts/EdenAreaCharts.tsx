"use client"

import React from "react"
import type { ComponentProps } from "react"

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
import { Slice } from "lucide-react"


type EdenAreaCharts={
    data:object[],
  config:Record<string, ChartConfig[string]>,
  children:React.ReactNode,
  classname?:string

}
function EdenAreaCharts({
  data,
  config,
  classname = "h-25 w-full",
  children,
}:EdenAreaCharts) {
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



function XAxis({
  dataKey,
  tickLine = false,
  tickMargin = 7,
  axisLine = false,
 tickFormatter=(Value) => Value.slice(0, 3),
  ...props
}:ComponentProps<typeof RechartsXAxis>) {
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
}:ComponentProps<typeof RechartsYAxis>) {
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
}:ComponentProps<typeof CartesianGrid>) {
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
type EdenArea={
    dataKey:string,
    variant:"solid"|"gradient",
    fill?:string,
    strokeWidth?:number,
    fillOpacity? :number,
    colors?:string[]
    animation?:"none"|"appear"
    duration?:number
   

    
}
function EdenArea ({
  dataKey,
  variant = "solid",
  fill = "blue",
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
}:EdenArea) {
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
                filter:"blur(0px)"
              }}
              animate={{
                scaleX: 1,
              
              }}
              transition={{
              
                
                duration:duration
               
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
                    : 1
                }
              />
            ))}
          </linearGradient>
        )}

      </defs>

      <Area
        dataKey={dataKey}
       
        stroke={fill}
        strokeWidth={strokeWidth}

        fill={
          variant === "gradient"
            ? `url(#${gradientId})`
            : fill
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
}:ComponentProps<typeof RechartsLegend>) {
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