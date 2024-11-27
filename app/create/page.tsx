"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedForm } from "@/components/AnimatedForm";
import { MultiSelect } from "@/components/ui/multi-select";
import { ColorPicker } from "@/components/ui/color-picker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import ProfileReview from "@/components/ProfileReview";
import { useForm } from "@/context/FormContext";
import { useRouter } from "next/navigation";

interface StepComponentProps {
  value: any;
  onChange: (value: any) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<any>;
}

// Adding the missing FunFactsInput component
const FunFactsInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <Textarea
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="Share some fun facts about yourself (optional)"
    className="w-full h-32"
  />
);

// Adding EmojiToggleInput component
const EmojiToggleInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="flex items-center space-x-4">
    <Switch
      ref={inputRef}
      checked={value}
      onCheckedChange={onChange}
      id="emoji-toggle"
    />
    <label htmlFor="emoji-toggle">Use emojis in your profile?</label>
  </div>
);

// Adding AnimatedSvgToggleInput component
const AnimatedSvgToggleInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <div className="flex items-center space-x-4">
    <Switch
      ref={inputRef}
      checked={value}
      onCheckedChange={onChange}
      id="svg-toggle"
    />
    <label htmlFor="svg-toggle">Include animated SVG elements?</label>
  </div>
);

// Input Components for Professional Info
const ProfessionalTitleInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <Input
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="e.g., Senior Frontend Developer"
    className="w-full"
  />
);

const YearsExperienceInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <Input
    ref={inputRef}
    type="number"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="Years of experience"
    className="w-full"
  />
);

const OrganizationInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <Input
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="Current organization"
    className="w-full"
  />
);

const LinkedInInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <Input
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="LinkedIn profile URL"
    className="w-full"
  />
);

const ProfessionalSummaryInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <Textarea
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="Write a brief professional summary..."
    className="w-full h-32"
  />
);

const TimeZoneInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <Input
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="Your time zone"
    className="w-full"
  />
);

const PronounsInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <ToggleGroup
    ref={inputRef}
    value={value}
    onValueChange={onChange}
    type="single"
    className="w-full justify-start space-x-4"
  >
    <ToggleGroupItem value="he/him">He/Him</ToggleGroupItem>
    <ToggleGroupItem value="she/her">She/Her</ToggleGroupItem>
    <ToggleGroupItem value="they/them">They/Them</ToggleGroupItem>
    <ToggleGroupItem value="custom">Custom</ToggleGroupItem>
  </ToggleGroup>
);

const LanguagesInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <MultiSelect
    ref={inputRef}
    value={value || []}
    onChange={onChange}
    options={["English", "Spanish", "French", "German", "Chinese", "Japanese"]}
    placeholder="Select languages you speak"
    className="w-full"
  />
);

const ExpertiseInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
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
    className="w-full"
  />
);

const RecentAchievementsInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <Textarea
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="Share your recent achievements..."
    className="w-full h-32"
  />
);

const CollaborationInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <ToggleGroup
    ref={inputRef}
    value={value}
    onValueChange={onChange}
    type="single"
    className="w-full justify-start space-x-4"
  >
    <ToggleGroupItem value="yes">Yes</ToggleGroupItem>
    <ToggleGroupItem value="no">No</ToggleGroupItem>
  </ToggleGroup>
);

const MentorshipInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <ToggleGroup
    ref={inputRef}
    value={value}
    onValueChange={onChange}
    type="single"
    className="w-full justify-start space-x-4"
  >
    <ToggleGroupItem value="mentor">Willing to Mentor</ToggleGroupItem>
    <ToggleGroupItem value="mentee">Looking for Mentor</ToggleGroupItem>
    <ToggleGroupItem value="both">Both</ToggleGroupItem>
  </ToggleGroup>
);

const OpenSourceInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <ToggleGroup
    ref={inputRef}
    value={value}
    onValueChange={onChange}
    type="single"
    className="w-full justify-start space-x-4"
  >
    <ToggleGroupItem value="yes">Yes</ToggleGroupItem>
    <ToggleGroupItem value="no">No</ToggleGroupItem>
  </ToggleGroup>
);

const ContactPreferencesInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <Textarea
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="How should people reach out to you?"
    className="w-full h-32"
  />
);

const AccentColorInput: React.FC<StepComponentProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <ColorPicker value={value} onChange={onChange} label="Choose accent color" />
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
        className="w-full"
      />

      {selectedStats.map(
        (
          stat:
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | Promise<React.AwaitedReactNode>
            | React.Key
            | null
            | undefined
        ) => (
          <Card key={stat}>
            <CardHeader>
              <CardTitle>{stat} Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <ColorPicker
                value={value?.[`${stat}Color`] || "#000000"}
                onChange={(color) =>
                  onChange({ ...value, [`${stat}Color`]: color })
                }
                label="Theme Color"
              />
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

const steps = [
  {
    title: "Professional Title",
    key: "professionalTitle",
    component: ProfessionalTitleInput,
  },
  {
    title: "Years of Experience",
    key: "yearsExperience",
    component: YearsExperienceInput,
  },
  {
    title: "Current Organization",
    key: "organization",
    component: OrganizationInput,
  },
  {
    title: "LinkedIn Profile",
    key: "linkedIn",
    component: LinkedInInput,
  },
  {
    title: "Professional Summary",
    key: "summary",
    component: ProfessionalSummaryInput,
  },
  {
    title: "Time Zone",
    key: "timeZone",
    component: TimeZoneInput,
  },
  {
    title: "Pronouns",
    key: "pronouns",
    component: PronounsInput,
  },
  {
    title: "Languages Spoken",
    key: "languages",
    component: LanguagesInput,
  },
  {
    title: "Areas of Expertise",
    key: "expertise",
    component: ExpertiseInput,
  },
  {
    title: "Recent Achievements",
    key: "achievements",
    component: RecentAchievementsInput,
  },
  {
    title: "Open to Collaborate?",
    key: "collaboration",
    component: CollaborationInput,
  },
  {
    title: "Mentorship Preferences",
    key: "mentorship",
    component: MentorshipInput,
  },
  {
    title: "Open Source Interest",
    key: "openSource",
    component: OpenSourceInput,
  },
  {
    title: "Contact Preferences",
    key: "contactPreferences",
    component: ContactPreferencesInput,
  },
  {
    title: "Accent Color",
    key: "accentColor",
    component: AccentColorInput,
  },
  {
    title: "GitHub Stats Configuration",
    key: "statsConfig",
    component: StatsConfigInput,
  },
  {
    title: "Fun Facts",
    key: "funFacts",
    component: FunFactsInput,
  },
  {
    title: "Use Emojis?",
    key: "useEmojis",
    component: EmojiToggleInput,
  },
  {
    title: "Animated SVG",
    key: "animatedSvg",
    component: AnimatedSvgToggleInput,
  },
  {
    title: "Review your profile",
    key: "review",
    component: ProfileReview,
  },
];

interface CreatePageProps {
  searchParams: {
    step?: string;
  };
}

export default function CreatePage({ searchParams }: CreatePageProps) {
  const { state, dispatch } = useForm();
  const router = useRouter();
  const initialStep = searchParams.step ? parseInt(searchParams.step) : 1;

  const handleSubmit = async (formData: any) => {
    dispatch({ type: "SET_FORM_DATA", payload: formData });
    router.push("/preview");
  };

  const handleStepChange = (step: number, value: any, key: string) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { field: key, value },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatedForm
        steps={steps}
        onSubmit={handleSubmit}
        onStepChange={handleStepChange}
        initialStep={initialStep}
        initialFormData={state}
      />
    </div>
  );
}
