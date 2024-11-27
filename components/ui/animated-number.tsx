"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./input";

interface AnimatedNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const AnimatedNumberInput: React.FC<AnimatedNumberInputProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  className,
  inputRef,
}) => {
  const previousValue = React.useRef(value);

  React.useEffect(() => {
    previousValue.current = value;
  }, [value]);

  const getAnimationDirection = () => {
    const prev = parseInt(previousValue.current) || 0;
    const current = parseInt(value) || 0;
    return prev > current ? -1 : 1;
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={className}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ y: 10 * getAnimationDirection(), opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10 * getAnimationDirection(), opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute top-1/2 left-6 -translate-y-1/2 pointer-events-none"
        >
          {value || placeholder}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
