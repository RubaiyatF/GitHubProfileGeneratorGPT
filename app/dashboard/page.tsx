"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Github, Users, BookOpen, Star } from "lucide-react";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  location: string;
  blog: string;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { user: sessionUser },
          error: sessionError,
        } = await supabase.auth.getUser();

        if (sessionError || !sessionUser) {
          throw sessionError || new Error("No user found");
        }

        setUser(sessionUser);
        setGithubStats({
          public_repos: sessionUser.user_metadata.public_repos,
          followers: sessionUser.user_metadata.followers,
          following: sessionUser.user_metadata.following,
          avatar_url: sessionUser.user_metadata.avatar_url,
          name: sessionUser.user_metadata.full_name,
          login: sessionUser.user_metadata.user_name,
          bio: sessionUser.user_metadata.bio || "",
          location: sessionUser.user_metadata.location || "",
          blog: sessionUser.user_metadata.blog || "",
        });
      } catch (error) {
        console.error("Session error:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" className="text-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20">
      {githubStats && (
        <div className="space-y-8">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative h-32 w-32 rounded-full overflow-hidden">
                  <Image
                    src={githubStats.avatar_url}
                    alt={githubStats.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{githubStats.name}</h2>
                  <p className="text-muted-foreground">@{githubStats.login}</p>
                  {githubStats.bio && (
                    <p className="text-muted-foreground max-w-xl">
                      {githubStats.bio}
                    </p>
                  )}
                  {(githubStats.location || githubStats.blog) && (
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {githubStats.location && (
                        <span>{githubStats.location}</span>
                      )}
                      {githubStats.blog && (
                        <a
                          href={
                            githubStats.blog.startsWith("http")
                              ? githubStats.blog
                              : `https://${githubStats.blog}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {githubStats.blog}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GitHub Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Public Repositories
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {githubStats.public_repos}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {githubStats.followers}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Following</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {githubStats.following}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Previous Generations */}
          <Card>
            <CardHeader>
              <CardTitle>Previous Profile Generations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No previous generations yet.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
