"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedCatLogoProps {
  color?: string;
}

const AnimatedCatLogo: React.FC<AnimatedCatLogoProps> = ({ color }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalMouseMove = (event: {
      clientX: number;
      clientY: number;
    }) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      // Keep values within reasonable bounds even when cursor is outside
      const boundedX = Math.max(0, Math.min(100, x));
      const boundedY = Math.max(0, Math.min(100, y));

      setMousePosition({ x: boundedX, y: boundedY });
    };

    // Listen to mouse movement on the whole window
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const getEyePosition = () => {
    const maxMove = 5;
    const x = ((mousePosition.x - 50) / 50) * maxMove;
    const y = ((mousePosition.y - 50) / 50) * maxMove;
    return { x, y };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center bg-background"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="300 250 500 500"
        className="w-full h-full"
        style={color ? { color } : undefined}
      >
        <motion.g
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Cat body */}
          <g transform="matrix(1.56 0 0 1.56 539.57 541.21)">
            <path
              style={{
                fill: "currentColor",
                opacity: 1,
              }}
              className={color ? undefined : "text-foreground"}
              transform="translate(-112.73, -401.77)"
              d="M 224.5 351.2 C 225.4 331.09999999999997 222.7 311.59999999999997 215.9 292.59999999999997 C 215 290.2 213.9 289.29999999999995 211.4 289.99999999999994 C 205.8 291.69999999999993 200 292.99999999999994 194.5 294.99999999999994 C 179.3 300.49999999999994 165.4 308.49999999999994 151.9 317.19999999999993 C 150.5 318.0999999999999 148.4 318.69999999999993 146.70000000000002 318.3999999999999 C 124.60000000000002 314.49999999999994 102.40000000000002 314.69999999999993 80.20000000000002 318.0999999999999 C 78.00000000000001 318.3999999999999 75.20000000000002 317.8999999999999 73.40000000000002 316.7999999999999 C 57.70000000000002 306.5999999999999 41.70000000000002 296.5999999999999 23.40000000000002 291.7999999999999 C 8.30000000000002 287.7999999999999 11.40000000000002 286.9999999999999 7.100000000000019 300.6999999999999 C 2.0000000000000195 317.09999999999985 1.9539925233402755e-14 334.09999999999985 1.1000000000000192 351.2999999999999 C 1.2000000000000193 352.4999999999999 0.30000000000001914 353.9999999999999 -0.4999999999999809 355.0999999999999 C -7.09999999999998 362.9999999999999 -12.19999999999998 371.69999999999993 -15.299999999999981 381.4999999999999 C -21.299999999999983 400.4999999999999 -20.09999999999998 419.6999999999999 -16.299999999999983 438.7999999999999 C -8.799999999999983 476.2999999999999 16.500000000000014 502.5999999999999 53.90000000000002 509.0999999999999 C 73.20000000000002 512.4999999999999 93.10000000000002 512.8 111.20000000000002 514.3 C 131.4 512.8 150.10000000000002 512.6999999999999 168.3 509.79999999999995 C 200.10000000000002 504.69999999999993 224.10000000000002 487.79999999999995 236.10000000000002 457.09999999999997 C 240.3 446.4 242.60000000000002 434.7 244.00000000000003 423.29999999999995 C 247.10000000000002 398.09999999999997 242.80000000000004 374.49999999999994 225.60000000000002 354.59999999999997 C 225 353.8 224.5 352.4 224.5 351.2 z M 208.1 459.1 C 204.79999999999998 474.70000000000005 195.7 485.40000000000003 180.5 490.90000000000003 C 165.8 496.3 150.6 498.50000000000006 135.1 499.50000000000006 C 127.6 500.00000000000006 120.1 499.6000000000001 112.6 499.6000000000001 C 92.39999999999999 500.00000000000006 72.19999999999999 499.2000000000001 52.699999999999996 493.4000000000001 C 28.199999999999996 486.1000000000001 17.199999999999996 471.5000000000001 16.499999999999993 445.9000000000001 C 16.199999999999992 436.80000000000007 17.199999999999992 428.0000000000001 21.499999999999993 419.80000000000007 C 29.999999999999993 403.30000000000007 44.69999999999999 397.50000000000006 62.099999999999994 397.20000000000005 C 71.6 397.1 81.19999999999999 397.90000000000003 90.8 398.80000000000007 C 110.9 400.6000000000001 130.8 398.70000000000005 150.8 397.6000000000001 C 159.60000000000002 397.1000000000001 168.60000000000002 396.9000000000001 177.20000000000002 398.4000000000001 C 195.70000000000002 401.6000000000001 209.70000000000002 420.0000000000001 210 440.7000000000001 C 210 446.8 209.3 453.1 208.1 459.1 z"
            />
          </g>

          {/* Eyes container that moves together */}
          <motion.g
            animate={getEyePosition()}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
            }}
          >
            {/* Left Eye */}
            <g transform="matrix(1.56 0 0 1.56 468.45 609.66)">
              <path
                style={{
                  fill: "currentColor",
                  opacity: 1,
                }}
                className={color ? undefined : "text-foreground"}
                transform="translate(-67.21, -445.58)"
                d="M 56.1 424.8 C 50.6 430.5 48.7 437.7 48.4 444.1 C 48.4 453.70000000000005 51.199999999999996 461.40000000000003 56.1 466.40000000000003 C 62.9 473.3 72.2 473.1 78.7 466.1 C 88.5 455.5 88.4 435.6 78.7 425.1 C 72.2 418 62.7 417.9 56.1 424.8 z"
              />
            </g>

            {/* Right Eye */}
            <g transform="matrix(1.56 0 0 1.56 611.25 609.65)">
              <path
                style={{
                  fill: "currentColor",
                  opacity: 1,
                }}
                className={color ? undefined : "text-foreground"}
                transform="translate(-158.6, -445.58)"
                d="M 148.2 424 C 137 434.3 137 457 148.2 467.2 C 154.7 473.09999999999997 163.5 472.8 169.6 466.5 C 175.2 460.7 177.2 453.4 177.4 445.5 C 177.20000000000002 437.6 175.20000000000002 430.4 169.5 424.6 C 163.4 418.3 154.6 418.1 148.2 424 z"
              />
            </g>
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default AnimatedCatLogo;
