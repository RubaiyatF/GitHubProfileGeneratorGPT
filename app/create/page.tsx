"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import Logo from "@/components/ui/logo";
import TypingAnimation from "@/components/ui/typing-animation";

interface Question {
  id: number;
  text: string;
  type: "text" | "multiselect" | "radio" | "slider";
  options?: string[];
  min?: number;
  max?: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Welcome! Let's customize your GitHub profile. First, tell me your full name:",
    type: "text",
  },
  {
    id: 2,
    text: "What's your current role/designation?",
    type: "text",
  },
  {
    id: 3,
    text: "Pick your top skills (up to 5):",
    type: "multiselect",
    options: [
      "JavaScript",
      "Python",
      "Java",
      "React",
      "Node.js",
      "TypeScript",
      "Docker",
      "AWS",
    ],
  },
  {
    id: 4,
    text: "How many years of experience do you have?",
    type: "slider",
    min: 0,
    max: 20,
  },
];

interface QuestionCardProps {
  question: Question;
  answer: any;
  onAnswer: (value: any) => void;
  isOpen: boolean;
  onOpenChange: () => void;
  currentQuestion: number;
  setCurrentQuestion: (value: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onAnswer,
  isOpen,
  onOpenChange,
  currentQuestion,
  setCurrentQuestion,
}) => {
  const renderAnswer = () => {
    switch (question.type) {
      case "text":
        return (
          <Input
            value={answer || ""}
            onChange={(e) => onAnswer(e.target.value)}
            className="text-xl h-14"
            placeholder="Type your answer here..."
          />
        );
      case "multiselect":
        return (
          <div className="space-y-4">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id={option}
                  checked={(answer || []).includes(option)}
                  onChange={(e) => {
                    const newAnswer = answer || [];
                    if (e.target.checked && newAnswer.length < 5) {
                      onAnswer([...newAnswer, option]);
                    } else if (!e.target.checked) {
                      onAnswer(
                        newAnswer.filter((item: string) => item !== option)
                      );
                    }
                  }}
                  className="w-6 h-6"
                />
                <Label htmlFor={option} className="text-xl">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      case "slider":
        return (
          <div className="space-y-6">
            <Slider
              min={question.min}
              max={question.max}
              step={1}
              value={[answer || question.min || 0]}
              onValueChange={(value) => onAnswer(value[0])}
              className="w-full"
            />
            <p className="text-center text-xl">
              {answer || question.min || 0} years
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full"
    >
      <Card className="shadow-lg border-2">
        <Collapsible open={isOpen} onOpenChange={onOpenChange}>
          <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <span className="text-xl font-medium">
                {answer
                  ? `Selected: ${
                      Array.isArray(answer) ? answer.join(", ") : answer
                    }`
                  : "Choose your answer"}
              </span>
            </div>
            {isOpen ? (
              <ChevronUp className="h-6 w-6" />
            ) : (
              <ChevronDown className="h-6 w-6" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-6 border-t space-y-6">
              {renderAnswer()}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-6 py-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentQuestion(Math.max(0, currentQuestion - 1));
                  }}
                  disabled={currentQuestion === 0}
                >
                  git stash
                </Button>
                <Button
                  size="lg"
                  className="text-lg px-6 py-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (answer) {
                      setCurrentQuestion(
                        Math.min(questions.length - 1, currentQuestion + 1)
                      );
                    }
                  }}
                  disabled={currentQuestion === questions.length - 1 || !answer}
                >
                  git commit
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
};

const CreatePage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [openQuestion, setOpenQuestion] = useState(1);

  return (
    <div className="h-[calc(100vh-20px)] mt-[20px]">
      <div className="h-full relative px-4">
        {/* Timeline - Fixed left position */}
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gray-200">
          <motion.div
            className="absolute w-4 h-4 -left-[6px] bg-primary rounded-full shadow-lg border-2 border-black "
            initial={{ top: "50%" }}
            animate={{
              top: `${(currentQuestion / (questions.length - 1)) * 100}%`,
              backgroundColor: answers[questions[currentQuestion].id]
                ? "rgb(var(--primary))"
                : "white",
            }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </div>

        {/* Content Container - Centered vertically */}
        <div className="h-full flex items-center">
          <div className="w-full pl-16">
            {" "}
            {/* Padding to account for timeline */}
            <div className="max-w-2xl">
              {/* Logo and Question */}
              <div className="mb-8 flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 relative"
                  animate={{
                    y: [0, -8, 0], // Move up and down
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Logo />
                </motion.div>
                <div className="flex-1">
                  <TypingAnimation
                    text={questions[currentQuestion].text}
                    className="text-3xl text-left leading-tight"
                    duration={10}
                  />
                </div>
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={questions[currentQuestion].id}
                  question={questions[currentQuestion]}
                  answer={answers[questions[currentQuestion].id]}
                  onAnswer={(value) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [questions[currentQuestion].id]: value,
                    }))
                  }
                  isOpen={openQuestion === questions[currentQuestion].id}
                  onOpenChange={() =>
                    setOpenQuestion(questions[currentQuestion].id)
                  }
                  currentQuestion={currentQuestion}
                  setCurrentQuestion={setCurrentQuestion}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
