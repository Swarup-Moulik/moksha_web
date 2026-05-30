import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, Terminal, Code2, Loader2, Trash2 } from "lucide-react";

function Playground() {
  const [code, setCode] = useState(
    '// Write your Moksha code here\n\nprintln("Hello from the Playground!");\n',
  );

  // Upgraded output state to handle errors cleanly without raw ANSI codes
  const [output, setOutput] = useState({ text: "Ready.", isError: false });
  const [isCompiling, setIsCompiling] = useState(false);

  const handleRunCode = async () => {
    setIsCompiling(true);
    setOutput({ text: "Compiling and executing...", isError: false });

    try {
      const response = await fetch("http://localhost:3001/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.error) {
        // Strip the raw ANSI codes from the backend and use React/Tailwind for color
        const cleanError = data.error.replace(/\x1b\[[0-9;]*m/g, "");
        setOutput({ text: cleanError, isError: true });
      } else {
        setOutput({ text: data.output, isError: false });
      }
    } catch (err) {
      setOutput({
        text: "Failed to connect to the Moksha compiler server. Make sure the backend is running.",
        isError: true,
      });
    } finally {
      setIsCompiling(false);
    }
  };

  const handleClearOutput = () => {
    setOutput({ text: "Ready.", isError: false });
  };

  return (
    // Changed to use your app's native background variable and added padding
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background text-foreground p-4 md:p-6 lg:p-8 gap-6 overflow-hidden">
      {/* Sleek Page Header */}
      <div className="flex flex-row justify-between items-end w-full">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">
            Playground
          </h1>
          <p className="text-sm opacity-60 font-medium">
            Write, compile, and execute Moksha code in the browser.
          </p>
        </div>

        {/* Upgraded Action Button */}
        <button
          onClick={handleRunCode}
          disabled={isCompiling}
          className={`flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg shadow-lg transition-all transform ${
            isCompiling
              ? "opacity-70 cursor-not-allowed scale-95"
              : "hover:opacity-90 hover:-translate-y-0.5 hover:shadow-primary/30 cursor-pointer"
          }`}
        >
          {isCompiling ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Play size={18} fill="currentColor" />
          )}
          {isCompiling ? "Running..." : "Run Code"}
        </button>
      </div>

      {/* Main Workspace (Modular Panels) */}
      <div className="flex flex-col lg:flex-row flex-1 gap-6 overflow-hidden">
        {/* EDITOR PANEL */}
        <div className="flex flex-col w-full lg:w-2/3 h-1/2 lg:h-full rounded-xl border border-border-custom/30 bg-surface shadow-xl overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-custom/20 bg-background/50">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-primary" />
              <span className="font-mono text-sm font-semibold opacity-90 tracking-wide">
                main.mox
              </span>
            </div>
            {/* Fake macOS style window dots for aesthetics */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex-1 relative pt-2">
            <Editor
              height="100%"
              defaultLanguage="cpp"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                padding: { top: 10 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
              }}
            />
          </div>
        </div>

        {/* TERMINAL PANEL */}
        <div className="flex flex-col w-full lg:w-1/3 h-1/2 lg:h-full rounded-xl border border-border-custom/30 bg-[#0a0a0a] shadow-xl overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-[#111111]">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-zinc-400" />
              <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Console
              </span>
            </div>
            <button
              onClick={handleClearOutput}
              title="Clear Console"
              className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-md hover:bg-zinc-800 cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
            <pre
              className={`font-mono text-[14px] whitespace-pre-wrap break-words leading-relaxed ${
                output.isError ? "text-red-400 font-medium" : "text-zinc-300"
              }`}
            >
              {output.isError && (
                <span className="text-red-500 font-bold block mb-1">
                  Compiler Error:
                </span>
              )}
              {output.text}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
