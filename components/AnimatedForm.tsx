"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/logo";
import WordFadeIn from "@/components/ui/word-fade-in";

// Types
export interface StepComponentProps {
  value: any;
  onChange: (value: any) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<any>;
  formData: FormData;
  onStepChange: (step: number) => void;
  autoFocus?: boolean;
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
  stepperVariants: {
    initial: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  },
};

// Form Step Component
const FormStep: React.FC<{
  config: StepConfig;
  value: any;
  onChange: (value: any) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<any>;
  formData: FormData;
  onStepChange: (step: number) => void;
  direction: number;
  currentStep?: number;
}> = ({
  config,
  value,
  onChange,
  onKeyDown,
  inputRef,
  formData,
  onStepChange,
  direction,
  currentStep,
}) => {
  const StepComponent = config.component;
  const isReviewStep = currentStep === 20; // Adjust this number based on your review step

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animations.stepperVariants}
      custom={direction}
      className={`relative w-full px-4 md:px-8 ${
        isReviewStep ? "overflow-hidden" : "space-y-6"
      }`}
      style={{
        height: isReviewStep ? "100%" : "auto",
      }}
    >
      {currentStep !== 20 && (
        <div className="flex items-center space-x-4 justify-start w-full">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-20 h-20 md:w-24 md:h-24 text-primary"
          >
            <Logo />
          </motion.div>
          <WordFadeIn
            words={config.title}
            className="block text-2xl md:text-4xl font-medium text-foreground"
            delay={0.3}
          />
        </div>
      )}

      <div className={`w-full ${isReviewStep ? "h-full" : ""}`}>
        <StepComponent
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          inputRef={inputRef}
          formData={formData}
          onStepChange={onStepChange}
          autoFocus
        />
      </div>
    </motion.div>
  );
};

// Timeline Item Component
const TimelineItem: React.FC<{
  number: number;
  title: string;
  isActive: boolean;
  distanceFromCenter: number;
}> = ({ number, title, isActive, distanceFromCenter }) => {
  // Calculate opacity based on distance from center
  const opacity = Math.max(0, 1 - Math.abs(distanceFromCenter) * 0.4);

  return (
    <motion.div
      className="relative flex items-center h-[180px] px-8 md:px-12"
      style={{
        opacity,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <motion.div
        className={`absolute left-8 md:left-6 w-16 h-16 md:w-20 md:h-20 rounded-full border-3 flex items-center justify-center text-2xl md:text-3xl
          ${
            isActive
              ? "border-primary bg-primary text-primary-foreground"
              : "border-primary bg-primary text-primary-foreground"
          }`}
        animate={{
          scale: isActive ? [1, 1.1, 1] : 1,
          transition: {
            duration: 1,
            repeat: isActive ? Infinity : 0,
          },
        }}
      >
        {number}
      </motion.div>
      <div className="ml-24 md:ml-28">
        <h3
          className={`text-2xl lg:text-3xl font-medium ${
            isActive ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {title}
        </h3>
        {isActive && (
          <motion.div
            className="h-1 w-24 bg-primary mt-3"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Main Form Component
export const AnimatedForm: React.FC<{
  steps: StepConfig[];
  onSubmit: (data: FormData) => void;
  onStepChange?: (step: number, value: any, key: string) => void;
  initialStep?: number;
  initialFormData?: any;
}> = ({
  steps,
  onSubmit,
  onStepChange,
  initialStep = 1,
  initialFormData = {},
}) => {
  const [step, setStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState<FormData>(() => {
    // Initialize with either initialFormData or empty object with keys from steps
    return (
      initialFormData ||
      steps.reduce((acc, step) => ({ ...acc, [step.key]: "" }), {})
    );
  });

  const [ReviewToggle, setReviewToggle] = useState(false);
  useEffect(() => {
    if (step === steps.length) {
      console.log("Toggled ");
      setReviewToggle(true);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = 'auto';
    }
    return () => {
      // Cleanup: restore body scroll when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [step]);

  // Update form data when initialFormData changes
  useEffect(() => {
    if (initialFormData && Object.keys(initialFormData).length > 0) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const inputRef = useRef<any>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleNext = (e?: { preventDefault: () => void }) => {
    e?.preventDefault();

    if (step < steps.length) {
      setDirection(1);
      setStep((prev) => prev + 1);
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } else if (step === steps.length) {
      onSubmit(formData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  const handleChange = (value: any) => {
    const currentStep = steps[step - 1];
    const updatedFormData = { ...formData, [currentStep.key]: value };
    setFormData(updatedFormData);

    // Call onStepChange if provided
    if (onStepChange) {
      onStepChange(step, value, currentStep.key);
    }

    console.log(`Form data updated for step ${step}:`, {
      key: currentStep.key,
      value,
      formData: updatedFormData,
    });
  };

  const handleFormKeyDown = (e: React.KeyboardEvent) => {
    // Check if the current step uses MultipleSelector
    const isMultiSelectorStep = steps[step - 1].key === "languages" || steps[step - 1].key === "expertise";

    if (
      (e.target instanceof HTMLTextAreaElement &&
        e.key === "Enter" &&
        e.shiftKey) ||
      // Prevent Enter key from triggering step progression for MultipleSelector steps
      (isMultiSelectorStep && e.key === "Enter")
    ) {
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleNext();
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      handlePrevious();
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Check if the current step uses MultipleSelector
      const isMultiSelectorStep = steps[step - 1].key === "languages" || steps[step - 1].key === "expertise";

      if (
        (e.target instanceof HTMLTextAreaElement &&
          e.key === "Enter" &&
          e.shiftKey) ||
        // Prevent Enter key from triggering step progression for MultipleSelector steps
        (isMultiSelectorStep && e.key === "Enter")
      ) {
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [step, steps]);

  if (!steps || steps.length === 0) {
    return null;
  }

  const currentStepIndex = Math.min(Math.max(step - 1, 0), steps.length - 1);
  const currentStep = steps[currentStepIndex];

  return (
    <motion.div
      className="h-screen overflow-hidden flex bg-background"
      initial="hidden"
      animate="visible"
      variants={animations.pageVariants}
    >
      {/* Timeline Section */}
      <motion.div
        className="relative w-full md:w-1/4 h-full flex items-center overflow-hidden md:flex hidden"
        variants={animations.itemVariants}
      >
        {/* Timeline Container */}
        <div className="w-full relative py-60">
          {/* Timeline Items */}
          <div
            className="relative w-full"
            style={{
              transform: `translateY(${
                (steps.length / 2 - step + 0.5) * 180
              }px)`,
              transition: "transform 0.5s ease-out",
            }}
            ref={timelineRef}
          >
            {steps.map(({ title }, index) => {
              const itemStep = index + 1;
              const distanceFromCenter = itemStep - step;

              return (
                <TimelineItem
                  key={itemStep}
                  number={itemStep}
                  title={title}
                  isActive={itemStep === step}
                  distanceFromCenter={distanceFromCenter}
                />
              );
            })}
          </div>
        </div>

        {/* Fade Overlays */}
        {/* Fade Overlays with enhanced gradients */}
        <div
          className="absolute top-0 left-0 w-full h-32 z-10"
          style={{
            background: `linear-gradient(
      to bottom,
      var(--background) 0%,
      var(--background) 25%,
      rgba(var(--background-rgb), 0.9) 50%,
      rgba(var(--background-rgb), 0.5) 75%,
      transparent 100%
    )`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-32 z-10"
          style={{
            background: `linear-gradient(
      to top,
      var(--background) 0%,
      var(--background) 25%,
      rgba(var(--background-rgb), 0.9) 50%,
      rgba(var(--background-rgb), 0.5) 75%,
      transparent 100%
    )`,
          }}
        />
      </motion.div>

      {/* Form Section */}
      <motion.div
        className={`flex-1 h-full w-full md:w-3/4 flex items-center justify-center p-8 md:p-16`}
        variants={animations.formVariants}
        style={{
          maxHeight: "100vh",
          position: "relative",
          overflow: step === 20 ? "hidden" : "auto"
        }}
      >
        <motion.form
          className={`w-full max-w-full ${
            step === 20 ? "h-full" : "space-y-8"
          } px-4 md:px-8`}
          onSubmit={(e) => e.preventDefault()}
          onKeyDown={handleFormKeyDown}
          style={{
            overflow: step === 20 ? "hidden" : "visible",
            height: step === 20 ? "100%" : "auto",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <FormStep
              key={step}
              config={currentStep}
              value={formData[currentStep.key]}
              onChange={handleChange}
              onKeyDown={handleFormKeyDown}
              inputRef={inputRef}
              formData={formData}
              onStepChange={setStep}
              direction={direction}
              currentStep={step}
            />
          </AnimatePresence>
          <motion.div
            className="flex justify-end gap-6 mt-12"
            variants={animations.itemVariants}
          >
            {ReviewToggle && step < steps.length && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(steps.length)}
                className="px-8 py-4 text-lg lg:text-xl bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                type="button"
              >
                Done
              </motion.button>
            )}
            {!ReviewToggle && step > 1 && step < steps.length && (
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

            {!ReviewToggle && step < steps.length && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="px-8 py-4 text-lg lg:text-xl bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                type="button"
              >
                {step === steps.length ? "Submit" : "Next"}
              </motion.button>
            )}
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};
