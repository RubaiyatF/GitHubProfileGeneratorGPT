"use client";
import React from "react";
import { useForm, FormState } from "@/context/FormContext";
import { useRouter } from "next/navigation";
import { AnimatedForm } from "@/components/AnimatedForm";
import ProfileReview from "@/components/ProfileReview";
// Import all input components
import {
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
} from "@/components/inputs/FormInputs";
// Define the steps configuration
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
    key: "recentAchievements",
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

  // Set initial step from searchParams or start from beginning
  const initialStep = searchParams.step ? parseInt(searchParams.step) : 1;

  const handleSubmit = async (formData: any) => {
    dispatch({ type: "SET_FORM_DATA", payload: formData });
    router.push("/preview");
  };

  const handleStepChange = (step: number, value: any, key: keyof FormState) => {
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
