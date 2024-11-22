import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">GitHub Profile Generator</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-1 px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Profile Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Preview</CardTitle>
              <CardDescription>
                This is how your GitHub profile will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">
                  Preview will appear here after generation
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Generator Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Profile</CardTitle>
              <CardDescription>
                Customize your profile generation settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Generate Profile</Button>
              <p className="text-sm text-muted-foreground">
                Click generate to create your awesome GitHub profile using AI
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
