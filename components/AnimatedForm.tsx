"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/logo";
import WordFadeIn from "@/components/ui/word-fade-in";

// Types
export interface StepComponentProps {
  value: any;
  onChange: (value: any) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<any>;
}

interface StepConfig {
  title: string;
  key: string;
  component: React.ComponentType<StepComponentProps>;
}

interface FormData {
  [key: string]: any;
}

// Animation variants
const animations = {
  pageVariants: {
    hidden: {
      opacity: 0,
      y: -30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  },
  itemVariants: {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  },
  formVariants: {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  },
};

// Form Step Component
const FormStep: React.FC<{
  config: StepConfig;
  value: any;
  onChange: (value: any) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<any>;
}> = ({ config, value, onChange, onKeyDown, inputRef }) => {
  const StepComponent = config.component;

  return (
    <motion.div
      variants={animations.itemVariants}
      className="space-y-6 relative"
    >
      <div className="flex items-center space-x-4">
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 text-primary"
        >
          <Logo />
        </motion.div>
        <WordFadeIn
          words={config.title}
          className="block text-xl lg:text-2xl font-medium text-foreground"
          delay={0.3}
        />
      </div>

      <StepComponent
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputRef={inputRef}
      />
    </motion.div>
  );
};

// Main Form Component
export const AnimatedForm: React.FC<{
  steps: StepConfig[];
  onSubmit: (data: FormData) => void;
}> = ({ steps, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => {
    if (!steps || steps.length === 0) return {};
    return steps.reduce((acc, step) => ({ ...acc, [step.key]: "" }), {});
  });

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleNext = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (step === steps.length) {
      onSubmit(formData);
    } else {
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext(e);
    } else if (e.key === "Escape" && step > 1) {
      e.preventDefault();
      handlePrevious();
    }
  };

  if (!steps || steps.length === 0) {
    return null;
  }

  const currentStepIndex = Math.min(Math.max(step - 1, 0), steps.length - 1);
  const currentStep = steps[currentStepIndex];

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6"
      initial="hidden"
      animate="visible"
      variants={animations.pageVariants}
    >
      <div className="w-full max-w-[1800px] p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-24">
        {/* Timeline Section */}
        <motion.div className="relative lg:w-96 w-full lg:flex-shrink-0">
          <motion.div
            className="absolute left-6 lg:left-6 top-8 w-px bg-primary/20"
            initial={{ height: 0 }}
            animate={{ height: "calc(100% - 64px)" }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          {steps.map(({ title }, index) => {
            const number = index + 1;
            return (
              <motion.div
                key={number}
                className="relative flex items-center mb-20 pl-16 lg:pl-20"
                variants={animations.itemVariants}
                custom={index}
              >
                <motion.div
                  className={`absolute left-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg
                    ${
                      number <= step
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary/20 bg-white text-primary/20"
                    }`}
                  animate={{
                    scale: number === step ? [1, 1.1, 1] : 1,
                    transition: {
                      duration: 1,
                      repeat: number === step ? Infinity : 0,
                    },
                  }}
                >
                  {number}
                </motion.div>
                <div className="ml-6">
                  <h3
                    className={`text-xl lg:text-2xl font-medium ${
                      number <= step
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {title}
                  </h3>
                  {number === step && (
                    <motion.div
                      className="h-px w-16 bg-primary mt-2"
                      initial={{ width: 0 }}
                      animate={{ width: 64 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Form Section */}
        <motion.form
          variants={animations.formVariants}
          className="flex-1 space-y-8"
        >
          {currentStep && (
            <FormStep
              config={currentStep}
              value={formData[currentStep.key] || ""}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  [currentStep.key]: value,
                }))
              }
              onKeyDown={handleKeyDown}
              inputRef={inputRef}
            />
          )}

          <motion.div
            className="flex justify-end gap-6 mt-12"
            variants={animations.itemVariants}
          >
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrevious}
                className="px-8 py-4 text-lg lg:text-xl border-2 border-primary text-foreground rounded-lg hover:bg-accent transition-colors"
                type="button"
              >
                Previous
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="px-8 py-4 text-lg lg:text-xl bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              type="button"
            >
              {step === steps.length ? "Submit" : "Next"}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};
