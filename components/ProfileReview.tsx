import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StepComponentProps } from "./AnimatedForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define an interface for formData
interface FormData {
  professionalTitle: string;
  workFocus: string;
  pronouns: string;
  expertise: string[];
  learningGoals: string;
  expertiseTopics: string[];
  helpTopics: string[];
  collaborationInterests: string;
  availability: string;
  timeZone: string;
  languages: string[];
  funFacts: string;
  theme: {
    mode: string;
    layout: string;
  };
  stats: {
    selectedStats: string[];
  };
}

const ProfileReview = ({
  value,
  formData,
}: StepComponentProps & { formData?: any }) => {
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

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading profile...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Please log in to view profile</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  // Use formData if available, otherwise fall back to value
  const data = formData || value || {};

  const sections = [
    {
      title: "Basic Information",
      items: [
        { label: "Email", value: user.email },
        { label: "Professional Title", value: data.professionalTitle },
        { label: "Current Work Focus", value: data.workFocus },
        { label: "Pronouns", value: data.pronouns },
      ],
    },
    {
      title: "Skills & Expertise",
      items: [
        {
          label: "Areas of Expertise",
          value: data.expertise,
          isArray: true,
        },
        { label: "Learning Goals", value: data.learningGoals },
        {
          label: "Topics I Can Help With",
          value: data.expertiseTopics,
          isArray: true,
        },
        {
          label: "Topics I Need Help With",
          value: data.helpTopics,
          isArray: true,
        },
      ],
    },
    {
      title: "Collaboration",
      items: [
        {
          label: "Collaboration Interests",
          value: data.collaborationInterests,
        },
        { label: "Availability", value: data.availability },
        { label: "Time Zone", value: data.timeZone },
        {
          label: "Languages",
          value: data.languages,
          isArray: true,
        },
      ],
    },
    {
      title: "Personal",
      items: [{ label: "Fun Facts", value: data.funFacts }],
    },
    {
      title: "Preferences",
      items: [
        { label: "Theme Mode", value: data.theme?.mode },
        { label: "Layout Preference", value: data.theme?.layout },
        {
          label: "Selected Stats",
          value: data.stats?.selectedStats,
          isArray: true,
        },
      ],
    },
  ];

  return (
    <div className="w-full max-h-[calc(100vh-200px)] flex flex-col gap-4">
      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
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
      </Card>

      {/* Scrollable Content Area */}
      <ScrollArea className="flex-1 w-full">
        <div className="space-y-4 pr-4">
          {sections.map((section, index) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={item.label} className="space-y-2">
                      <div className="font-medium text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      {item.isArray ? (
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(item.value) &&
                            item.value.map((v: string, i: number) => (
                              <Badge
                                key={`${v}-${i}`}
                                variant="secondary"
                                className="text-sm"
                              >
                                {v}
                              </Badge>
                            ))}
                        </div>
                      ) : (
                        <div className="text-sm">
                          {item.value || "Not specified"}
                        </div>
                      )}
                      {itemIndex < section.items.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Generate Profile Button */}
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleGenerateProfile}
          className="w-full sm:w-auto"
          size="lg"
        >
          Generate Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileReview;
