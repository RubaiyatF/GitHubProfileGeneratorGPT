import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData, user } = await req.json();

  const prompt = `Create a GitHub profile README.md for a developer. Return ONLY the markdown content, no explanations or additional text. The README should support both dark and light modes using GitHub's prefers-color-scheme media queries.

User Information:
- Name: ${user.user_metadata?.full_name || user.email}
- GitHub Username: ${user.user_metadata?.user_name}
- Avatar URL: ${user.user_metadata?.avatar_url}
- Email: ${user.email}

Create an engaging introduction that incorporates these key details:
- Years of Experience: ${formData.yearsExperience} years
- Current Organization: ${formData.organization}
- Professional Title: ${formData.professionalTitle}
- Summary: ${formData.summary}

Professional Engagement (create a dedicated section):
- Open to Collaboration: ${
    formData.collaboration === "yes"
      ? "Open to collaborating on interesting projects"
      : "Not currently seeking collaborations"
  }
- Mentorship Status: ${
    formData.mentorship === "mentor"
      ? "Available for mentoring"
      : formData.mentorship === "mentee"
      ? "Looking for mentorship"
      : ""
  }
- Open Source: ${
    formData.openSource === "yes" ? "Active in open source communities" : ""
  }
- Notable Achievements: ${formData.achievements}
- Timezone: ${formData.timeZone} (for coordination)

Required Component URLs:

1. Header Wave:
\`\`\`
https://capsule-render.vercel.app/api?type=waving&color=${formData.accentColor.substring(
    1
  )}&height=120&section=header&text=Hey%20There!%20👋&fontSize=60&fontColor={COLOR}&animation=fadeIn&background=transparent
\`\`\`

2. Profile Views Counter:
\`\`\`
https://komarev.com/ghpvc/?username=${
    user.user_metadata?.user_name
  }&color=${formData.accentColor.substring(1)}&style=flat&label=PROFILE+VIEWS
\`\`\`

3. Typing SVG (Include title and key info):
\`\`\`
https://readme-typing-svg.demolab.com?font=Fira+Code&duration=3000&pause=1000&color={COLOR}&center=true&vCenter=true&random=false&width=100%25&lines=${encodeURIComponent(
    formData.professionalTitle
  )};${encodeURIComponent(
    `${formData.yearsExperience} Years of Experience`
  )};${encodeURIComponent(`Currently at ${formData.organization}`)};${
    formData.openSource === "yes" ? "Open Source Enthusiast" : ""
  };Always Learning New Things
\`\`\`

4. GitHub Stats:
\`\`\`
https://github-readme-stats.vercel.app/api?username=${
    user.user_metadata?.user_name
  }&show_icons=true&count_private=true&hide_border=true&title_color={COLOR}&icon_color=${formData.accentColor.substring(
    1
  )}&text_color={COLOR}&bg_color=00000000
\`\`\`

5. GitHub Streak:
\`\`\`
https://github-readme-streak-stats.herokuapp.com/?user=${
    user.user_metadata?.user_name
  }&hide_border=true&stroke={COLOR}&background=transparent&ring=${formData.accentColor.substring(
    1
  )}&fire=${formData.accentColor.substring(1)}&currStreakLabel={COLOR}
\`\`\`

6. Contribution Graph:
\`\`\`
https://github-readme-activity-graph.vercel.app/graph?username=${
    user.user_metadata?.user_name
  }&bg_color=transparent&color={COLOR}&line=${formData.accentColor.substring(
    1
  )}&point={COLOR}&area=true&hide_border=true
\`\`\`

7. Language Stats:
\`\`\`
https://github-readme-stats.vercel.app/api/top-langs/?username=${
    user.user_metadata?.user_name
  }&layout=compact&hide_border=true&title_color={COLOR}&text_color={COLOR}&bg_color=00000000
\`\`\`

8. GitHub Trophies:
\`\`\`
Dark: https://github-profile-trophy.vercel.app/?username=${
    user.user_metadata?.user_name
  }&theme=onestar&no-frame=true&no-bg=true&margin-w=4&column=-1
Light: https://github-profile-trophy.vercel.app/?username=${
    user.user_metadata?.user_name
  }&theme=flat&no-frame=true&no-bg=true&margin-w=4&column=-1
\`\`\`

Note: Replace {COLOR} with:
- Dark mode: ffffff
- Light mode: 000000

Component Layout:
1. Header with wave effect
2. Profile views counter (centered)
3. Enhanced animated typing SVG with professional details (only if ${
    formData.animatedSvg
  })
4. Professional Introduction Section:
   - Summary (enhanced version of user's input)
   - Years of experience and current role
   - Key achievements
   - Professional engagements (collaboration, mentorship, open source)
5. Stats section (if enabled):
   - GitHub Stats and Streak side by side (49% width each)
   - Contribution Graph (full width)
   - Language Stats (60% width, centered)
   - Trophies (full width, auto-column)
6. Tech stack section with badges for: ${formData.expertise
    .map((tech) => tech.label)
    .join(", ")}
7. Professional Engagement Section:
   - Collaboration preferences
   - Mentorship status
   - Open source involvement
   - Timezone availability
8. Contact information (show only selected methods):
   ${formData.contactPreferences.email ? "   - Email\n" : ""}
   ${
     formData.contactPreferences.linkedin
       ? "   - LinkedIn profile: ${formData.linkedIn}\n"
       : ""
   }
   ${formData.contactPreferences.calendly ? "   - Calendly\n" : ""}
9. Footer wave

Instructions for content enhancement:
1. Take the user's summary and elaborate it into a professional, engaging introduction
2. Format achievements as bullet points if multiple items are detected
3. Organize collaboration, mentorship, and open source information in a clear, inviting way
4. Include timezone information in a practical context (e.g., "Available for collaboration in ${
    formData.timeZone
  }")
5. Ensure all HTML elements are properly centered using align attributes

Stats Configuration (include only if true):
- GitHub Statistics: ${formData.statsConfig.github}
- GitHub Streak Stats: ${formData.statsConfig.github}
- Contribution Graph: ${formData.statsConfig.github}
- Language Statistics: ${formData.statsConfig.language}
- GitHub Trophies: ${formData.statsConfig.trophy}

${
  formData.useEmojis
    ? "Use appropriate emojis for section headers and key points"
    : "Do not use emojis in the content"
}

Each component must:
- Use <picture> tags with dark/light mode variants
- Maintain transparent backgrounds
- Use proper color scheme based on mode
- Be properly centered and aligned

Return only valid markdown content that can be directly used in a GitHub profile README.md file.`;

  // Log the prompt for debugging
  console.log("Prompt being sent to OpenAI:", prompt);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at creating modern, visually appealing GitHub profile READMEs using markdown. You excel at transforming user-provided information into professional, engaging content while maintaining a clean, organized layout. You know how to enhance user-provided summaries and achievements into compelling narrative elements. You understand the importance of responsive design and proper component spacing.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        stream: true,
      }),
    });

    // Ensure the response is OK
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    // Create a TransformStream to process the response
    const stream = new TransformStream({
      async transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              return;
            }
            try {
              const parsedData = JSON.parse(data);
              const content = parsedData.choices?.[0]?.delta?.content || "";
              if (content) {
                controller.enqueue(new TextEncoder().encode(content));
              }
            } catch (error) {
              // Skip JSON parse errors for incomplete chunks
              if (error instanceof SyntaxError) {
                continue;
              }
              console.error("Error processing stream:", error);
            }
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
