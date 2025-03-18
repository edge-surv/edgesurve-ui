"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  animationEnabled?: boolean
}

export function Logo({ className, animationEnabled = true }: LogoProps) {
  const [animationClass, setAnimationClass] = useState("")

  useEffect(() => {
    if (animationEnabled) {
      // Create a sequence of animations that change over time
      const startAnimation = () => {
        // Start with a subtle pulse
        setAnimationClass("animate-logo-pulse")

        // After 5 seconds, switch to a bounce
        const timer1 = setTimeout(() => {
          setAnimationClass("animate-logo-bounce")

          // After another 5 seconds, switch to a combined effect
          const timer2 = setTimeout(() => {
            setAnimationClass("animate-logo-pulse hover:animate-logo-bounce transition-all duration-300")

            // Reset the cycle after 5 more seconds
            const timer3 = setTimeout(() => {
              startAnimation()
            }, 5000)

            return () => clearTimeout(timer3)
          }, 5000)

          return () => clearTimeout(timer2)
        }, 5000)

        return () => clearTimeout(timer1)
      }

      startAnimation()
    }
  }, [animationEnabled])

  return (
    <div
      className={cn("flex items-center justify-center group transition-all duration-300 hover:scale-105", className)}
    >
      <svg
        className={cn("w-full h-auto max-w-[150px]", animationClass)}
        viewBox="0 0 5000 5000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <text
            x="574.75"
            y="2698.28"
            className="fill-current stroke-current stroke-[3px] text-[676.71px]"
            style={{ fontFamily: "sans-serif", fontWeight: "bold" }}
          >
            edge
          </text>
          <text
            x="2462.78"
            y="2698.28"
            className="fill-current stroke-current stroke-[3px] text-[676.71px]"
            style={{ fontFamily: "sans-serif", fontWeight: "bold" }}
          >
            surve
          </text>
        </g>
      </svg>
    </div>
  )
}

