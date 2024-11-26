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
          className="fill-white dark:fill-[#262626]"
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
              className="text-xs text-zinc-500 dark:text-zinc-100"
            >
              {showMarkdown ? "Markdown" : "Preview"}
            </Label>
            <Switch
              id="toggle-view"
              onCheckedChange={onToggleView}
              checked={showMarkdown}
              className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white data-[state=unchecked]:bg-black dark:data-[state=unchecked]:bg-white"
            />
          </div>
        </foreignObject>

        {/* Markdown content */}
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
              // GitHub Preview
              <div className="markdown-body w-full h-full p-8 prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  className="text-base"
                  components={{
                    pre: ({ node, children, ...props }) => (
                      <pre
                        {...props}
                        className="bg-[#f6f8fa] dark:bg-[#161B22] rounded-md p-4 overflow-x-auto"
                      >
                        {children}
                      </pre>
                    ),
                    code: ({
                      node,
                      inline,
                      className,
                      children,
                      ...props
                    }: any) => {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline ? (
                        <code
                          className={cn(
                            match ? `language-${match[1]}` : "",
                            "text-black dark:text-white block"
                          )}
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <code
                          className="bg-[#f6f8fa] dark:bg-[#161B22] px-1 py-0.5 rounded-md text-sm text-black dark:text-white"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    h1: ({ node, ...props }) => (
                      <h1
                        {...props}
                        className="text-2xl font-bold mb-4 mt-6 pb-2 border-b border-gray-200 dark:border-gray-700"
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        {...props}
                        className="text-xl font-bold mb-4 mt-6 pb-2 border-b border-gray-200 dark:border-gray-700"
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 {...props} className="text-lg font-bold mb-4 mt-6" />
                    ),
                    p: ({ node, ...props }) => (
                      <p {...props} className="mb-4 leading-relaxed" />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul {...props} className="list-disc pl-6 mb-4" />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol {...props} className="list-decimal pl-6 mb-4" />
                    ),
                    li: ({ node, ...props }) => (
                      <li {...props} className="mb-1" />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        {...props}
                        className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 py-1 text-gray-600 dark:text-gray-300 italic"
                      />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        className="max-w-full h-auto rounded-lg my-4"
                        loading="lazy"
                      />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto mb-4">
                        <table
                          {...props}
                          className="min-w-full border border-gray-200 dark:border-gray-700"
                        />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        {...props}
                        className="border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800"
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td
                        {...props}
                        className="border border-gray-200 dark:border-gray-700 px-4 py-2"
                      />
                    ),
                  }}
                >
                  {content.replace(/^[`']{3}markdown\n|\n[`']{3}$/g, "")}
                </ReactMarkdown>
              </div>
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
