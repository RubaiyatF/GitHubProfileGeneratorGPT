import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StepComponentProps } from "./AnimatedForm";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import { useForm } from "@/context/FormContext";
import { cn } from "@/lib/utils";

interface SectionItem {
  label: string;
  value: any;
  isArray?: boolean;
  step?: number;
}

interface Section {
  title: string;
  description: string;
  items: SectionItem[];
  icon?: React.ReactNode;
}

const REVIEW_SECTIONS: Section[] = [
  {
    title: "Professional Profile",
    description: "Your professional identity and experience",
    items: [
      { label: "Professional Title", value: "professionalTitle", step: 1 },
      { label: "Years of Experience", value: "yearsExperience", step: 2 },
      { label: "Current Organization", value: "organization", step: 3 },
      { label: "LinkedIn Profile", value: "linkedIn", step: 4 },
      { label: "Professional Summary", value: "summary", step: 5 },
    ],
  },
  {
    title: "Communication & Languages",
    description: "Your communication preferences and languages",
    items: [
      { label: "Time Zone", value: "timeZone", step: 6 },
      { label: "Pronouns", value: "pronouns", step: 7 },
      { label: "Languages Spoken", value: "languages", isArray: true, step: 8 },
    ],
  },
  {
    title: "Expertise & Achievements",
    description: "Your skills and recent accomplishments",
    items: [
      {
        label: "Areas of Expertise",
        value: "expertise",
        isArray: true,
        step: 9,
      },
      { label: "Recent Achievements", value: "achievements", step: 10 },
    ],
  },
  {
    title: "Collaboration Preferences",
    description: "Your collaboration and mentorship interests",
    items: [
      { label: "Open to Collaborate", value: "collaboration", step: 11 },
      { label: "Mentorship Preferences", value: "mentorship", step: 12 },
      { label: "Open Source Interest", value: "openSource", step: 13 },
      { label: "Contact Preferences", value: "contactPreferences", step: 14 },
    ],
  },
  {
    title: "Profile Customization",
    description: "Your visual preferences and GitHub stats",
    items: [
      { label: "Accent Color", value: "accentColor", step: 15 },
      { label: "GitHub Stats", value: "statsConfig", step: 16 },
    ],
  },
];

const ProfileReview = ({
  value,
  onStepChange,
  onKeyDown,
  inputRef,
}: StepComponentProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { state: formData } = useForm();
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  const renderValue = (value: any) => {
    if (!value) return "Not set";
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((v: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-lg px-3 py-1">
              {v}
            </Badge>
          ))}
        </div>
      );
    }
    if (typeof value === "object" && value !== null) {
      // Special handling for GitHub stats - show enabled stats
      if (Object.keys(value).some(key => ["github", "language", "streak", "contribution", "trophy"].includes(key))) {
        return (
          <div className="flex flex-wrap gap-2">
            {Object.entries(value)
              .filter(([_, enabled]) => enabled)
              .map(([statId]) => (
                <Badge key={statId} variant="secondary" className="text-lg px-3 py-1">
                  {statId === "github" ? "GitHub Stats" :
                   statId === "language" ? "Top Languages" :
                   statId === "streak" ? "Streak Stats" :
                   statId === "contribution" ? "Contribution Graph" :
                   statId === "trophy" ? "GitHub Trophies" : statId}
                </Badge>
              ))}
          </div>
        );
      }
      // Special handling for pronouns
      if (value.type === "pronouns") {
        return <span className="text-lg">{value.value}</span>;
      }
      return (
        <div className="space-y-2">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-base text-muted-foreground capitalize">
                {key}:
              </span>
              <span className="text-lg">{String(val)}</span>
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-lg">{value}</span>;
  };

  return (
    <div className="w-full h-full flex flex-col pt-20">
      <div className="flex-1 flex items-center">
        <div className="w-full h-full">
          <div className="relative w-full h-full">
            {/* Fade effect elements */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

            {/* Main scrolling content */}
            <div className="flex overflow-x-auto gap-0 snap-x snap-mandatory scrollbar-hide px-[calc(25%-87.5px)] md:px-[calc(25%-125px)]">
              {REVIEW_SECTIONS.map((section) => (
                <div
                  key={section.title}
                  className={cn(
                    "rounded-lg border bg-background flex-none w-[350px] md:w-[500px] snap-center",
                    "border-border shadow-sm mx-2"
                  )}
                >
                  <div className="p-6">
                    <div className="space-y-2">
                      <h4 className="text-2xl font-medium">{section.title}</h4>
                      <p className="text-lg text-muted-foreground">
                        {section.description}
                      </p>
                    </div>

                    <div className="mt-6 space-y-6">
                      {section.items.map((item) => (
                        <div key={item.label} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-medium text-muted-foreground">
                              {item.label}
                            </div>
                            {item.step && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onStepChange(item.step)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div>{renderValue(formData[item.value])}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => router.push("/preview")}
        className="fixed bottom-8 right-8 z-50 rainbow-button"
        size="lg"
      >
        Generate Profile
      </Button>
    </div>
  );
};

export default ProfileReview;
