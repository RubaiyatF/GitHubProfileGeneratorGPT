"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const AnimatedSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  AnimatedSliderProps
>(({ className, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => (
  <div className="relative space-y-4">
    <div className="relative h-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={value[0]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl font-bold text-center"
        >
          {value[0]}
        </motion.div>
      </AnimatePresence>
    </div>
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      value={value}
      onValueChange={onValueChange}
      max={max}
      min={min}
      step={step}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <SliderPrimitive.Range className="absolute h-full bg-black dark:bg-white" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-black bg-white dark:border-white dark:bg-gray-900 ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  </div>
));
