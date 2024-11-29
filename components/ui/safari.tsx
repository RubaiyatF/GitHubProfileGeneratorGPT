import { SVGProps } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "github-markdown-css";
import "katex/dist/katex.min.css";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Users, Building2, MapPin, Link as LinkIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

export interface SafariProps extends SVGProps<SVGSVGElement> {
  url?: string;
  content?: string;
  width?: number;
  height?: number;
  remarkPlugins?: any[];
  onToggleView?: () => void;
  showMarkdown?: boolean;
}

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  xmlns?: string;
}

const GitHubProfileLayout = ({ content }: { content: string }) => {
  const [formData, setFormData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get form data from localStorage
        const storedData = localStorage.getItem("profileData");
        if (storedData) {
          const data = JSON.parse(storedData);
          setFormData(data);
        }

        // Get user data from Supabase
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="flex w-full min-h-full bg-white dark:bg-[#0D1117]">
      {/* Left Sidebar */}
      <div className="w-1/4 min-w-[296px] p-4 border-r border-gray-200 dark:border-gray-800">
        {/* Profile Picture */}
        <div className="mb-4">
          <img
            src={user?.user_metadata?.avatar_url || "/api/placeholder/296/296"}
            alt="Profile"
            className="w-full rounded-full border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          />
        </div>

        {/* Name & Bio */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user?.user_metadata?.name || "Display Name"}
          </h1>
          <div className="text-gray-600 dark:text-gray-400 mb-4">
            @{user?.user_metadata?.preferred_username || "username"}
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            {formData?.bio || "Software Developer"}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center mb-4 text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4 mr-1" />
          <span className="mr-3">
            <strong className="text-gray-900 dark:text-white">-</strong>{" "}
            followers
          </span>
          ·
          <span className="ml-3">
            <strong className="text-gray-900 dark:text-white">-</strong>{" "}
            following
          </span>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {formData?.company && (
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              {formData.company}
            </div>
          )}
          {formData?.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {formData.location}
            </div>
          )}
          {formData?.website && (
            <div className="flex items-center">
              <LinkIcon className="w-4 h-4 mr-2" />
              <a
                href={formData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 hover:underline"
              >
                {formData.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 p-4 overflow-y-auto">
        {/* Profile README */}
        <div className="markdown-body w-full prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            className="text-base"
            components={{
              pre: ({ node, children, ...props }) => (
                <pre
                  {...props}
                  className="bg-[#f6f8fa] dark:bg-[#161b22] rounded-md p-4 overflow-x-auto border border-[#d0d7de] dark:border-[#30363d]"
                >
                  {children}
                </pre>
              ),
              code: ({ node, inline, className, children, ...props }: any) => {
                if (inline) {
                  return (
                    <code
                      className="bg-[#f6f8fa] dark:bg-[#161b22] px-1.5 py-0.5 rounded-md text-sm 
                               border border-[#d0d7de] dark:border-[#30363d] text-[#24292f] dark:text-[#c9d1d9]"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                const match = /language-(\w+)/.exec(className || "");
                return (
                  <code
                    className={cn(
                      match ? `language-${match[1]}` : "",
                      "text-[#24292f] dark:text-[#c9d1d9] block"
                    )}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              p: ({ node, children, ...props }) => (
                <p
                  {...props}
                  className="mb-4 leading-[1.5] text-[#24292f] dark:text-[#c9d1d9]"
                >
                  {children}
                </p>
              ),
              h1: ({ node, ...props }) => (
                <h1
                  {...props}
                  className="text-[32px] leading-[1.25] font-semibold mb-4 mt-6 pb-2 border-b border-[#d0d7de] dark:border-[#30363d] text-[#24292f] dark:text-[#c9d1d9]"
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  {...props}
                  className="text-[24px] leading-[1.25] font-semibold mb-4 mt-6 pb-2 border-b border-[#d0d7de] dark:border-[#30363d] text-[#24292f] dark:text-[#c9d1d9]"
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  {...props}
                  className="text-[20px] leading-[1.25] font-semibold mb-4 mt-6 text-[#24292f] dark:text-[#c9d1d9]"
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  {...props}
                  className="list-disc pl-[2em] mb-4 text-[#24292f] dark:text-[#c9d1d9]"
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  {...props}
                  className="list-decimal pl-[2em] mb-4 text-[#24292f] dark:text-[#c9d1d9]"
                />
              ),
              li: ({ node, checked, ...props }: any) => {
                // Only render checkbox if it's explicitly a task list item
                if (typeof checked === "boolean") {
                  return (
                    <li className="flex items-start mb-1 text-[#24292f] dark:text-[#c9d1d9]">
                      <input
                        type="checkbox"
                        checked={checked}
                        readOnly
                        className="mt-1 mr-2 rounded border-[#d0d7de] dark:border-[#30363d]"
                      />
                      <span>{props.children}</span>
                    </li>
                  );
                }
                // Regular list item
                return (
                  <li
                    {...props}
                    className="mb-1 text-[#24292f] dark:text-[#c9d1d9]"
                  />
                );
              },
              blockquote: ({ node, ...props }) => (
                <blockquote
                  {...props}
                  className="border-l-4 border-[#d0d7de] dark:border-[#30363d] pl-4 color-[#6e7781] dark:color-[#8b949e] mb-4"
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-[#0969da] dark:text-[#58a6ff] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  className="max-w-full rounded-md mb-4"
                  loading="lazy"
                />
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto mb-4">
                  <table
                    {...props}
                    className="min-w-full border border-[#d0d7de] dark:border-[#30363d] border-collapse"
                  />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th
                  {...props}
                  className="border border-[#d0d7de] dark:border-[#30363d] px-[13px] py-[6px] bg-[#f6f8fa] dark:bg-[#161b22] text-[#24292f] dark:text-[#c9d1d9]"
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  {...props}
                  className="border border-[#d0d7de] dark:border-[#30363d] px-[13px] py-[6px] text-[#24292f] dark:text-[#c9d1d9]"
                />
              ),
            }}
          >
            {content.replace(/^[`']{3}markdown\n|\n[`']{3}$/g, "")}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default function Safari({
  content,
  url,
  width = 1203,
  height = 753,
  remarkPlugins = [],
  onToggleView,
  showMarkdown = false,
  ...props
}: SafariProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#path0)">
        {/* Main browser window background */}
        <path
          d="M0 52H1202V741C1202 747.627 1196.63 753 1190 753H12C5.37258 753 0 747.627 0 741V52Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />

        {/* Title bar background */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 12C0 5.37258 5.37258 0 12 0H1190C1196.63 0 1202 5.37258 1202 12V52H0L0 12Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />

        {/* Title bar inner background */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.06738 12C1.06738 5.92487 5.99225 1 12.0674 1H1189.93C1196.01 1 1200.93 5.92487 1200.93 12V51H1.06738V12Z"
          className="fill-[#A3A3A3] dark:fill-[#262626]"
        />

        {/* Window control buttons */}
        <circle
          cx="27"
          cy="25"
          r="6"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <circle
          cx="47"
          cy="25"
          r="6"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <circle
          cx="67"
          cy="25"
          r="6"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />

        {/* URL bar background */}
        <path
          d="M286 17C286 13.6863 288.686 11 292 11H946C949.314 11 952 13.6863 952 17V35C952 38.3137 949.314 41 946 41H292C288.686 41 286 38.3137 286 35V17Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />

        {/* URL text */}
        <g className="mix-blend-luminosity">
          <text
            x="580"
            y="30"
            fill="#A3A3A3"
            fontSize="12"
            fontFamily="Arial, sans-serif"
          >
            {url}
          </text>
        </g>

        {/* Toggle View Button */}
        <foreignObject x="1000" y="15" width="200" height="30">
          <div className="flex items-center justify-end space-x-2 pr-4">
            <Label
              htmlFor="toggle-view"
              className="text-xs text-white dark:text-white"
            >
              {showMarkdown ? "Markdown" : "Preview"}
            </Label>
            <Switch
              id="toggle-view"
              onCheckedChange={onToggleView}
              checked={showMarkdown}
              className="data-[state=checked]:bg-[#E5E5E5] dark:data-[state=checked]:bg-white data-[state=unchecked]:bg-[#E5E5E5] dark:data-[state=unchecked]:bg-white"
            />
          </div>
        </foreignObject>

        {/* Content Area */}
        <foreignObject
          x="1"
          y="52"
          width="1200"
          height="700"
          clipPath="url(#roundedBottom)"
        >
          <div
            {...(props as DivProps)}
            className="w-full h-full overflow-y-auto bg-white dark:bg-[#0D1117] text-black dark:text-white"
          >
            {showMarkdown ? (
              // Raw Markdown View
              <div className="p-8 font-mono">
                <pre className="whitespace-pre-wrap break-words text-sm">
                  <code>
                    {content.replace(/^[`']{3}markdown\n|\n[`']{3}$/g, "")}
                  </code>
                </pre>
              </div>
            ) : (
              // GitHub Profile Layout
              <GitHubProfileLayout content={content} />
            )}
          </div>
        </foreignObject>
      </g>

      {/* Clip paths */}
      <defs>
        <clipPath id="path0">
          <rect width={width} height={height} fill="white" />
        </clipPath>
        <clipPath id="roundedBottom">
          <path
            d="M1 52H1201V741C1201 747.075 1196.08 752 1190 752H12C5.92486 752 1 747.075 1 741V52Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
