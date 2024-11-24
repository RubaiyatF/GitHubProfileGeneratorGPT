// app/create/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedForm } from "@/components/AnimatedForm"; // Your template component

// Define StepComponentProps interface if not exported from AnimatedForm
interface StepComponentProps {
  value: any;
  onChange: (value: any) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<any>;
}

// Define the input components that replicate the original functionality
const NameInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <motion.input
    ref={inputRef}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    whileFocus={{ scale: 1.02 }}
    className="w-full p-4 lg:p-6 text-lg lg:text-xl bg-background border-2 border-input rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
  />
);

const EmailInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <motion.input
    ref={inputRef}
    type="email"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    whileFocus={{ scale: 1.02 }}
    className="w-full p-4 lg:p-6 text-lg lg:text-xl bg-background border-2 border-input rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
  />
);

const MessageInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <motion.textarea
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    rows={6}
    whileFocus={{ scale: 1.02 }}
    className="w-full p-4 lg:p-6 text-lg lg:text-xl bg-background border-2 border-input rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
  />
);

// Define the steps configuration
const steps = [
  {
    title: "Enter your Name",
    key: "name",
    component: NameInput,
  },
  {
    title: "Enter your Email",
    key: "email",
    component: EmailInput,
  },
  {
    title: "Enter a Message here",
    key: "message",
    component: MessageInput,
  },
];

export default function CreatePage() {
  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle your form submission here
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatedForm steps={steps} onSubmit={handleSubmit} />
    </div>
  );
}
