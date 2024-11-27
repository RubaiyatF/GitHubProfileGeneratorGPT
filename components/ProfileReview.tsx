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
            <Badge key={i} variant="secondary" className="text-base">
              {v}
            </Badge>
          ))}
        </div>
      );
    }
    if (typeof value === "object" && value !== null) {
      if (value.selectedStats) {
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {value.selectedStats.map((stat: string) => (
                <Badge key={stat} variant="secondary" className="text-base">
                  {stat}
                </Badge>
              ))}
            </div>
            {Object.entries(value)
              .filter(([key]) => key.includes("Color"))
              .map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded"
                    style={{ backgroundColor: val as string }}
                  />
                  <span className="text-base text-muted-foreground">
                    {key.replace("Color", "")}
                  </span>
                </div>
              ))}
          </div>
        );
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
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-center">
        <div className="w-full h-full">
          <div className="relative w-full h-full">
            <div className="flex overflow-x-auto gap-4 p-4 pb-6 snap-x snap-mandatory">
              {REVIEW_SECTIONS.map((section) => (
                <div
                  key={section.title}
                  className={cn(
                    "rounded-lg border bg-background flex-none w-[350px] md:w-[500px] snap-center",
                    "border-border shadow-sm"
                  )}
                >
                  <div className="p-4">
                    <div className="space-y-1.5">
                      <h4 className="text-lg md:text-xl font-medium flex items-center justify-between">
                        {section.title}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            section.items[0].step &&
                            onStepChange(section.items[0].step)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </h4>
                      <p className="text-base text-muted-foreground">
                        {section.description}
                      </p>
                    </div>

                    <div className="mt-4 space-y-4">
                      {section.items.map((item) => (
                        <div key={item.label} className="space-y-1.5">
                          <div className="text-base font-medium text-muted-foreground">
                            {item.label}
                          </div>
                          <div className="text-lg">
                            {renderValue(
                              formData?.[item.value as keyof typeof formData]
                            )}
                          </div>
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

      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm ">
        <div className="flex justify-end max-w-[95%] mx-auto">
          <Button
            onClick={() => {
              localStorage.setItem("profileData", JSON.stringify(formData));
              router.push("/preview");
            }}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Generate Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileReview;
