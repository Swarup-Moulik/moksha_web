import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Info,
  Terminal,
  BookOpen,
  Code2,
  Cpu,
  Zap,
  ShieldAlert,
  GitBranch,
  Key,
  Activity,
  Box,
  Database,
  MessageSquare,
} from "lucide-react";

// Helper component for sleek code blocks
const CodeBlock = ({ filename, code, language = "cpp" }) => (
  <div className="rounded-xl overflow-hidden border border-border-custom shadow-md bg-[#0d0d0d] my-4">
    {filename && (
      <div className="flex items-center px-4 py-2 bg-[#161616] border-b border-zinc-800 gap-2">
        <Terminal size={14} className="text-zinc-500" />
        <span className="text-xs font-mono text-zinc-400">{filename}</span>
      </div>
    )}
    <div className="custom-scrollbar">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          fontSize: "15px",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  </div>
);

export const docSections = [
  // 1. INTRODUCTION
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Welcome to Moksha
          </h1>
          <p className="text-xl text-primary font-medium">
            The power of C, with the safety of modern systems.
          </p>
        </div>
        <p className="text-lg leading-8 opacity-80">
          Moksha is a high-performance, systems-level programming language
          engineered to provide granular memory control without the overhead of
          traditional garbage collection.
        </p>
        <p className="text-lg leading-8 opacity-80">
          In systems programming, developers are often forced to choose between
          the raw performance of manual memory management and the safety of
          managed runtimes. Moksha eliminates this trade-off by implementing a
          hybrid approach to memory safety.
        </p>
        <div className="mt-6 bg-surface/50 border border-border-custom rounded-xl p-6 flex flex-col md:flex-row gap-5 items-start shadow-sm">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Cpu size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Core Architecture
            </h3>
            <p className="opacity-80 leading-relaxed text-sm md:text-base">
              A defining feature of Moksha is its explicit type-system
              distinction. Developers can define <b>Value-type</b> classes for
              stack-allocated, value-semantic data, or <b>Reference-type</b>{" "}
              classes for heap-allocated objects managed by the compiler’s ARC
              implementation. This gives you the predictability of C-style
              layout and the safety of modern compiler engineering.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // 2. COMMENTS
  {
    id: "comments",
    title: "2. Comments",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Comments
          </h1>
          <p className="text-lg leading-8 opacity-80">
            Use comments to annotate code, describe algorithmic logic, or
            disable execution.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
            <MessageSquare className="text-primary" size={24} /> Syntax
          </h3>
          <CodeBlock
            filename="comments.mox"
            code={`// Single-line comment: Notes until the end of the line

/* Multi-line comment:
   Ideal for function headers, licensing information,
   or describing complex algorithmic logic. */`}
          />
        </div>
      </div>
    ),
  },

  // 3. DATA TYPES
  {
    id: "datatypes",
    title: "3. Data Types",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Data Types
          </h1>
          <p className="text-lg leading-8 opacity-80">
            Moksha provides a rich set of scalar, complex, universal, and array
            types designed for explicit memory footprint control.
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Scalar Types</h3>
          <div className="w-full overflow-x-auto rounded-xl border border-border-custom shadow-sm bg-surface/30">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-foreground border-b border-border-custom">
                  <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                    Category
                  </th>
                  <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                    Types
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom">
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">
                    Integers
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    int, char, short, long
                  </td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">
                    Unsigned Integers
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    unsigned int, unsigned char, unsigned short, unsigned long
                  </td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">
                    Floating Point
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    quarter, half, float, double
                  </td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">
                    Fixed Point
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    decimal&lt;p, s&gt; (p=precision, s=scale)
                  </td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">
                    Logical
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    bool
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Complex & Universal Types</h3>
          <ul className="list-disc list-inside flex flex-col gap-3 opacity-90 leading-8">
            <li>
              <code className="text-primary font-bold">string</code>: A
              heap-managed text abstraction.
            </li>
            <li>
              <code className="text-primary font-bold">char[]</code>: C-style
              string. A primitive, null-terminated character array offering
              direct memory access.
            </li>
            <li>
              <code className="text-primary font-bold">table&lt;K,V&gt;</code>:
              A specialized collection type for key-value capabilities.
            </li>
            <li>
              <code className="text-primary font-bold">any</code>: A universal
              type capable of holding a value of any other type (useful for
              generic programming or type-erasure). Supports implicit casting.
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Array Memory Models</h3>
          <p className="opacity-80 mb-4">
            Arrays have distinct memory behaviors based on their declaration:
          </p>
          <div className="w-full overflow-x-auto rounded-xl border border-border-custom shadow-sm bg-surface/30">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-foreground border-b border-border-custom">
                  <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                    Feature
                  </th>
                  <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                    Fixed-Size Array ([N])
                  </th>
                  <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                    Dynamic Array ([])
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom">
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">
                    Allocation
                  </td>
                  <td className="py-4 px-6">Stack</td>
                  <td className="py-4 px-6">Heap</td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">
                    Size Determination
                  </td>
                  <td className="py-4 px-6">Compile-time</td>
                  <td className="py-4 px-6">Runtime</td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">
                    ARC Management
                  </td>
                  <td className="py-4 px-6">N/A (Scope-bound)</td>
                  <td className="py-4 px-6">Yes (Managed)</td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">
                    Best For
                  </td>
                  <td className="py-4 px-6">
                    High-performance, temporary buffers
                  </td>
                  <td className="py-4 px-6">
                    Variable length, data persistence
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
  },

  // 4. OPERATORS
  {
    id: "operators",
    title: "4. Operators",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Operators
          </h1>
        </div>

        <h3 className="text-2xl font-bold text-primary">
          Arithmetic & Assignment
        </h3>
        <p className="opacity-80">
          Standard mathematical calculations and compound assignments.
        </p>
        <CodeBlock
          code={`+  -  * /  %  ** ++  --\n=  +=  -=  *=  /=  %=  &=  |=  ^=  <<=  >>=`}
          language="text"
        />

        <h3 className="text-2xl font-bold text-primary mt-4">
          Bitwise & Logical
        </h3>
        <p className="opacity-80">
          Used for low-level memory manipulation and control flow logic.
        </p>
        <CodeBlock code={`&  |  ^  ~  <<  >>\n&&  ||  !`} language="text" />

        <h3 className="text-2xl font-bold text-primary mt-4">Comparison</h3>
        <CodeBlock code={`==  !=  <  <=  >  >=`} language="text" />

        <h3 className="text-2xl font-bold text-primary mt-4">
          Structural & Functional
        </h3>
        <p className="opacity-80">
          Advanced language features like function chaining, closures, and null
          safety.
        </p>
        <div className="w-full overflow-x-auto rounded-xl border border-border-custom shadow-sm bg-surface/30">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-border-custom">
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">|&gt;</td>
                <td className="py-3 px-6">
                  Pipeline operator (passes LHS to RHS)
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">
                  ?. / ?? / ?[
                </td>
                <td className="py-3 px-6">
                  Null Safety (Optional Chaining, Coalescing, Safe Indexing)
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">?</td>
                <td className="py-3 px-6">Ternary operator</td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">=&gt;</td>
                <td className="py-3 px-6">
                  Fat arrow (lambda/closure definitions)
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">-&gt;</td>
                <td className="py-3 px-6">
                  Defines the return type in a closure type signature
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">...</td>
                <td className="py-3 px-6">
                  Spread operator for dynamic arrays
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  // 5. NULL SAFETY
  {
    id: "nullsafety",
    title: "5. Null Safety",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Null Safety
          </h1>
          <p className="text-lg leading-8 opacity-80">
            By default, types are non-nullable. You must explicitly declare
            nullable types using the{" "}
            <code className="text-primary bg-surface px-2 py-1 rounded-md">
              ?
            </code>{" "}
            suffix.
          </p>
        </div>

        <CodeBlock
          filename="safety.mox"
          code={`// The TypeChecker prevents assignment of null to non-nullable types\nType? variableName;\n\nint? optional_number = null;`}
        />

        <div className="mt-6 bg-surface/50 border border-border-custom rounded-xl p-6 flex flex-col md:flex-row gap-5 items-start shadow-sm">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <ShieldAlert size={24} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Compiler Enforcement
            </h3>
            <ul className="list-disc list-inside opacity-80 leading-relaxed text-sm md:text-base">
              <li>
                <b>Strict Indexing:</b> You cannot index into a NullableType
                without <code className="text-primary">?[</code>. (Triggers
                error).
              </li>
              <li>
                <b>Member Access:</b> Accessing a member requires{" "}
                <code className="text-primary">?.</code>.
              </li>
              <li>
                <b>Assignment Safety:</b> Assigning null to a standard variable
                triggers{" "}
                <code className="font-mono text-red-400">
                  DiagID::err_null_assignment
                </code>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },

  // 6. CONDITIONAL STATEMENTS
  {
    id: "conditionals",
    title: "6. Conditionals",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Conditional Statements
          </h1>
        </div>

        <h3 className="text-2xl font-bold">if / else</h3>
        <CodeBlock
          code={`int temp = 35;\nif (temp > 40) {\n    println("Hot");\n} else if (temp > 30) {\n    println("Warm");\n} else {\n    println("Normal");\n}`}
        />

        <h3 className="text-2xl font-bold mt-4">switch</h3>
        <p className="opacity-80">
          Supports Integers, Characters, Integer Ranges (inclusive), and Enums.{" "}
          <b>Implicit Break:</b> Cases terminate automatically; no explicit
          break required. Empty cases fall through.
        </p>
        <CodeBlock
          code={`switch (score) {\n    case 90:100:       // Integer Range\n        println("A");\n    case 75:89:\n        println("B");\n    default:\n        println("C");\n}\n\nswitch (state) {\n    case DeviceState.BUSY:\n    case DeviceState.ERROR: // Empty fallthrough\n        println("Action required");\n}`}
        />
      </div>
    ),
  },

  // 7. LOOPING
  {
    id: "loops",
    title: "7. Looping",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Looping Statements
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2 text-primary">for</h3>
            <CodeBlock
              code={`for (int i = 0; i < 5; i++) {\n    println(i)\n}\n\nfor (;;) { println("Infinite") }`}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-primary">
              while & do-while
            </h3>
            <CodeBlock
              code={`while (i < 5) { i++ }\n\ndo {\n    i++\n} while (i < 5)`}
            />
          </div>
        </div>
        <h3 className="text-xl font-bold mt-4 text-primary">for in</h3>
        <CodeBlock
          code={`int[] arr = [1, 2, 3, 4]\nfor (int x in arr) {\n    println(x)\n}`}
        />
      </div>
    ),
  },

  // 8. LITERALS & SUFFIXES
  {
    id: "literals",
    title: "8. Literals & Suffixes",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Literals & Suffixes
          </h1>
        </div>

        <h3 className="text-2xl font-bold">Integer & Float Literals</h3>
        <p className="opacity-80">
          Supports decimal, hex (<code className="text-primary">0x</code>),
          octal (<code className="text-primary">0o</code>), binary (
          <code className="text-primary">0b</code>), and underscore separators.
        </p>
        <CodeBlock
          code={`int hex = 0x1A4F\nint bin = 0b1010_1010\nint large = 1_000_000\n\nfloat scientific = 1.23e10\nfloat trailing = 10.`}
        />

        <h3 className="text-2xl font-bold mt-4">Explicit Suffixes</h3>
        <CodeBlock
          code={`char a = 123i8\nunsigned short b = 255u16\nunsigned int c = 42u32\nlong d = 1000i64`}
        />

        <h3 className="text-2xl font-bold mt-4">Decimal Literals</h3>
        <p className="opacity-80">
          Exact base-10 arithmetic. Safe widening conversions are allowed
          automatically.
        </p>
        <CodeBlock
          code={`decimal<5,2> price = 12.34d\ndecimal<9,4> precise = 123.4567d`}
        />
      </div>
    ),
  },

  // 9. STRINGS & TEMPLATES
  {
    id: "strings",
    title: "9. Strings & Templates",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Strings & Templates
          </h1>
        </div>
        <p className="opacity-80">
          Moksha supports UTF-8 source code natively, meaning Unicode can be
          used in strings, identifiers, and comments.
        </p>
        <CodeBlock
          code={`string hex = "\\x41\\x42\\x43"\nstring emoji = "\\u{1F600}"\n\n// Template strings use backticks and \${}\nstring name = "Moksha"\nint version = 1\nstring msg = \`Welcome to \${name} v\${version}\`\n\n// Native Unicode Identifiers\nint über = 100\nstring 漢字 = "Hanzi"\nfloat ∆ = 3.14`}
        />
      </div>
    ),
  },

  // 10. FUNCTIONS
  {
    id: "functions",
    title: "10. Functions",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Functions
          </h1>
        </div>
        <CodeBlock
          code={`// Basic Syntax & Recursion\nint factorial(int n) {\n    if (n <= 1) return 1\n    return n * factorial(n - 1)\n}\n\n// Default Parameters\nvoid configureWindow(int width = 800, string title = "App") { ... }\n\n// Pass-by-Reference (modifies caller's variable)\nvoid modifyRef(ref int ptr) {\n    ptr = 100;\n}`}
        />
      </div>
    ),
  },

  // 11. OOP
  {
    id: "oop",
    title: "11. Object Oriented",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Object Oriented
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2 text-primary">
              Value Types (class)
            </h3>
            <p className="opacity-80 text-sm mb-2">
              Allocated on stack. Assignments copy the object.
            </p>
            <CodeBlock
              code={`class Point {\n    public int x\n    public int y\n    constructor(int x, int y) {\n        this.x = x\n        this.y = y\n    }\n}`}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-primary">
              Reference Types (ref class)
            </h3>
            <p className="opacity-80 text-sm mb-2">
              Heap allocated (ARC). Assignments copy references. Use{" "}
              <code>weak</code> to prevent reference cycles.
            </p>
            <CodeBlock
              code={`ref class State {\n    public int value\n    constructor(int v) {\n        this.value = v\n    }\n}`}
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-4">Advanced OOP Features</h3>
        <ul className="list-disc list-inside opacity-80 leading-8">
          <li>
            <b>Method Overloading:</b> Based on parameter types and arity.
          </li>
          <li>
            <b>Destructors:</b> Define{" "}
            <code className="text-primary">destructor()</code> for cleanup logic
            when instances go out of scope.
          </li>
          <li>
            <b>Inheritance:</b>{" "}
            <code className="text-primary">ref class Child(Parent)</code>.
            Supports <code className="text-primary">virtual</code> and{" "}
            <code className="text-primary">override</code> for dynamic dispatch.
          </li>
        </ul>

        <div className="mt-4 bg-surface/50 border border-border-custom rounded-xl p-6 shadow-sm">
          <h3 className="font-bold mb-2">Access Modifiers</h3>
          <p className="opacity-80 text-sm">
            <code>public</code> (Everywhere), <code>protected</code> (Defining
            class + Subclasses), <code>private</code> (Defining class only).
          </p>
        </div>
      </div>
    ),
  },

  // 12. PIPELINE & 13. CASTING
  {
    id: "pipeline_casting",
    title: "12-13. Pipeline & Casting",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Pipeline & Casting
          </h1>
        </div>
        <h3 className="text-2xl font-bold">Pipeline Operator (|&gt;)</h3>
        <p className="opacity-80">Passes the left value into the next call.</p>
        <CodeBlock
          code={`int add_one(int x) { return x + 1 }\nprintln(10 |> add_one |> add_one) // 12`}
        />

        <h3 className="text-2xl font-bold mt-4">Type Casting</h3>
        <CodeBlock
          code={`// Functional Casts\nfloat x = float(10)\nhalf y = half(x)\n\n// Generic Casts\nhalf h = cast<half>(10.5)\ndecimal<5,2> d = cast<decimal<5,2>>(x)`}
        />
      </div>
    ),
  },

  // 14. INDEXING & 15. JUMPS
  {
    id: "indexing_jumps",
    title: "14-15. Indexing & Jumps",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Indexing & Jumps
          </h1>
        </div>
        <CodeBlock
          filename="indexing.mox"
          code={`// Array & String\nint[] nums = [10, 20, 30]\nnums[1] = 99\n\n// Tables\ntable<string, int> scores = { "Alice": 100 }\nprintln(scores["Alice"])\n\n// Nullable Indexing (?.[])\nint[]? values = null\nprintln(values?[0] ?? 0)`}
        />

        <h3 className="text-2xl font-bold mt-4">Jump Statements</h3>
        <p className="opacity-80">
          <b>break:</b> Exits loops or switch blocks. <b>continue:</b> Skips
          current loop iteration.
        </p>
      </div>
    ),
  },

  // 16. DEFER
  {
    id: "defer",
    title: "16. Defer Statement",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Defer Statement
          </h1>
          <p className="text-lg leading-8 opacity-80">
            Schedules code to execute when the current scope exits. Crucial for
            resource cleanup.
          </p>
        </div>
        <ul className="list-disc list-inside opacity-80 leading-8">
          <li>
            <b>LIFO Order:</b> Multiple defers execute in reverse registration
            order.
          </li>
          <li>
            <b>Return Interaction:</b> Defers execute even during early{" "}
            <code className="text-primary">return</code> or{" "}
            <code className="text-primary">throw</code>.
          </li>
        </ul>
        <CodeBlock
          code={`void process(bool abort) {\n    defer println("Cleanup")\n    if (abort) return\n    println("Done")\n}`}
        />
      </div>
    ),
  },

  // 17. CLOSURES & 18. OPERATOR OVERLOAD
  {
    id: "closures",
    title: "17-18. Closures & Overloads",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Closures & Overloads
          </h1>
        </div>
        <h3 className="text-2xl font-bold">Closure Capture Modes</h3>
        <ul className="list-disc list-inside opacity-80 leading-8">
          <li>
            <b>Snapshot (Default):</b> By-value.{" "}
            <code className="text-primary">() =&gt; &#123; ... &#125;</code>
          </li>
          <li>
            <b>View (&amp;):</b> Immutable borrow.{" "}
            <code className="text-primary">
              &amp;() =&gt; &#123; ... &#125;
            </code>
          </li>
          <li>
            <b>Mut (&amp;mut):</b> Mutable borrow.{" "}
            <code className="text-primary">
              &amp;mut () =&gt; &#123; ... &#125;
            </code>
          </li>
          <li>
            <b>Move:</b> Transfers ownership.{" "}
            <code className="text-primary">
              move () =&gt; &#123; ... &#125;
            </code>
          </li>
        </ul>

        <h3 className="text-2xl font-bold mt-6">Operator Overloading</h3>
        <p className="opacity-80">
          Classes can overload Binary (
          <code className="text-primary">+ - ==</code>) and Unary (
          <code className="text-primary">-</code>) operators.
        </p>
        <CodeBlock
          code={`class Vector2 {\n    int x; int y;\n    Vector2 operator+(Vector2 other) {\n        return new Vector2(this.x + other.x, this.y + other.y);\n    }\n}`}
        />
      </div>
    ),
  },

  // 19. POINTERS
  {
    id: "pointers",
    title: "19. Pointers & Memory",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Pointers & Memory
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface/30 p-4 rounded-xl border border-border-custom">
            <h4 className="font-bold text-primary">*mut T</h4>
            <p className="text-sm opacity-80">
              Mutable pointer. Provides read/write access.
            </p>
          </div>
          <div className="bg-surface/30 p-4 rounded-xl border border-border-custom">
            <h4 className="font-bold text-primary">*view T</h4>
            <p className="text-sm opacity-80">
              View pointer. Read-only access.
            </p>
          </div>
          <div className="bg-surface/30 p-4 rounded-xl border border-border-custom">
            <h4 className="font-bold text-primary">*lock T</h4>
            <p className="text-sm opacity-80">
              Synchronized pointer for multithreading. Requires a lock block.
            </p>
          </div>
        </div>

        <div className="mt-4 bg-[#161616] p-6 rounded-xl border-l-4 border-red-500">
          <h3 className="text-lg font-bold text-red-500 mb-2 flex items-center gap-2">
            <Zap size={20} /> Borrow Rules & Unsafe
          </h3>
          <p className="opacity-80 text-sm leading-relaxed mb-2">
            <b>Disjoint Borrows:</b> Compiler allows simultaneous mutable
            borrows of different struct fields (e.g. p.x and p.y).
            <br />
            <b>Borrow Death:</b> A borrow ends when the pointer variable dies
            (lexical scope end) or is reassigned.
            <br />
          </p>
          <p className="opacity-80 text-sm leading-relaxed">
            Direct dereferencing of mutable pointers or pointer arithmetic
            (e.g., <code>ptr + 1</code> or casting to <code>usize</code>) must
            be wrapped in an <code>unsafe &#123; &#125;</code> block.
          </p>
        </div>
      </div>
    ),
  },

  // 20. CONCURRENCY
  {
    id: "concurrency",
    title: "20. Concurrency",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Concurrency & Systems
          </h1>
        </div>

        <h3 className="text-2xl font-bold text-primary">
          Async / Await Coroutines
        </h3>
        <p className="opacity-80 leading-relaxed">
          Functions marked <code>async</code> return a{" "}
          <code>promise&lt;T&gt;</code>. They act as state-machine coroutines.{" "}
          <code>await</code> yields control back to the event loop. Use{" "}
          <code>spawn()</code> to execute in the background.
        </p>

        <h3 className="text-2xl font-bold text-primary mt-4">
          Synchronization
        </h3>
        <ul className="list-disc list-inside opacity-80 leading-8">
          <li>
            <b>AsyncMutex:</b> <code>lock(mtx)</code> yields the coroutine
            instead of blocking the OS thread.
          </li>
          <li>
            <b>Channels:</b> Ring-buffer message passing via{" "}
            <code>send(val)</code>, <code>recv()</code>, and{" "}
            <code>close()</code>.
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-primary mt-4">
          Low-Level Atomics & Threads
        </h3>
        <p className="opacity-80 leading-relaxed">
          Moksha provides <code>atomic_load</code>, <code>atomic_store</code>,{" "}
          <code>atomic_add</code>, and <code>atomic_cas</code> mapped directly
          to hardware. Memory fences (
          <code>atomic_fence_acquire / release / seqcst</code>) prevent CPU
          reordering.
          <br />
          <br />
          Use <code>new thread(() =&gt; &#123;...&#125;)</code> to spawn heavy
          OS threads. <code>thread_local</code> variables are unique to each OS
          thread.
        </p>
      </div>
    ),
  },

  // 21. EXCEPTIONS
  {
    id: "exceptions",
    title: "21. Exceptions & Panics",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Exceptions & Panics
          </h1>
        </div>
        <p className="opacity-80">
          Moksha uses zero-cost exceptions. Code lowers to `invoke` only inside
          try blocks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-surface/30 p-5 rounded-xl border border-border-custom">
            <h3 className="font-bold text-xl text-primary mb-2">
              Recoverable (throw)
            </h3>
            <p className="text-sm opacity-80">
              Caught by `try/catch`. Use `catch(any e)` for fallbacks. `finally`
              blocks guarantee cleanup execution.
            </p>
          </div>
          <div className="bg-red-500/10 p-5 rounded-xl border border-red-500/50">
            <h3 className="font-bold text-xl text-red-500 mb-2">
              Fatal (panic)
            </h3>
            <p className="text-sm opacity-80">
              Uncatchable fatal failures (memory corruption, out of bounds).
              Instantly halts the system.
            </p>
          </div>
        </div>

        <div className="mt-4 bg-surface p-6 rounded-xl shadow-sm">
          <h3 className="font-bold mb-2">Control Flow Overrides</h3>
          <p className="opacity-80 text-sm leading-relaxed">
            If a <code>return</code> executes inside <code>finally</code>, it
            suppresses the unwinding exception. A new <code>throw</code>{" "}
            overrides the original. During an unwind, the borrow checker
            releases active <code>*view</code> or <code>*mut</code> borrows
            safely.
          </p>
        </div>
      </div>
    ),
  },

  // 22. KEYWORDS
  {
    id: "keywords",
    title: "22. Systems Keywords",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Systems Keywords
          </h1>
          <p className="opacity-80">
            Low-level modifiers for Linkage, FFI, Memory Layout, and the
            Optimizer.
          </p>
        </div>

        <div className="w-full overflow-x-auto rounded-xl border border-border-custom shadow-sm bg-surface/30">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-border-custom">
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">extern</td>
                <td className="py-3 px-6">
                  Declares symbols defined in other translation units (e.g.{" "}
                  <code>extern "C"</code>, <code>"stdcall"</code>). Must be used
                  in <code>unsafe</code>.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">section</td>
                <td className="py-3 px-6">
                  Places function/global into a named binary section (e.g.,
                  .multiboot).
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">
                  align(N) / packed
                </td>
                <td className="py-3 px-6">
                  Forces N-byte alignment, or disables auto-padding to minimize
                  struct footprint.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">volatile</td>
                <td className="py-3 px-6">
                  Prevents optimization of loads/stores. Essential for MMIO.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">
                  interrupt / naked
                </td>
                <td className="py-3 px-6">
                  Marks as ISR (triggers <code>iretq</code>) or completely
                  disables prologue/epilogue generation.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-3 px-6 font-bold text-primary">
                  pure / used
                </td>
                <td className="py-3 px-6">
                  Hints function has no side effects, or prevents linker Dead
                  Code Elimination (DCE).
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold mt-4">Inline Assembly (asm)</h3>
        <p className="opacity-80">
          Supports constraints mapping: <code>in</code> (input),{" "}
          <code>inout</code> (modified input), and <code>clobber</code> (tells
          compiler which registers/flags are destroyed).
        </p>
      </div>
    ),
  },

  // 23 & 24. MACROS & MODULES
  {
    id: "macros_modules",
    title: "23-24. Macros & Modules",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Macros & Modules
          </h1>
        </div>

        <h3 className="text-2xl font-bold text-primary">Hygienic Macros</h3>
        <p className="opacity-80 leading-relaxed">
          Moksha uses compile-time macros. <b>Hygiene</b> is enforced
          automatically—local variables within a macro are renamed to prevent
          collisions with the caller. Macros evaluate arguments at the call site
          and can inject control flow directly (like <code>return</code>).
        </p>

        <h3 className="text-2xl font-bold text-primary mt-6">Module System</h3>
        <p className="opacity-80 leading-relaxed">
          Multi-file projects use explicit imports. Global functions and classes
          must be marked <code>public</code> to be visible.
        </p>
        <CodeBlock
          code={`import { SymbolA, SymbolB } from "module_file"`}
          language="javascript"
        />
      </div>
    ),
  },

  // 25. CORE BUILT-INS
  {
    id: "builtins",
    title: "25. Core Built-ins",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Core Built-ins
          </h1>
          <p className="opacity-80">
            Native functions provided by the Moksha runtime and memory manager.
          </p>
        </div>

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Database className="text-primary" /> Array & Slice
        </h3>
        <div className="w-full overflow-x-auto rounded-xl border border-border-custom bg-surface/30 mb-6">
          <table className="w-full text-left border-collapse text-sm">
            <tbody className="divide-y divide-border-custom">
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  length(arr) / is_empty(arr)
                </td>
                <td className="py-2 px-4 opacity-80">
                  Size / Checks if empty.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  push / pop / insert / remove
                </td>
                <td className="py-2 px-4 opacity-80">
                  Dynamic array mutations.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  clear / resize / fill / clone
                </td>
                <td className="py-2 px-4 opacity-80">
                  Memory and size allocations.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  sort / reverse / contains / index
                </td>
                <td className="py-2 px-4 opacity-80">
                  In-place utility algorithms.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  slice(arr, start, end)
                </td>
                <td className="py-2 px-4 opacity-80">
                  Returns a new O(1) view into the array.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  copy(dst, src)
                </td>
                <td className="py-2 px-4 opacity-80">
                  Raw bitwise copy of data.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Box className="text-primary" /> File System & IO
        </h3>
        <div className="w-full overflow-x-auto rounded-xl border border-border-custom bg-surface/30 mb-6">
          <table className="w-full text-left border-collapse text-sm">
            <tbody className="divide-y divide-border-custom">
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  open / close / read / write
                </td>
                <td className="py-2 px-4 opacity-80">
                  Stream-level file handle IO.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  seek / tell / eof / truncate / size
                </td>
                <td className="py-2 px-4 opacity-80">
                  Cursor positioning and sizing.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  readText / writeText / readLines
                </td>
                <td className="py-2 px-4 opacity-80">
                  String-based IO wrappers.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  readJson / writeYaml
                </td>
                <td className="py-2 px-4 opacity-80">
                  System-level data serialization.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  exists / listDir / remove(Dir)
                </td>
                <td className="py-2 px-4 opacity-80">
                  OS-level file system metadata.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  input(prompt)
                </td>
                <td className="py-2 px-4 opacity-80">
                  Interactive terminal prompt returning string.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Activity className="text-primary" /> Math & Strings
        </h3>
        <div className="w-full overflow-x-auto rounded-xl border border-border-custom bg-surface/30 mb-6">
          <table className="w-full text-left border-collapse text-sm">
            <tbody className="divide-y divide-border-custom">
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  abs / sqrt / hypot / ceil / clamp
                </td>
                <td className="py-2 px-4 opacity-80">
                  Standard mathematical bounding.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  popcount / isPowerOf2
                </td>
                <td className="py-2 px-4 opacity-80">
                  Hardware-level bitwise math.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  substring / contains / index
                </td>
                <td className="py-2 px-4 opacity-80">
                  Text extraction and search.
                </td>
              </tr>
              <tr className="hover:bg-surface/60">
                <td className="py-2 px-4 font-mono text-primary">
                  trim / replace / split / join
                </td>
                <td className="py-2 px-4 opacity-80">
                  String transformations.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Key className="text-primary" /> Manual Memory
        </h3>
        <div className="w-full overflow-x-auto rounded-xl border border-border-custom bg-surface/30 mb-6">
          <table className="w-full text-left border-collapse text-sm">
            <tbody className="divide-y divide-zinc-800">
              <tr>
                <td className="py-3 px-4 font-mono text-primary font-bold">
                  malloc(size)
                </td>
                <td className="py-3 px-4">
                  Allocates uninitialized memory. Returns a raw pointer.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-primary font-bold">
                  calloc(count, size)
                </td>
                <td className="py-3 px-4">
                  Allocates array memory initialized to zero.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-primary font-bold">
                  realloc(ptr, size)
                </td>
                <td className="py-3 px-4">Resizes preserving existing data.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-primary font-bold">
                  free(ptr)
                </td>
                <td className="py-3 px-4">
                  Deallocates block. Requires casting to *void.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-primary font-bold">
                  sizeof(type)
                </td>
                <td className="py-3 px-4">
                  Evaluates size in bytes at compile-time.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
];
