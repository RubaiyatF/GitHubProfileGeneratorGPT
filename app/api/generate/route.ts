import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Helper function to generate stats section
const generateStatsSection = (username: string, accentColor: string) => `
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&count_private=true&hide_border=true&title_color=ffffff&icon_color=${accentColor}&text_color=ffffff&bg_color=00000000" />
    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&count_private=true&hide_border=true&title_color=000000&icon_color=${accentColor}&text_color=000000&bg_color=00000000" />
    <img width="49%" height="195px" alt="GitHub Stats" src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&count_private=true&hide_border=true&title_color=000000&icon_color=${accentColor}&text_color=000000&bg_color=00000000" />
  </picture>

  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&stroke=ffffff&background=transparent&ring=${accentColor}&fire=${accentColor}&currStreakLabel=ffffff" />
    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&stroke=000000&background=transparent&ring=${accentColor}&fire=${accentColor}&currStreakLabel=000000" />
    <img width="49%" height="195px" alt="GitHub Streak" src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&stroke=000000&background=transparent&ring=${accentColor}&fire=${accentColor}&currStreakLabel=000000" />
  </picture>

  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=transparent&color=ffffff&line=${accentColor}&point=ffffff&area=true&hide_border=true" />
    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=transparent&color=000000&line=${accentColor}&point=000000&area=true&hide_border=true" />
    <img alt="Activity Graph" src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=transparent&color=000000&line=${accentColor}&point=000000&area=true&hide_border=true" />
  </picture>
</div>`;

export async function POST(req: Request) {
  try {
    // Parallel fetch of user data and request body
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const [userResponse, requestData] = await Promise.all([
      supabase.auth.getUser(),
      req.json(),
    ]);

    const { user, error } = userResponse.data;
    if (error || !user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { formData } = requestData;
    if (!formData?.accentColor) {
      return new Response("Bad Request: accentColor is required", {
        status: 400,
      });
    }

    // Prepare data for AI enhancement
    const profileData = {
      user: {
        name: user.user_metadata?.full_name || user.email,
        username: user.user_metadata?.user_name,
        email: user.email,
      },
      professional: {
        title: formData.professionalTitle,
        experience: formData.yearsExperience,
        organization: formData.organization,
        summary: formData.summary,
        achievements: formData.achievements,
        timezone: formData.timeZone,
      },
      preferences: {
        openSource: formData.openSource === "yes",
        collaboration: formData.collaboration === "yes",
        mentorship: formData.mentorship,
        useEmojis: formData.useEmojis,
      },
      expertise: formData.expertise,
      theme: {
        accentColor: formData.accentColor.substring(1),
      },
    };

    // Create base content for AI to enhance
    const baseContent = `
User Profile:
${JSON.stringify(profileData, null, 2)}

Required Components:
1. Header with wave animation
2. Introduction/Bio
3. Professional Experience
4. Tech Stack
${formData.statsConfig.github ? "5. GitHub Statistics" : ""}
${formData.statsConfig.language ? "6. Language Statistics" : ""}
7. Contact Information
8. Profile Views Counter (at bottom)

Please generate a complete GitHub profile README.md following these guidelines:
- Enhance the tone and style of all text content while maintaining professionalism
- Create engaging section titles that reflect the user's personality
- Generate personalized typewriter text based on user's experience and achievements
- Ensure all components have proper dark/light mode support
- Maintain consistent styling using the provided accent color
- Include all stats and badges as configured
- Place profile views counter at the bottom

Technical Requirements:
- Use <picture> tags for dark/light mode
- Maintain proper markdown formatting
- Include all necessary HTML attributes
- Use the exact badge and stat URLs provided

Return ONLY the complete markdown content.`;

    const response = await fetch(
      process.env.OPENAI_API_ENDPOINT ||
        "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an expert at creating engaging, professional GitHub profile READMEs. 
                       You excel at:
                       - Writing compelling professional narratives
                       - Creating engaging section titles
                       - Maintaining consistent tone and style
                       - Highlighting key achievements effectively
                       - Generating personalized content that reflects the developer's identity`,
            },
            {
              role: "user",
              content: baseContent,
            },
          ],
          temperature: 0.7,
          stream: true,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    // Helper function to process markdown content
    const processMarkdown = (content: string) => {
      // Add any needed markdown processing here
      return content;
    };

    // Create optimized stream handler
    const stream = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split("\n").filter(Boolean);

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6);
          if (data === "[DONE]") return;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              // Process markdown content before sending
              const processedContent = processMarkdown(content);
              controller.enqueue(new TextEncoder().encode(processedContent));
            }
          } catch {
            // Silent handling of parsing errors
          }
        }
      },
    });

    return new Response(response.body?.pipeThrough(stream), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate profile" },
      { status: 500 }
    );
  }
}
