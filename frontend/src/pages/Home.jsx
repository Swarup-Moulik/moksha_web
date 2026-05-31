import React, { useState } from "react";
import { assets } from "../assets/assets";
// Imported new icons from lucide-react
import {
  Copy,
  Check,
  CodeXml,
  ShieldCheck,
  Sliders,
  Cpu,
  GitMerge,
  Feather,
  Gauge,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate } from "react-router-dom";

// 1. Define your Moksha code examples
const codeExamples = [
  {
    id: "hello",
    title: "Hello.mox",
    code: `// Entry point of the program
string[] greetings = [
    "Hello World",
    "नमस्ते दुनिया",
    "Bonjour le monde"
]

for (string greeting in greetings) {
    println(greeting)
}`,
  },
  {
    id: "memory",
    title: "Classes.mox",
    code: `// Value-type: Allocated on the stack
class Point {
    public int x
    public int y
    constructor(int x, int y) {
        this.x = x
        this.y = y
    }
}

// Reference-type: Allocated on the heap (ARC managed)
ref class State {
    public int value
    constructor(int v) {
        this.value = v
    }
}`,
  },
  {
    id: "pipeline",
    title: "Pipeline.mox",
    code: `// Functional composition using the pipeline operator
int add_one(int x) {
    return x + 1
}

// Passes the left value into the next call
int result = 10 |> add_one |> add_one
println(result) // Outputs: 12`,
  },
  {
    id: "pointers",
    title: "Pointers.mox",
    code: `// Granular memory access using mut, view, and lock pointers
void process_data(*mut int data) {
    *data = *data + 10;
}

void read_data(*view int data) {
    println(*data);
}

void test_pointers() {
    mut int value = 42;

    // Mutable borrow passes write access
    process_data(&mut value);

    // Immutable view borrow passes read-only access
    read_data(&value);

    // Synchronized pointer for multi-threaded shared state
    *lock int shared_state = &value;
    lock (shared_state) {
        *shared_state = 100;
    }
}`,
  },
  {
    id: "baremetal",
    title: "BareMetal.mox",
    code: `// Bare-metal & Kernel development features
// Generates ISR prologue/epilogue and skips standard stack setup
interrupt naked void handle_interrupt() {
    // Direct inline assembly access using Moksha syntax
    asm("push %rax");

    // Custom hardware control logic goes here...

    asm("pop %rax");
    asm("iretq");
}`,
  },
  {
    id: "nullsafety",
    title: "Safety.mox",
    code: `// Explicit nullability in the type system
void process_data(int[]? values) {
    // The compiler prevents direct indexing: values[0]
    // You must use safe indexing (?.[) and null coalescing (??)

    int first_element = values?[0] ?? 0
    println(first_element)
}`,
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState(codeExamples[0].id);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    const currentCode = codeExamples.find((ex) => ex.id === activeTab)?.code;
    if (currentCode) {
      navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <main className="w-full max-w-6xl px-5 md:px-10 pt-28 pb-10 md:pt-36 md:pb-16 flex flex-col items-center">
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-8 md:gap-12 mb-16 md:mb-24 text-center md:text-left">
          <div className="flex flex-col gap-6 md:w-1/2 items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              The Power of C. <br />
              <span className="text-primary">
                The Safety of Modern Systems.
              </span>
            </h1>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              Moksha is a high-performance, systems-level programming language
              engineered to provide granular memory control without the overhead
              of traditional garbage collection.
            </p>
            {/* Made buttons wrap on very small screens using flex-wrap */}
            <div className="flex flex-row flex-wrap justify-center md:justify-start gap-4 mt-4">
              <button
                onClick={() => navigate("/documentation")}
                className="px-6 py-3 bg-primary cursor-pointer text-primary-foreground font-semibold rounded-md hover:opacity-80 transition-opacity w-full sm:w-auto"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/playground")}
                className="btn-playground cursor-pointer w-full sm:w-auto"
              >
                Try the Playground
              </button>
            </div>
          </div>

          {/* Mascot Integration */}
          <div className="md:w-1/2 flex justify-center w-full">
            <img
              src={assets.mascot}
              alt="Moksha Mascot"
              className="w-48 sm:w-64 md:w-80 lg:w-96 drop-shadow-2xl animate-float"
            />
          </div>
        </section>

        {/* --- Code Examples Section --- */}
        <section className="w-full mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center border-b-2 border-primary pb-4 inline-block mx-auto flex justify-center">
            Expressive Syntax
          </h2>

          <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-[#0d0d0d]">
            <div className="flex flex-row justify-between items-center border-b border-zinc-800 bg-[#161616] pr-4">
              <div className="flex flex-row overflow-x-auto custom-scrollbar">
                {codeExamples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => {
                      setActiveTab(example.id);
                      setCopied(false);
                    }}
                    className={`px-4 md:px-6 py-3 md:py-4 text-sm font-mono font-bold whitespace-nowrap transition-colors cursor-pointer flex flex-row items-center gap-2 ${
                      activeTab === example.id
                        ? "text-white border-b-2 border-primary bg-[#0d0d0d]"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-[#1a1a1a]"
                    }`}
                  >
                    <CodeXml
                      size={18}
                      className="text-primary hidden sm:block"
                    />
                    <span>{example.title}</span>
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex flex-row gap-2 ml-4 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>

            <div className="relative p-4 md:p-6 overflow-x-auto group">
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-zinc-300 rounded-md transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center gap-2 text-xs cursor-pointer z-10"
              >
                {copied ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} />
                )}
                <span className="hidden sm:inline">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>

              <div className="mt-2 custom-scrollbar">
                <SyntaxHighlighter
                  language="cpp"
                  style={vscDarkPlus}
                  customStyle={{
                    background: "transparent",
                    padding: 0,
                    margin: 0,
                  }}
                  codeTagProps={{
                    style: {
                      fontSize: "14px",
                      lineHeight: "1.5",
                    },
                  }}
                >
                  {codeExamples.find((ex) => ex.id === activeTab)?.code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center border-b-2 border-primary pb-4 inline-block mx-auto flex justify-center">
            Core Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* ... [Keep all your feature cards exactly the same] ... */}
            <div className="feature-card">
              <ShieldCheck size={36} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">
                Deterministic Memory Safety
              </h3>
              <p className="opacity-80 text-sm leading-relaxed">
                Utilizes Non-Lexical Lifetimes (NLL) for precise borrow checking
                and Automatic Reference Counting (ARC) for predictable object
                lifetimes.
              </p>
            </div>
            <div className="feature-card">
              <Sliders size={36} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">
                Granular Semantic Control
              </h3>
              <p className="opacity-80 text-sm leading-relaxed">
                Dictate exactly how your data lives in memory with explicit
                architectural distinctions between stack-allocated value types
                and heap-allocated reference types.
              </p>
            </div>
            <div className="feature-card">
              <Cpu size={36} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">
                Bare-Metal & Kernel Ready
              </h3>
              <p className="opacity-80 text-sm leading-relaxed">
                Write robust freestanding stubs and operating systems with
                built-in keywords like `interrupt` for ISRs and `naked` for
                absolute hardware control.
              </p>
            </div>
            <div className="feature-card">
              <GitMerge size={36} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">
                Modern Concurrency
              </h3>
              <p className="opacity-80 text-sm leading-relaxed">
                Supports zero-cost async/await coroutines, async-aware mutexes,
                and strict hardware-level atomic operations for lock-free
                parallel execution.
              </p>
            </div>
            <div className="feature-card">
              <Feather size={36} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">
                Zero-Cost Exceptions
              </h3>
              <p className="opacity-80 text-sm leading-relaxed">
                A structured error-handling model that costs nothing unless an
                exception is thrown, distinguishing perfectly between
                recoverable errors and fatal system panics.
              </p>
            </div>
            <div className="feature-card">
              <Gauge size={36} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">
                Compiler-Driven Performance
              </h3>
              <p className="opacity-80 text-sm leading-relaxed">
                Designed to leverage modern compiler infrastructure, ensuring
                that your intermediate representations are optimized
                aggressively down to the machine code level.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
