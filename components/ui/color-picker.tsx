// components/ui/color-picker.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
}) => {
  const colors = [
    "#000000", // Black
    "#1E40AF", // Blue
    "#047857", // Green
    "#B91C1C", // Red
    "#7C3AED", // Purple
    "#EA580C", // Orange
    "#0369A1", // Light Blue
    "#4338CA", // Indigo
  ];

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <motion.button
            key={color}
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(color)}
            className={`w-8 h-8 rounded-full border-2 ${
              value === color ? "border-primary" : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
        <motion.div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-8 h-8"
            aria-label="Custom color picker"
          />
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-input flex items-center justify-center bg-background"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: value }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
