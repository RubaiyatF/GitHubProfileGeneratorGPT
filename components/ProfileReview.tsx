import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StepComponentProps } from "./AnimatedForm";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import { useForm } from "@/context/FormContext";

interface SectionItem {
  label: string;
  value: any;
  isArray?: boolean;
  step?: number;
}

interface Section {
  title: string;
  items: SectionItem[];
}

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
            <Badge key={i} variant="secondary">
              {v}
            </Badge>
          ))}
        </div>
      );
    }
    if (typeof value === "object" && value !== null) {
      if (value.selectedStats) {
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {value.selectedStats.map((stat: string) => (
                <Badge key={stat} variant="secondary">
                  {stat}
                </Badge>
              ))}
            </div>
            {Object.entries(value)
              .filter(([key]) => key.includes("Color"))
              .map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: val as string }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {key.replace("Color", "")}
                  </span>
                </div>
              ))}
          </div>
        );
      }
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground capitalize">
                {key}:
              </span>
              <span className="text-sm">{String(val)}</span>
            </div>
          ))}
        </div>
      );
    }
    return value;
  };

  const columnSections = [
    // Column 1: Professional Information
    {
      sections: [
        {
          title: "Professional Information",
          items: [
            {
              label: "Professional Title",
              value: formData?.professionalTitle,
              step: 1,
            },
            {
              label: "Years of Experience",
              value: formData?.yearsExperience,
              step: 2,
            },
            {
              label: "Current Organization",
              value: formData?.organization,
              step: 3,
            },
            { label: "LinkedIn Profile", value: formData?.linkedIn, step: 4 },
            {
              label: "Professional Summary",
              value: formData?.summary,
              step: 5,
            },
          ],
        },
        {
          title: "Communication",
          items: [
            { label: "Time Zone", value: formData?.timeZone, step: 6 },
            { label: "Pronouns", value: formData?.pronouns, step: 7 },
            {
              label: "Languages Spoken",
              value: formData?.languages,
              isArray: true,
              step: 8,
            },
          ],
        },
      ],
    },
    // Column 2: Expertise and Collaboration
    {
      sections: [
        {
          title: "Expertise & Achievements",
          items: [
            {
              label: "Areas of Expertise",
              value: formData?.expertise,
              isArray: true,
              step: 9,
            },
            {
              label: "Recent Achievements",
              value: formData?.achievements,
              step: 10,
            },
          ],
        },
        {
          title: "Collaboration & Mentorship",
          items: [
            {
              label: "Open to Collaborate",
              value: formData?.collaboration,
              step: 11,
            },
            {
              label: "Mentorship Preferences",
              value: formData?.mentorship,
              step: 12,
            },
            {
              label: "Open Source Interest",
              value: formData?.openSource,
              step: 13,
            },
            {
              label: "Contact Preferences",
              value: formData?.contactPreferences,
              step: 14,
            },
          ],
        },
      ],
    },
    // Column 3: Customization and Personal Touch
    {
      sections: [
        {
          title: "Profile Customization",
          items: [
            { label: "Accent Color", value: formData?.accentColor, step: 15 },
            { label: "GitHub Stats", value: formData?.statsConfig, step: 16 },
          ],
        },
        {
          title: "Personal Touch",
          items: [
            { label: "Fun Facts", value: formData?.funFacts, step: 17 },
            { label: "Use Emojis", value: formData?.useEmojis, step: 18 },
            { label: "Animated SVG", value: formData?.animatedSvg, step: 19 },
          ],
        },
      ],
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Review Sections */}
      <div className="grid grid-cols-3 gap-6">
        {columnSections.map((column, columnIndex) => (
          <Card key={columnIndex} className="h-fit">
            <CardContent className="p-6 space-y-6">
              {column.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  <h3 className="text-xl font-bold">{section.title}</h3>
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">
                            {item.label}
                          </span>
                          {item.step && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onStepChange?.(item.step ?? 0)}
                              className="h-8 px-2"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="text-sm">{renderValue(item.value)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generate Profile Button */}
      <div className="flex justify-end">
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
  );
};

export default ProfileReview;
