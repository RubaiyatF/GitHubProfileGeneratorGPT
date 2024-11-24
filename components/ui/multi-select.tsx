"use client";
import React, { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    { value = [], onChange, onKeyDown, options, placeholder, className = "" },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>(value);

    useEffect(() => {
      setSelected(value);
    }, [value]);

    const handleSelect = (option: string) => {
      const newSelected = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      setSelected(newSelected);
      onChange(newSelected);
    };

    const handleRemove = (optionToRemove: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const newSelected = selected.filter((item) => item !== optionToRemove);
      setSelected(newSelected);
      onChange(newSelected);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        setOpen(!open);
      }
      onKeyDown?.(e);
    };

    return (
      <div
        className={`relative ${className}`}
        ref={ref}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <motion.button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`w-full min-h-[56px] p-2 text-left bg-background border-2 border-input rounded-lg 
            focus:border-primary focus:ring-1 focus:ring-primary text-foreground flex flex-wrap items-center gap-2`}
          onClick={() => setOpen(!open)}
        >
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            selected.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md"
              >
                {item}
                <button
                  type="button"
                  onClick={(e) => handleRemove(item, e)}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X size={14} />
                </button>
              </span>
            ))
          )}
          <ChevronDown
            className={`ml-auto transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-1 bg-background border-2 border-input rounded-lg shadow-lg max-h-60 overflow-auto"
              role="listbox"
            >
              {options.map((option) => (
                <motion.li
                  key={option}
                  role="option"
                  aria-selected={selected.includes(option)}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-accent
                    ${
                      selected.includes(option)
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  onClick={() => handleSelect(option)}
                  whileHover={{ backgroundColor: "rgba(var(--accent)/0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="w-4 h-4">
                    {selected.includes(option) && <Check size={16} />}
                  </span>
                  {option}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
