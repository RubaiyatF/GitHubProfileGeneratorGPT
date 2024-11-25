import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StepComponentProps } from "./AnimatedForm";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";

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
  formData,
  onStepChange,
}: StepComponentProps & {
  formData?: any;
  onStepChange?: (step: number) => void;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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

  const handleGenerateProfile = () => {
    router.push("/preview");
  };

  const handleEdit = (step: number) => {
    if (onStepChange) {
      onStepChange(step);
    }
  };

  if (loading) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <CardContent>Loading profile...</CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <CardContent>Please log in to view profile</CardContent>
      </Card>
    );
  }

  const data = formData || value || {};

  const sections: Section[] = [
    {
      title: "Basic Information",
      items: [
        { label: "Email", value: user.email, step: 0 },
        { label: "Professional Title", value: data.professionalTitle, step: 0 },
        { label: "Current Work Focus", value: data.workFocus, step: 1 },
        { label: "Pronouns", value: data.pronouns, step: 8 },
      ],
    },
    {
      title: "Skills & Expertise",
      items: [
        {
          label: "Areas of Expertise",
          value: data.expertise,
          isArray: true,
          step: 2,
        },
        { label: "Learning Goals", value: data.learningGoals, step: 3 },
        {
          label: "Topics I Can Help With",
          value: data.expertiseTopics,
          isArray: true,
          step: 6,
        },
        {
          label: "Topics I Need Help With",
          value: data.helpTopics,
          isArray: true,
          step: 5,
        },
      ],
    },
    {
      title: "Collaboration & Personal",
      items: [
        {
          label: "Collaboration Interests",
          value: data.collaborationInterests,
          step: 4,
        },
        { label: "Availability", value: data.availability, step: 11 },
        { label: "Time Zone", value: data.timeZone, step: 10 },
        {
          label: "Languages",
          value: data.languages,
          isArray: true,
          step: 9,
        },
        { label: "Fun Facts", value: data.funFacts, step: 7 },
        { label: "Theme Mode", value: data.theme?.mode, step: 12 },
        {
          label: "Selected Stats",
          value: data.stats?.selectedStats,
          isArray: true,
          step: 13,
        },
      ],
    },
  ];

  const InfoCard = ({
    title,
    items,
    columnClass,
  }: {
    title: string;
    items: SectionItem[];
    columnClass: string;
  }) => (
    <Card className={`${columnClass} h-full`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleEdit(items[0].step || 0)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {item.label}
              </span>
              {item.step !== items[0].step && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleEdit(item.step || 0)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
            </div>
            {item.isArray ? (
              <div className="flex flex-wrap gap-2">
                {Array.isArray(item.value) && item.value.length > 0 ? (
                  item.value.map((v: string, i: number) => (
                    <Badge
                      key={`${v}-${i}`}
                      variant="secondary"
                      className="text-xs"
                    >
                      {v}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Not specified
                  </span>
                )}
              </div>
            ) : (
              <div className="text-sm">
                {item.value || (
                  <span className="text-muted-foreground">Not specified</span>
                )}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full h-full flex flex-col space-y-4 p-4">
      {/* Profile Header */}
      {/* <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback>
                {data.professionalTitle?.[0] || user.email?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">
                {user.user_metadata?.full_name || user.email}
              </h2>
              <p className="text-muted-foreground">{data.professionalTitle}</p>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Three Column Grid */}
      <div className="grid grid-cols-3 gap-4 flex-1">
        {sections.map((section, index) => (
          <InfoCard
            key={section.title}
            title={section.title}
            items={section.items}
            columnClass="col-span-1"
          />
        ))}
      </div>

      {/* Generate Profile Button */}
      <div className="flex justify-end pt-4">
        <Button
          size="lg"
          onClick={handleGenerateProfile}
          className="w-full sm:w-auto"
        >
          Generate Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileReview;
