"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { ColorPicker } from "@/components/ui/color-picker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StepComponentProps {
  value: any;
  onChange: (value: any) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<any>;
}

// Professional Information Inputs
const ProfessionalTitleInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative">
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="e.g., Senior Frontend Developer"
      className="w-full py-6 px-6 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
        press Enter ↵
      </span>
    </kbd>
  </div>
);

const YearsExperienceInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative">
    <Input
      ref={inputRef}
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Years of experience"
      className="w-full py-6 px-6 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
        press Enter ↵
      </span>
    </kbd>
  </div>
);

const OrganizationInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative">
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Current organization"
      className="w-full py-6 px-6 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
        press Enter ↵
      </span>
    </kbd>
  </div>
);

const LinkedInInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative">
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="LinkedIn profile URL"
      className="w-full py-6 px-6 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
        press Enter ↵
      </span>
    </kbd>
  </div>
);

const ProfessionalSummaryInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative">
    <Textarea
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Write a brief professional summary..."
      className="w-full min-h-[120px] py-6 px-6 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 bottom-4 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
        Shift + Enter for new line
      </span>
    </kbd>
  </div>
);

const TimeZoneInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative">
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Your time zone"
      className="w-full py-6 px-6 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
        press Enter ↵
      </span>
    </kbd>
  </div>
);

const PronounsInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative">
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
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
        press Tab to navigate ⇥
      </span>
    </kbd>
  </div>
);

const LanguagesInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="relative">
    <MultiSelect
      ref={inputRef}
      value={value || []}
      onChange={onChange}
      options={[
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
        "Japanese",
      ]}
      placeholder="Select languages you speak"
      className="w-full py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus-within:border-2 focus-within:border-black dark:focus-within:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
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
  <div className="relative">
    <MultiSelect
      ref={inputRef}
      value={value || []}
      onChange={onChange}
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
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
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
  <div className="relative">
    <Textarea
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Share your recent achievements..."
      className="w-full min-h-[120px] py-6 px-6 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 bottom-4 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
        Shift + Enter for new line
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
  <div className="relative">
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
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
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
  <div className="relative">
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
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
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
  <div className="relative">
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
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
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
  <div className="relative">
    <Textarea
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="How should people reach out to you?"
      className="w-full min-h-[120px] py-6 px-6 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 bottom-4 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
        Shift + Enter for new line
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
  <div className="relative">
    <ColorPicker
      value={value}
      onChange={onChange}
      label="Choose accent color"
      className="w-full py-4 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
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
      <div className="relative">
        <MultiSelect
          ref={inputRef}
          value={selectedStats}
          onChange={handleStatsSelection}
          options={[
            "GitHub Stats Card",
            "Top Languages Card",
            "GitHub Streak Stats",
          ]}
          placeholder="Select up to 3 stats to display"
          maxSelect={3}
          className="w-full py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus-within:border-2 focus-within:border-black dark:focus-within:border-white shadow-sm hover:shadow-md transition-all duration-200"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
          <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
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
            <div className="relative">
              <ColorPicker
                value={value?.[`${stat}Color`] || "#000000"}
                onChange={(color) =>
                  onChange({ ...value, [`${stat}Color`]: color })
                }
                label="Theme Color"
                className="w-full py-4 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:shadow-md transition-all duration-200"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
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
  <div className="relative">
    <Textarea
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Share some fun facts about yourself (optional)"
      className="w-full min-h-[120px] py-6 px-6 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-2 focus:border-black dark:focus:border-white shadow-sm hover:shadow-md transition-all duration-200"
    />
    <kbd className="absolute right-4 bottom-4 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
        Shift + Enter for new line
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
  <div className="relative">
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
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
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
  <div className="relative">
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
    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
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
