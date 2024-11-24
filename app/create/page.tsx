"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/logo";
import WordFadeIn from "@/components/ui/word-fade-in";

const AnimatedForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const steps = [
    { number: 1, title: "Personal Details" },
    { number: 2, title: "Contact Information" },
    { number: 3, title: "Your Message" },
  ];

  const pageVariants = {
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
  };

  const itemVariants = {
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
  };

  const formVariants = {
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
  };

  const handleNext = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
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

          {steps.map(({ number, title }, index) => (
            <motion.div
              key={number}
              className="relative flex items-center mb-20 pl-16 lg:pl-20"
              variants={itemVariants}
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
                    number <= step ? "text-foreground" : "text-muted-foreground"
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
          ))}
        </motion.div>

        {/* Form Section */}
        <motion.form variants={formVariants} className="flex-1 space-y-8">
          {step === 1 && (
            <motion.div variants={itemVariants} className="space-y-6 relative">
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
                  words="Enter your Name"
                  className="block text-xl lg:text-2xl font-medium text-foreground"
                  delay={0.3}
                />
              </div>

              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                className="w-full p-4 lg:p-6 text-lg lg:text-xl bg-background border-2 border-input rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div variants={itemVariants} className="space-y-6 relative">
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
                  words="Enter your Email"
                  className="block text-xl lg:text-2xl font-medium text-foreground"
                  delay={0.3}
                />
              </div>

              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                className="w-full p-4 lg:p-6 text-lg lg:text-xl bg-background border-2 border-input rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div variants={itemVariants} className="space-y-6 relative">
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
                  words="Enter a Message here"
                  className="block text-xl lg:text-2xl font-medium text-foreground"
                  delay={0.3}
                />
              </div>

              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                className="w-full p-4 lg:p-6 text-lg lg:text-xl bg-background border-2 border-input rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </motion.div>
          )}

          <motion.div
            className="flex justify-end gap-6 mt-12"
            variants={itemVariants}
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
              {step === 3 ? "Submit" : "Next"}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default AnimatedForm;
