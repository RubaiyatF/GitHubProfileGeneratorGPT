"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ComboTagSelector from "@/components/ui/ComboTagSelector";
import { ColorPicker } from "@/components/ui/color-picker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedNumberInput } from "../ui/animated-number";
import { AnimatedSlider } from "../ui/animated-slider";
import { toast } from "sonner";
import spacetime from "spacetime";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";

interface StepComponentProps {
  value: any;
  onChange: (value: any) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<any>;
  onStepChange?: (e: React.KeyboardEvent) => void;
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
}) => (
  <div className="relative w-full px-12 py-12">
    <ToggleGroup
      ref={inputRef}
      value={value}
      onValueChange={onChange}
      type="single"
      className="w-full justify-start space-x-4 py-4 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:shadow-md transition-all duration-200"
    >
      <ToggleGroupItem value="he/him">He/Him</ToggleGroupItem>
      <ToggleGroupItem value="she/her">She/Her</ToggleGroupItem>
      <ToggleGroupItem value="they/them">They/Them</ToggleGroupItem>
      <ToggleGroupItem value="custom">Custom</ToggleGroupItem>
    </ToggleGroup>
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        press Tab to navigate ⇥
      </span>
    </kbd>
  </div>
);

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
    <MultiSelect
      ref={inputRef}
      value={value || []}
      onChange={onChange}
      onKeyDown={onKeyDown}
      options={LANGUAGES.map((lang) => lang.value)}
      placeholder="Select languages you speak"
      className="w-full py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus-within:border-2 focus-within:border-black dark:focus-within:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
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
    <MultiSelect
      ref={inputRef}
      value={value || []}
      onChange={onChange}
      onKeyDown={onKeyDown}
      options={[
        "Frontend Development",
        "Backend Development",
        "DevOps",
        "Cloud Computing",
        "Machine Learning",
      ]}
      placeholder="Select your areas of expertise"
      className="w-full py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus-within:border-2 focus-within:border-black dark:focus-within:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
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

const ContactPreferencesInput: React.FC<StepComponentProps> = ({
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
      placeholder="How should people reach out to you?"
      className="w-full min-h-[200px] py-8 px-8 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent text-4xl focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600"
    />
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        Shift + Enter for new line, Enter to continue
      </span>
    </kbd>
  </div>
);

const AccentColorInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative w-full px-12 py-12">
    <ColorPicker
      value={value}
      onChange={onChange}
      label="Choose accent color"
      className="w-full py-4 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
        click to select
      </span>
    </kbd>
  </div>
);

const StatsConfigInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => {
  const [selectedStats, setSelectedStats] = useState(
    value?.selectedStats || []
  );

  const handleStatsSelection = (stats: string[]) => {
    setSelectedStats(stats);
    onChange({ ...value, selectedStats: stats });
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full px-12 py-12">
        <MultiSelect
          ref={inputRef}
          value={selectedStats}
          onChange={handleStatsSelection}
          onKeyDown={onKeyDown}
          options={[
            "GitHub Stats Card",
            "Top Languages Card",
            "GitHub Streak Stats",
          ]}
          placeholder="Select up to 3 stats to display"
          className="w-full py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus-within:border-2 focus-within:border-black dark:focus-within:border-white shadow-sm hover:shadow-md transition-all duration-200"
        />
        <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
          <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
            Enter to select ↵
          </span>
        </kbd>
      </div>

      {selectedStats.map((stat) => (
        <Card key={stat} className="relative overflow-hidden">
          <CardHeader>
            <CardTitle>{stat} Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full px-12 py-12">
              <ColorPicker
                value={value?.[`${stat}Color`] || "#000000"}
                onChange={(color) =>
                  onChange({ ...value, [`${stat}Color`]: color })
                }
                label="Theme Color"
                className="w-full py-4 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:shadow-md transition-all duration-200"
              />
              <kbd className="absolute right-4 bottom-2 hidden sm:inline-flex">
                <span className="text-xs font-semibold px-2 py-1 rounded text-gray-500">
                  click to select
                </span>
              </kbd>
            </div>
          </CardContent>
        </Card>
      ))}
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
