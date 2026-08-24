"use client"

import React from "react"
import { motion } from "motion/react"

import {
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  Cell,
  Sector,
} from "recharts"

import { ChartContainer } from "@/components/ui/chart"


function EdenPieChart({
  data,
  config,
  nameKey,
  dataKey,
  classname = "h-[300px] w-full",
  children,
  fill = "var(--color-desktop)",
  innerRadius = 0,
  outerRadius = "80%",
  paddingAngle = 0,
  animation = "none",
  ...props
}) {
  return (
    <ChartContainer
      config={config}
      className={classname}
    >
      <PieChart>

        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          isAnimationActive={true}
          shape={(pieProps) => {
            const {
              cx,
              cy,
              innerRadius,
              outerRadius,
              startAngle,
              endAngle,
              fill,
            } = pieProps

            if (animation === "appear") {
              return (
                <motion.g
                  initial={{
                    scale: 1,
                    opacity: 1,
                  }}
                  whileHover={{
                    scale: 1.2,
                    filter:["blur(6px),blur(0px)"],
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  style={{
                    transformOrigin: `${cx}px ${cy}px`,
                  }}
                >
                  <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                  />
                </motion.g>
              )
            }

            return (
              <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
              />
            )
          }}
          {...props}
        >
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill || fill}
            />
          ))}
        </Pie>

        {children}

      </PieChart>
    </ChartContainer>
  )
}


// TOOLTIP

function Tooltip({
  ...props
}) {
  return (
    <RechartsTooltip
      {...props}
    />
  )
}


// LEGEND

function Legend({
  verticalAlign = "bottom",
  align = "center",
  ...props
}) {
  return (
    <RechartsLegend
      verticalAlign={verticalAlign}
      align={align}
      {...props}></RechartsLegend>
  )
}



EdenPieChart.Tooltip = Tooltip
EdenPieChart.Legend = Legend

export default EdenPieChart