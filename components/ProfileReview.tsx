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

// Interface for section items
interface SectionItem {
  label: string;
  value: any;
  isArray?: boolean;
  step?: number;
}

// Interface for sections
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
    if (typeof value === "object") {
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
    // Column 1: Basic Info and Learning & Growth
    {
      sections: [
        {
          title: "Basic Information",
          items: [
            {
              label: "Professional Title",
              value: formData?.professionalTitle,
              step: 1,
            },
            { label: "Work Focus", value: formData?.workFocus, step: 2 },
            {
              label: "Expertise",
              value: formData?.expertise,
              isArray: true,
              step: 3,
            },
          ],
        },
        {
          title: "Learning & Growth",
          items: [
            {
              label: "Learning Goals",
              value: formData?.learningGoals,
              step: 4,
            },
            {
              label: "Collaboration Interests",
              value: formData?.collaborationInterests,
              step: 5,
            },
          ],
        },
      ],
    },
    // Column 2: Community Engagement and part of Personal Details
    {
      sections: [
        {
          title: "Community Engagement",
          items: [
            {
              label: "Help Topics",
              value: formData?.helpTopics,
              isArray: true,
              step: 6,
            },
            {
              label: "Expertise Topics",
              value: formData?.expertiseTopics,
              isArray: true,
              step: 7,
            },
          ],
        },
        {
          title: "Personal Details (Part 1)",
          items: [
            { label: "Fun Facts", value: formData?.funFacts, step: 8 },
            { label: "Pronouns", value: formData?.pronouns, step: 9 },
            {
              label: "Languages",
              value: formData?.languages,
              isArray: true,
              step: 10,
            },
          ],
        },
      ],
    },
    // Column 3: Rest of Personal Details and Customization
    {
      sections: [
        {
          title: "Personal Details (Part 2)",
          items: [
            { label: "Time Zone", value: formData?.timeZone, step: 11 },
            { label: "Availability", value: formData?.availability, step: 12 },
          ],
        },
        {
          title: "Theme & Stats",
          items: [
            {
              label: "Theme",
              value: formData?.theme,
              step: 13,
            },
            {
              label: "Stats",
              value: formData?.stats,
              step: 14,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="w-full space-y-6">
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
                        <div className="text-sm">
                          {item.isArray
                            ? renderValue(item.value)
                            : renderValue(item.value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            localStorage.setItem("profileData", JSON.stringify(formData));
            router.push("/preview");
          }}
          size="lg"
        >
          Generate Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileReview;
