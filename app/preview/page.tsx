"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Safari from "@/components/ui/safari";
import { Loader2 } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import AnimatedCatLogo from "@/components/ui/animatedCatLogo";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function PreviewPage() {
  const [formData, setFormData] = useState<any>(null);
  const [content] = useState(`# Sarah Chen

<div align="center">

![Banner](/api/placeholder/400/150)

## 🚀 Full Stack Developer | 🌱 Open Source Enthusiast | ☁️ Cloud Architect

[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/sarahchen)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sarahchen)

</div>

## 👋 About Me

Hey there! I'm Sarah, a passionate developer from San Francisco with a love for building scalable applications and contributing to open source. With 5 years of experience in full-stack development, I specialize in creating robust web applications that solve real-world problems.

### 🛠️ Current Tech Stack

\`\`\`text
Frontend     : React, Next.js, TypeScript, Tailwind CSS
Backend      : Node.js, Python, Go
Database     : PostgreSQL, MongoDB
Cloud        : AWS, Docker, Kubernetes
Tools        : Git, GitHub Actions, Jest
\`\`\`

## 📊 GitHub Stats

<div align="center">

![GitHub Stats](/api/placeholder/495/195)
![Top Languages](/api/placeholder/495/195)

</div>

## 🌟 Featured Projects

### 🎨 PixelPerfect - UI Component Library
A modern React component library with 50+ components
- 🎯 100K+ monthly downloads on npm
- 📦 Tree-shakeable architecture
- 🎨 Fully customizable theming
- [View Project](https://github.com/pixelperfect)

### 🚀 ServerlessStack
Production-ready serverless templates for AWS
- ⚡ Zero-config deployment
- 🔐 Built-in security best practices
- 📊 Automated monitoring setup
- [View Project](https://github.com/serverlessstack)

### 🤖 AICodeReviewer
AI-powered code review assistant
- 🧠 Learns from your codebase
- ⚡ Real-time suggestions
- 🔍 Security vulnerability detection
- [View Project](https://github.com/aicodereview)

## 📝 Latest Blog Posts

1. [Building Scalable Microservices with Go](https://blog.sarahchen.dev/go-microservices)
2. [React Performance Optimization Techniques](https://blog.sarahchen.dev/react-performance)
3. [AWS Lambda Cold Starts: A Deep Dive](https://blog.sarahchen.dev/lambda-cold-starts)
4. [Understanding TypeScript Generic Types](https://blog.sarahchen.dev/typescript-generics)

## 💻 Weekly Coding Stats

\`\`\`text
TypeScript   12 hrs 42 mins  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   48.32%
Python       8 hrs 12 mins   ⣿⣿⣿⣿⣿⣿⣿⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   31.24%
Go           3 hrs 15 mins   ⣿⣿⣿⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   12.41%
JSON         1 hr 12 mins    ⣿⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   4.58%
Other        54 mins         ⣿⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   3.45%
\`\`\`

## 🏆 Achievements

- 🥇 GitHub Star 2023
- 🎓 AWS Certified Solutions Architect
- 🏅 HashiCorp Certified Terraform Associate
- 🌟 Top 500 TypeScript Contributors

## 📫 Get in Touch

- 📧 Email: sarah@example.com
- 🐦 Twitter: [@sarahchen](https://twitter.com/sarahchen)
- 💼 LinkedIn: [in/sarahchen](https://linkedin.com/in/sarahchen)
- 🌐 Website: [sarahchen.dev](https://sarahchen.dev)

---

<div align="center">

**If you like my work, consider giving my repos a ⭐️!**

![Profile Views](https://img.shields.io/badge/Profile%20Views-1234-blue)
![GitHub followers](https://img.shields.io/badge/Followers-567-orange)
![GitHub stars](https://img.shields.io/badge/Stars-890-yellow)

</div>
`);

  useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setFormData(data);
      console.log("Form data in preview:", data);
    }
  }, []);

  const router = useRouter();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* Centered Safari Component */}
      <div className="w-full max-w-[1400px] px-8">
        <Safari
          url="github.com"
          content={content}
          className="w-full h-full"
          remarkPlugins={[remarkGfm]}
        />
      </div>

      {/* Fixed Overlay Card */}
      <div className="fixed bottom-6 right-6 animate-slide-up">
        <div className="w-[280px] flex flex-col items-center justify-center gap-8 p-6 bg-card rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-24 h-24 aspect-square">
              <AnimatedCatLogo />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Like the design? Click the following button to download your
              profile.
            </p>
          </div>
          <div className="w-full space-y-3">
            <RainbowButton className="w-full">Download</RainbowButton>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => router.back()}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
