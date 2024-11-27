"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ComboTagSelector from "@/components/ui/ComboTagSelector";
import { ColorPicker } from "@/components/ui/color-picker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedNumberInput } from "../ui/animated-number";
import { AnimatedSlider } from "../ui/animated-slider";
import spacetime from "spacetime";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/ui/multi-select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface StepComponentProps {
  value: any;
  onChange: (value: any) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<any>;
  onStepChange?: (e: React.KeyboardEvent) => void;
  formData?: any;
}

// Professional Information Inputs
const ProfessionalTitleInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="e.g., Senior Frontend Developer"
      className=" w-full py-8 px-8 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent text-4xl focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600"
    />
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        press Enter ↵ to continue
      </span>
    </kbd>
  </div>
);

const YearsExperienceInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => {
  const [sliderValue, setSliderValue] = React.useState([parseInt(value) || 2]);

  React.useEffect(() => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue !== sliderValue[0]) {
      setSliderValue([numValue]);
    }
  }, [value]);

  const handleSliderChange = (newValue: number[]) => {
    setSliderValue(newValue);
    onChange(newValue[0].toString());
  };

  return (
    <div className="relative w-full px-12 py-12">
      <AnimatedSlider
        value={sliderValue}
        onValueChange={handleSliderChange}
        min={0}
        max={50}
        step={1}
        className="w-full"
      />
      <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
        <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
          adjust value, then press Enter ↵ to continue
        </span>
      </kbd>
    </div>
  );
};

const OrganizationInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Current organization"
      className="w-full py-8 px-8 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent text-4xl focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600"
    />
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        press Enter ↵ to continue
      </span>
    </kbd>
  </div>
);

const LinkedInInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
  onStepChange,
}) => {
  const validateLinkedIn = (url: string) => {
    if (!url) return true; // Allow empty for skipping
    const linkedInRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return linkedInRegex.test(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default to handle navigation manually
      e.stopPropagation(); // Stop event from bubbling up

      if (!value) {
        // Skip if empty
        onKeyDown?.(e);
        return;
      }

      if (!validateLinkedIn(value)) {
        toast.error(
          "Please enter a valid LinkedIn profile URL or leave empty to skip"
        );
        return;
      }

      // Only proceed if validation passes
      onKeyDown?.(e);
    }
  };

  return (
    <div className="relative w-full px-12 py-12">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="LinkedIn profile URL (optional)"
        className="w-full py-8 px-8 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent text-4xl focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600"
      />
      <div className="absolute right-10 bottom-2 flex  items-end gap-1">
        <kbd className="hidden sm:inline-flex">
          <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
            Leave empty to skip this section | press Enter ↵ to{" "}
            {value ? "continue" : "skip"}
          </span>
        </kbd>
      </div>
    </div>
  );
};

const ProfessionalSummaryInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <Textarea
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Write a brief professional summary..."
      className="w-full min-h-[200px] py-8 px-8 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent text-xl focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600"
    />
    <div className="absolute right-10 bottom-2 flex items-end gap-1">
      <kbd className="hidden sm:inline-flex">
        <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
          Shift + Enter for new line | Enter ↵ to continue
        </span>
      </kbd>
    </div>
  </div>
);

const TimeZoneInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => {
  const [systemTimeZone, setSystemTimeZone] = React.useState("");

  React.useEffect(() => {
    // Get system timezone
    const now = spacetime.now();
    const timezone = now.timezone().name;
    setSystemTimeZone(timezone);

    // Set system timezone as default value on first load, but don't auto-advance
    if (!value) {
      onChange(timezone);
    }
  }, []);

  // List of common timezones with system timezone first
  const timeZones = React.useMemo(() => {
    const zones = [
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "America/Toronto",
      "Europe/London",
      "Europe/Paris",
      "Europe/Berlin",
      "Europe/Moscow",
      "Asia/Dubai",
      "Asia/Singapore",
      "Asia/Tokyo",
      "Asia/Shanghai",
      "Australia/Sydney",
      "Pacific/Auckland",
    ];

    // Remove system timezone from list if it exists to prevent duplication
    return zones.filter((zone) => zone !== systemTimeZone);
  }, [systemTimeZone]);

  const handleValueChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <div className="relative w-full px-12 py-12" onKeyDown={onKeyDown}>
      <Select value={value || systemTimeZone} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full py-8 px-8 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent text-xl focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200">
          <SelectValue placeholder="Select your timezone" />
        </SelectTrigger>
        <SelectContent>
          {systemTimeZone && (
            <SelectItem value={systemTimeZone}>
              {systemTimeZone} (System)
            </SelectItem>
          )}
          {timeZones.length > 0 && (
            <>
              <SelectItem value="divider" disabled>
                ───────────────
              </SelectItem>
              {timeZones.map((zone) => (
                <SelectItem key={zone} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
      <div className="absolute right-10 bottom-2 flex items-end gap-1">
        <kbd className="hidden sm:inline-flex">
          <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
            Press Enter ↵ to continue
          </span>
        </kbd>
      </div>
    </div>
  );
};

const PronounsInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => {
  const [customPronoun, setCustomPronoun] = useState(
    value?.type === "custom" ? value.value : ""
  );

  const handlePronounChange = (type: string) => {
    if (type === "custom") {
      onChange({ type, value: customPronoun });
    } else {
      onChange({ type, value: type });
    }
  };

  const handleCustomPronounChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setCustomPronoun(newValue);
    onChange({ type: "custom", value: newValue });
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-center">Pronouns</h3>
        <p className="text-sm text-muted-foreground text-center">
          How would you like to be referred to?
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <ToggleGroup
          type="single"
          value={value?.type || ""}
          onValueChange={handlePronounChange}
          className="justify-center flex-wrap gap-4"
        >
          <ToggleGroupItem
            value="he/him"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            he/him
          </ToggleGroupItem>
          <ToggleGroupItem
            value="she/her"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            she/her
          </ToggleGroupItem>
          <ToggleGroupItem
            value="they/them"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            they/them
          </ToggleGroupItem>
          <ToggleGroupItem
            value="custom"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            custom
          </ToggleGroupItem>
        </ToggleGroup>

        <AnimatePresence mode="wait">
          {value?.type === "custom" && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full max-w-xs overflow-hidden"
            >
              <Input
                ref={inputRef}
                type="text"
                placeholder="Enter your pronouns"
                value={customPronoun}
                onChange={handleCustomPronounChange}
                onKeyDown={onKeyDown}
                className="w-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish (Español)" },
  { value: "french", label: "French (Français)" },
  { value: "german", label: "German (Deutsch)" },
  { value: "chinese", label: "Chinese (中文)" },
  { value: "japanese", label: "Japanese (日本語)" },
  { value: "korean", label: "Korean (한국어)" },
  { value: "hindi", label: "Hindi (हिन्दी)" },
  { value: "arabic", label: "Arabic (العربية)" },
  { value: "portuguese", label: "Portuguese (Português)" },
  { value: "russian", label: "Russian (Русский)" },
  { value: "italian", label: "Italian (Italiano)" },
  { value: "dutch", label: "Dutch (Nederlands)" },
  { value: "turkish", label: "Turkish (Türkçe)" },
  { value: "vietnamese", label: "Vietnamese (Tiếng Việt)" },
  { value: "thai", label: "Thai (ไทย)" },
  { value: "polish", label: "Polish (Polski)" },
  { value: "indonesian", label: "Indonesian (Bahasa Indonesia)" },
  { value: "greek", label: "Greek (Ελληνικά)" },
  { value: "hebrew", label: "Hebrew (עברית)" },
];

const LanguagesInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <MultiSelector
      values={value || []}
      onValuesChange={onChange}
      loop={false}
      ref={inputRef}
      autoFocus={true}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select languages you speak" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {LANGUAGES.map((lang, i) => (
            <MultiSelectorItem key={i} value={lang.value}>
              {lang.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        Enter to select ↵
      </span>
    </kbd>
  </div>
);

const ExpertiseInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <MultiSelector
      values={value || []}
      onValuesChange={onChange}
      loop={false}
      ref={inputRef}
      autoFocus={true}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select your areas of expertise" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {[
            "Frontend Development",
            "Backend Development",
            "DevOps",
            "Cloud Computing",
            "Machine Learning",
          ].map((expertise, i) => (
            <MultiSelectorItem key={i} value={expertise}>
              {expertise}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        Enter to select ↵
      </span>
    </kbd>
  </div>
);

const RecentAchievementsInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <Textarea
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Share your recent achievements..."
      className="w-full min-h-[200px] py-8 px-8 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent text-4xl focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600"
    />
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        Shift + Enter for new line, Enter to continue
      </span>
    </kbd>
  </div>
);

const CollaborationInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <ToggleGroup
      ref={inputRef}
      value={value}
      onValueChange={onChange}
      type="single"
      className="w-full justify-start space-x-4 py-4 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:shadow-md transition-all duration-200"
    >
      <ToggleGroupItem value="yes">Yes</ToggleGroupItem>
      <ToggleGroupItem value="no">No</ToggleGroupItem>
    </ToggleGroup>
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        press Tab to toggle ⇥
      </span>
    </kbd>
  </div>
);

const MentorshipInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <ToggleGroup
      ref={inputRef}
      value={value}
      onValueChange={onChange}
      type="single"
      className="w-full justify-start space-x-4 py-4 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:shadow-md transition-all duration-200"
    >
      <ToggleGroupItem value="mentor">Willing to Mentor</ToggleGroupItem>
      <ToggleGroupItem value="mentee">Looking for Mentor</ToggleGroupItem>
      <ToggleGroupItem value="both">Both</ToggleGroupItem>
    </ToggleGroup>
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        press Tab to toggle ⇥
      </span>
    </kbd>
  </div>
);

const OpenSourceInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <ToggleGroup
      ref={inputRef}
      value={value}
      onValueChange={onChange}
      type="single"
      className="w-full justify-start space-x-4 py-4 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:shadow-md transition-all duration-200"
    >
      <ToggleGroupItem value="yes">Yes</ToggleGroupItem>
      <ToggleGroupItem value="no">No</ToggleGroupItem>
    </ToggleGroup>
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        press Tab to toggle ⇥
      </span>
    </kbd>
  </div>
);

interface ContactPreferences {
  email: boolean;
  linkedin: boolean;
  calendly: boolean;
  calendlyLink?: string;
}

const ContactPreferencesInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
  formData,
  onStepChange,
}) => {
  const [preferences, setPreferences] = useState<ContactPreferences>(
    value || {
      email: false,
      linkedin: false,
      calendly: false,
    }
  );
  const [calendlyInput, setCalendlyInput] = useState(
    preferences.calendlyLink || ""
  );

  const handlePreferenceChange = (
    key: keyof ContactPreferences,
    checked: boolean
  ) => {
    if (key === "linkedin" && checked) {
      // Check if LinkedIn value exists in form data
      if (!formData?.linkedIn) {
        toast.error("Please fill in your LinkedIn profile first");
        onStepChange?.(4);
        return;
      }
    }

    const newPreferences = {
      ...preferences,
      [key]: checked,
    };

    if (key === "calendly" && !checked) {
      delete newPreferences.calendlyLink;
      setCalendlyInput("");
    }

    setPreferences(newPreferences);
    onChange(newPreferences);
  };

  const handleCalendlyInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLink = e.target.value;
    setCalendlyInput(newLink);
    setPreferences((prev) => ({
      ...prev,
      calendlyLink: newLink,
    }));
    onChange({
      ...preferences,
      calendlyLink: newLink,
    });
  };

  return (
    <div className="relative w-full px-12 py-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="email" className="text-lg">
            Email Contact
          </Label>
          <Switch
            id="email"
            checked={preferences.email}
            onCheckedChange={(checked) =>
              handlePreferenceChange("email", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="linkedin" className="text-lg">
            LinkedIn Contact
          </Label>
          <Switch
            id="linkedin"
            checked={preferences.linkedin}
            onCheckedChange={(checked) =>
              handlePreferenceChange("linkedin", checked)
            }
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="calendly" className="text-lg">
              Calendly Meeting
            </Label>
            <Switch
              id="calendly"
              checked={preferences.calendly}
              onCheckedChange={(checked) =>
                handlePreferenceChange("calendly", checked)
              }
            />
          </div>

          {preferences.calendly && (
            <Input
              type="text"
              placeholder="Enter your Calendly link"
              value={calendlyInput}
              onChange={handleCalendlyInputChange}
              className="w-full"
            />
          )}
        </div>
      </div>

      <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
        <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
          Tab to navigate, Enter to continue ↵
        </span>
      </kbd>
    </div>
  );
};

const AccentColorInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => {
  return (
    <div className="w-full px-12 py-12">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Choose an accent color for your profile. The default color is black
          (#000000).
        </p>
        <ColorPicker
          value={value || "#000000"}
          onChange={onChange}
          label="Select color"
        />
      </div>
    </div>
  );
};

interface StatVariant {
  id: string;
  title: string;
  imageUrl: string;
}

interface StatType {
  id: string;
  title: string;
  description: string;
  variants: StatVariant[];
}

interface StatsConfig {
  [key: string]: {
    enabled: boolean;
    variant?: string;
  };
}

const GITHUB_STATS: StatType[] = [
  {
    id: "github-stats",
    title: "GitHub Statistics",
    description: "Show your GitHub activity statistics",
    variants: [
      {
        id: "stats-default",
        title: "Default Style",
        imageUrl:
          "https://github-readme-stats.vercel.app/api?username=b0ney-1&show_icons=true&count_private=true&hide_border=true&title_color=000000&icon_color=00d73d&text_color=000000&bg_color=00000000",
      },
      {
        id: "stats-dark",
        title: "Dark Style",
        imageUrl:
          "https://github-readme-stats.vercel.app/api?username=b0ney-1&show_icons=true&count_private=true&hide_border=true&title_color=ffffff&icon_color=00d73d&text_color=ffffff&bg_color=00000000",
      },
      {
        id: "stats-colorful",
        title: "Colorful Style",
        imageUrl:
          "https://github-readme-stats.vercel.app/api?username=b0ney-1&show_icons=true&count_private=true&hide_border=true&title_color=00d73d&icon_color=00d73d&text_color=000000&bg_color=00000000",
      },
    ],
  },
  {
    id: "language-stats",
    title: "Top Languages",
    description: "Display your most used programming languages",
    variants: [
      {
        id: "lang-default",
        title: "Default Style",
        imageUrl:
          "https://github-readme-stats.vercel.app/api/top-langs/?username=b0ney-1&layout=compact&hide_border=true&title_color=000000&icon_color=00d73d&text_color=000000&bg_color=00000000",
      },
    ],
  },
  {
    id: "streak-stats",
    title: "GitHub Streak",
    description: "Show your GitHub streak statistics",
    variants: [
      {
        id: "streak-default",
        title: "Default Style",
        imageUrl:
          "https://github-readme-streak-stats.herokuapp.com/?user=b0ney-1&hide_border=true&ring=000000&fire=00d73d&currStreakNum=000000&sideNums=000000&currStreakLabel=000000&sideLabels=000000&dates=000000&stroke=000000",
      },
    ],
  },
  {
    id: "contribution-stats",
    title: "Contribution Graph",
    description: "Display your contribution activity graph",
    variants: [
      {
        id: "contrib-default",
        title: "Default Style",
        imageUrl:
          "https://github-readme-activity-graph.vercel.app/graph?username=b0ney-1&bg_color=00000000&color=000000&line=000000&point=000000&area_color=000000&area=true&hide_border=true",
      },
    ],
  },
  {
    id: "trophy-stats",
    title: "GitHub Trophies",
    description: "Showcase your GitHub achievements",
    variants: [
      {
        id: "trophy-default",
        title: "Default Style",
        imageUrl:
          "https://github-profile-trophy.vercel.app/?username=b0ney-1&theme=flat&title_color=000000&text_color=000000&bg_color=00000000&no-frame=true",
      },
    ],
  },
];

const StatsConfigInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  formData,
}) => {
  const accentColor = formData?.accentColor || "#000000";
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>(
    GITHUB_STATS.reduce(
      (acc, stat) => ({
        ...acc,
        [stat.id]: true,
      }),
      {}
    )
  );

  const handleToggleStat = useCallback(
    (statId: string, enabled: boolean) => {
      const newConfig = {
        ...value,
        [statId]: {
          ...value[statId],
          enabled,
        },
      };
      onChange(newConfig);
    },
    [value, onChange]
  );

  const handleImageLoad = useCallback((id: string) => {
    setIsLoading((prev) => ({
      ...prev,
      [id]: false,
    }));
  }, []);

  const getPreviewUrl = useCallback(
    (statId: string) => {
      const colorHex = accentColor.replace("#", "");

      switch (statId) {
        case "github-stats":
          return `https://github-readme-stats.vercel.app/api?username=b0ney-1&show_icons=true&count_private=true&hide_border=true&title_color=${colorHex}&icon_color=${colorHex}&text_color=${colorHex}&bg_color=ffffff00`;
        case "language-stats":
          return `https://github-readme-stats.vercel.app/api/top-langs/?username=b0ney-1&layout=compact&hide_border=true&title_color=${colorHex}&text_color=${colorHex}&bg_color=ffffff00`;
        case "streak-stats":
          return `https://github-readme-streak-stats.herokuapp.com/?user=b0ney-1&hide_border=true&ring=${colorHex}&fire=${colorHex}&currStreakNum=${colorHex}&sideNums=${colorHex}&currStreakLabel=${colorHex}&sideLabels=${colorHex}&dates=${colorHex}&stroke=${colorHex}&background=ffffff00`;
        case "contribution-stats":
          return `https://github-readme-activity-graph.vercel.app/graph?username=b0ney-1&bg_color=ffffff00&color=${colorHex}&line=${colorHex}&point=${colorHex}&area_color=${colorHex}&area=true&hide_border=true`;
        case "trophy-stats":
          return `https://github-profile-trophy.vercel.app/?username=b0ney-1&theme=flat&title_color=${colorHex}&text_color=${colorHex}&bg_color=ffffff00&no-frame=true`;
        default:
          return "";
      }
    },
    [accentColor]
  );

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-center">
          GitHub Profile Statistics
        </h3>
        <p className="text-sm text-muted-foreground text-center">
          Select the statistics you want to display on your profile
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {GITHUB_STATS.map((stat) => {
          const isEnabled = value?.[stat.id]?.enabled || false;
          return (
            <Dialog key={stat.id}>
              <DialogTrigger asChild>
                <div
                  className={cn(
                    "group relative rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer",
                    "bg-background dark:bg-background/5",
                    isEnabled
                      ? "border-primary shadow-md bg-primary/5 dark:bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {/* Preview Image */}
                  <div className="p-4 pb-2">
                    <div className="aspect-[2/1] relative rounded-lg overflow-hidden bg-white dark:bg-white/5">
                      {isLoading[stat.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      <img
                        src={getPreviewUrl(stat.id)}
                        alt={stat.title}
                        className="w-full h-full object-contain p-2"
                        onLoad={() => handleImageLoad(stat.id)}
                        onError={() => handleImageLoad(stat.id)}
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 pt-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{stat.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {stat.description}
                        </p>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) =>
                          handleToggleStat(stat.id, checked)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Selected Indicator */}
                  {isEnabled && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{stat.title}</DialogTitle>
                  <DialogDescription>{stat.description}</DialogDescription>
                </DialogHeader>
                <div className="w-full aspect-[2/1] relative rounded-lg overflow-hidden bg-white dark:bg-white/5">
                  <img
                    src={getPreviewUrl(stat.id)}
                    alt={stat.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};

const FunFactsInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <Textarea
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Share some fun facts about yourself (optional)"
      className="w-full min-h-[200px] py-8 px-8 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent text-4xl focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600"
    />
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        Shift + Enter for new line, Enter to continue
      </span>
    </kbd>
  </div>
);

const EmojiToggleInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <div className="w-full py-4 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <label htmlFor="emoji-toggle" className="text-sm font-medium">
          Use emojis in your profile?
        </label>
        <Switch
          ref={inputRef}
          id="emoji-toggle"
          checked={value}
          onCheckedChange={onChange}
        />
      </div>
    </div>
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        press Space to toggle
      </span>
    </kbd>
  </div>
);

const AnimatedSvgToggleInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <div className="w-full py-4 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <label htmlFor="svg-toggle" className="text-sm font-medium">
          Include animated SVG elements?
        </label>
        <Switch
          ref={inputRef}
          id="svg-toggle"
          checked={value}
          onCheckedChange={onChange}
        />
      </div>
    </div>
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        press Space to toggle
      </span>
    </kbd>
  </div>
);

export {
  ProfessionalTitleInput,
  YearsExperienceInput,
  OrganizationInput,
  LinkedInInput,
  ProfessionalSummaryInput,
  TimeZoneInput,
  PronounsInput,
  LanguagesInput,
  ExpertiseInput,
  RecentAchievementsInput,
  CollaborationInput,
  MentorshipInput,
  OpenSourceInput,
  ContactPreferencesInput,
  AccentColorInput,
  StatsConfigInput,
  FunFactsInput,
  EmojiToggleInput,
  AnimatedSvgToggleInput,
};
