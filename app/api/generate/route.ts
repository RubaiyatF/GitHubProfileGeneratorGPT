import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData, user } = await req.json();

  const prompt = `Create a GitHub profile README.md for a developer. Return ONLY the markdown content, no explanations or additional text. Follow this exact structure with proper dark/light mode support:

<div align="center">

<!-- Header -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=${formData.accentColor.substring(
    1
  )}&height=120&section=header&text=Hey%20There!%20👋&fontSize=60&fontColor=ffffff&animation=fadeIn&background=transparent" />
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=${formData.accentColor.substring(
    1
  )}&height=120&section=header&text=Hey%20There!%20👋&fontSize=60&fontColor=000000&animation=fadeIn&background=transparent" />
  <img width="100%" alt="Header" src="https://capsule-render.vercel.app/api?type=waving&color=${formData.accentColor.substring(
    1
  )}&height=120&section=header&text=Hey%20There!%20👋&fontSize=60&fontColor=000000&animation=fadeIn&background=transparent" />
</picture>

<!-- Profile Views Counter -->
![](https://komarev.com/ghpvc/?username=${
    user.user_metadata?.user_name
  }&color=${formData.accentColor.substring(1)}&style=flat&label=PROFILE+VIEWS)

${
  formData.animatedSvg
    ? `
<!-- Typing SVG -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://readme-typing-svg.demolab.com?font=Fira+Code&duration=3000&pause=1000&color=ffffff&center=true&vCenter=true&random=false&width=435&lines=${encodeURIComponent(
    formData.professionalTitle
  )};${
        formData.openSource === "yes" ? "Open Source Enthusiast" : ""
      };Always+Learning+New+Things" />
  <source media="(prefers-color-scheme: light)" srcset="https://readme-typing-svg.demolab.com?font=Fira+Code&duration=3000&pause=1000&color=000000&center=true&vCenter=true&random=false&width=435&lines=${encodeURIComponent(
    formData.professionalTitle
  )};${
        formData.openSource === "yes" ? "Open Source Enthusiast" : ""
      };Always+Learning+New+Things" />
  <img alt="Typing SVG" src="https://readme-typing-svg.demolab.com?font=Fira+Code&duration=3000&pause=1000&color=000000&center=true&vCenter=true&random=false&width=435&lines=${encodeURIComponent(
    formData.professionalTitle
  )};${
        formData.openSource === "yes" ? "Open Source Enthusiast" : ""
      };Always+Learning+New+Things" />
</picture>`
    : ""
}

</div>

<br/>

<!-- Professional Introduction -->
${formData.useEmojis ? "👨‍💻" : ""} **Professional Introduction**

Hello there! I'm ${user.user_metadata?.full_name || user.email}, a passionate ${
    formData.professionalTitle
  } with ${
    formData.yearsExperience
  } years of experience. Currently, I'm leveraging my skills at ${
    formData.organization
  }, where I contribute to cutting-edge projects. ${formData.summary}

${formData.useEmojis ? "🌟" : ""} **Notable Achievements:**
${formData.achievements ? `- ${formData.achievements}` : ""}

${formData.useEmojis ? "🤝" : ""} **Professional Engagement:**
- ${
    formData.collaboration === "yes"
      ? "Open to collaborating on interesting projects"
      : "Not currently seeking collaborations"
  }
- ${
    formData.mentorship === "mentor"
      ? "Available for mentoring"
      : formData.mentorship === "mentee"
      ? "Looking for mentorship"
      : ""
  }
- ${formData.openSource === "yes" ? "Active in open source communities" : ""}
- Timezone: ${formData.timeZone}

${
  formData.statsConfig.github
    ? `
<!-- GitHub Stats Grid -->
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=${
      user.user_metadata?.user_name
    }&show_icons=true&count_private=true&hide_border=true&title_color=ffffff&icon_color=${formData.accentColor.substring(
        1
      )}&text_color=ffffff&bg_color=00000000" />
    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api?username=${
      user.user_metadata?.user_name
    }&show_icons=true&count_private=true&hide_border=true&title_color=000000&icon_color=${formData.accentColor.substring(
        1
      )}&text_color=000000&bg_color=00000000" />
    <img width="49%" height="195px" alt="GitHub Stats" src="https://github-readme-stats.vercel.app/api?username=${
      user.user_metadata?.user_name
    }&show_icons=true&count_private=true&hide_border=true&title_color=000000&icon_color=${formData.accentColor.substring(
        1
      )}&text_color=000000&bg_color=00000000" />
  </picture>
  
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-streak-stats.herokuapp.com/?user=${
      user.user_metadata?.user_name
    }&hide_border=true&stroke=ffffff&background=transparent&ring=${formData.accentColor.substring(
        1
      )}&fire=${formData.accentColor.substring(1)}&currStreakLabel=ffffff" />
    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-streak-stats.herokuapp.com/?user=${
      user.user_metadata?.user_name
    }&hide_border=true&stroke=000000&background=transparent&ring=${formData.accentColor.substring(
        1
      )}&fire=${formData.accentColor.substring(1)}&currStreakLabel=000000" />
    <img width="49%" height="195px" alt="GitHub Streak" src="https://github-readme-streak-stats.herokuapp.com/?user=${
      user.user_metadata?.user_name
    }&hide_border=true&stroke=000000&background=transparent&ring=${formData.accentColor.substring(
        1
      )}&fire=${formData.accentColor.substring(1)}&currStreakLabel=000000" />
  </picture>

  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-activity-graph.vercel.app/graph?username=${
      user.user_metadata?.user_name
    }&bg_color=transparent&color=ffffff&line=${formData.accentColor.substring(
        1
      )}&point=ffffff&area=true&hide_border=true" />
    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-activity-graph.vercel.app/graph?username=${
      user.user_metadata?.user_name
    }&bg_color=transparent&color=000000&line=${formData.accentColor.substring(
        1
      )}&point=000000&area=true&hide_border=true" />
    <img alt="Activity Graph" src="https://github-readme-activity-graph.vercel.app/graph?username=${
      user.user_metadata?.user_name
    }&bg_color=transparent&color=000000&line=${formData.accentColor.substring(
        1
      )}&point=000000&area=true&hide_border=true" />
  </picture>
</div>`
    : ""
}

${
  formData.statsConfig.language
    ? `
<!-- Languages Stats -->
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.user_metadata?.user_name}&layout=compact&hide_border=true&title_color=ffffff&text_color=ffffff&bg_color=00000000" />
    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.user_metadata?.user_name}&layout=compact&hide_border=true&title_color=000000&text_color=000000&bg_color=00000000" />
    <img width="60%" alt="Top Languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.user_metadata?.user_name}&layout=compact&hide_border=true&title_color=000000&text_color=000000&bg_color=00000000" />
  </picture>
</div>`
    : ""
}

${
  formData.statsConfig.trophy
    ? `
<!-- Trophies -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-profile-trophy.vercel.app/?username=${user.user_metadata?.user_name}&theme=onestar&no-frame=true&no-bg=true&margin-w=4&column=-1" />
    <source media="(prefers-color-scheme: light)" srcset="https://github-profile-trophy.vercel.app/?username=${user.user_metadata?.user_name}&theme=flat&no-frame=true&no-bg=true&margin-w=4&column=-1" />
    <img alt="Github Trophy" src="https://github-profile-trophy.vercel.app/?username=${user.user_metadata?.user_name}&theme=flat&no-frame=true&no-bg=true&margin-w=4&column=-1" />
  </picture>
</p>`
    : ""
}

<!-- Tech Stack -->
## ${formData.useEmojis ? "💻" : ""} Tech Stack

<div align="center">
${formData.expertise
  .map(
    (tech: { value: string; label: string }) => `
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/${
    tech.value
  }-%23ffffff.svg?style=flat&logo=${
      tech.value
    }&logoColor=${formData.accentColor.substring(1)}" />
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/${
    tech.value
  }-%23000000.svg?style=flat&logo=${
      tech.value
    }&logoColor=${formData.accentColor.substring(1)}" />
  <img alt="${tech.label}" src="https://img.shields.io/badge/${
      tech.value
    }-%23000000.svg?style=flat&logo=${
      tech.value
    }&logoColor=${formData.accentColor.substring(1)}" />
</picture>`
  )
  .join("\n")}
</div>

<!-- Contact Section -->
## ${formData.useEmojis ? "🤝" : ""} Connect With Me

<div align="center">
${
  formData.contactPreferences.linkedin
    ? `
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/LinkedIn-%23ffffff.svg?style=flat&logo=linkedin&logoColor=${formData.accentColor.substring(
    1
  )}" />
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/LinkedIn-%23000000.svg?style=flat&logo=linkedin&logoColor=${formData.accentColor.substring(
    1
  )}" />
  <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-%23000000.svg?style=flat&logo=linkedin&logoColor=${formData.accentColor.substring(
    1
  )}" />
</picture>`
    : ""
}
${
  formData.contactPreferences.email
    ? `
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Email-%23ffffff.svg?style=flat&logo=gmail&logoColor=${formData.accentColor.substring(
    1
  )}" />
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/Email-%23000000.svg?style=flat&logo=gmail&logoColor=${formData.accentColor.substring(
    1
  )}" />
  <img alt="Email" src="https://img.shields.io/badge/Email-%23000000.svg?style=flat&logo=gmail&logoColor=${formData.accentColor.substring(
    1
  )}" />
</picture>`
    : ""
}
</div>

<!-- Footer -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=${formData.accentColor.substring(
    1
  )}&height=120&section=footer&text=&fontColor=ffffff&animation=fadeIn&background=transparent" />
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=${formData.accentColor.substring(
    1
  )}&height=120&section=footer&text=&fontColor=000000&animation=fadeIn&background=transparent" />
  <img width="100%" alt="Footer" src="https://capsule-render.vercel.app/api?type=waving&color=${formData.accentColor.substring(
    1
  )}&height=120&section=footer&text=&fontColor=000000&animation=fadeIn&background=transparent" />
</picture>`;

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
              "You are an expert at creating modern, visually appealing GitHub profile READMEs using markdown. You excel at implementing proper dark/light mode support using picture tags and maintaining consistent styling across all components.",
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
