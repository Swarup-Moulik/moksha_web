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
    title: "Introduction",
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
          Moksha is a statically typed systems programming language with a
          custom multi-stage compilation pipeline, bridging performance with
          flexibility and safety.
        </p>
        <div className="mt-2 bg-surface/50 border border-border-custom rounded-xl p-6 flex flex-col md:flex-row gap-5 items-start shadow-sm">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Cpu size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Core Architecture
            </h3>
            <p className="opacity-80 leading-relaxed text-sm md:text-base">
              Moksha pairs <b>Automatic Reference Counting (ARC)</b> with{" "}
              <b>Non-Lexical Lifetime (NLL) borrow checking</b> for
              deterministic, garbage-collector-free memory management. Value
              types are stack-allocated by default; <b>ref class</b> for heap
              when needed. No GC pauses — resources are released at last use.
            </p>
          </div>
        </div>
        <div className="mt-2 bg-surface/50 border border-border-custom rounded-xl p-6 flex flex-col md:flex-row gap-5 items-start shadow-sm">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Info size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Design Principles
            </h3>
            <ul className="list-disc list-inside opacity-80 leading-relaxed text-sm md:text-base">
              <li>
                <b>Deterministic Memory</b> — ARC + NLL borrow checking. No GC
                pauses.
              </li>
              <li>
                <b>Zero-Cost Abstractions</b> — Value types stack-allocated by
                default.
              </li>
              <li>
                <b>Hygienic Macros</b> — Textual expansion with scope-safe
                variable renaming.
              </li>
              <li>
                <b>Safe Borrowing</b> —{" "}
                <code className="text-primary">*mut</code>,{" "}
                <code className="text-primary">*view</code>,{" "}
                <code className="text-primary">*lock</code> pointers with
                compile-time alias analysis.
              </li>
              <li>
                <b>FFI-Native</b> — Direct C interop with{" "}
                <code className="text-primary">extern "C"</code>, inline
                assembly, and volatile pointers.
              </li>
              <li>
                <b>Cross-Platform</b> — First-class targets for Linux, Windows,
                macOS, Android, iOS, WebAssembly (WASI + Browser).
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sm opacity-60">
          <b>Status:</b> Active development. Features may change; incomplete
          implementations may exist.
        </p>
      </div>
    ),
  },

  // 1. LEXICAL & SYNTAX
  {
    id: "lexical",
    title: "1. Lexical & Syntax",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Lexical & Syntax
          </h1>
        </div>

        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
            <MessageSquare className="text-primary" size={24} /> Comments
          </h3>
          <p className="opacity-80 mb-4">
            Line and block comments. Block comments support <b>nesting</b>.
          </p>
          <CodeBlock
            filename="comments.mox"
            code={`// Line comment

/* Block comment */

/* Block comments support nesting
   /* Like this */
   The outer comment continues after the inner closes. */`}
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
            <BookOpen className="text-primary" size={24} /> Integer Literals
          </h3>
          <p className="opacity-80 mb-4">
            Integers support decimal, hexadecimal, octal, and binary forms, with
            optional type suffixes and underscore separators.
          </p>
          <CodeBlock
            code={`int decimal = 42;
int hex = 0xFF;
int octal = 0o755;
int binary = 0b1010_1010;

// Underscore separators
int million = 1_000_000;

// Type suffixes
char a = 123i8;
unsigned short b = 0xFFu16;
unsigned int c = 0b1010_1010u32;
long d = 1_000_000i64;`}
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
            <BookOpen className="text-primary" size={24} /> Float Literals
          </h3>
          <CodeBlock
            code={`float pi = 3.14159;
double sci_pos = 1.23e10;
double sci_neg = 4.56E-8;
float trailing = 10.;
float leading = .5;
float separated = 1_000.50_5;`}
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
            <BookOpen className="text-primary" size={24} /> String Literals
          </h3>
          <CodeBlock
            code={`string basic = "Hello\\nWorld\\t\\r\\\\"";

// UTF-8 and emoji are native
string unicode = "Hello, 世界! 🌍🚀";

// Hex and Unicode escapes
string hex = "\\x41\\x42\\x43";       // "ABC"
string emoji_esc = "\\u{1F600}";     // Grinning face

// Raw strings (no escape processing)
string raw = "C:\\\\dev\\\\moksha\\\\tests";

// Template strings (string interpolation)
int val = 20;
string templated = \`Value: \${val}\`;
string computed = \`Calculation: \${10 + 20}\`;`}
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
            <BookOpen className="text-primary" size={24} /> Operators
          </h3>
          <CodeBlock
            code={`// Arithmetic: +  -  *  /  %  **
// Bitwise:    &  |  ^  ~  <<  >>
// Comparison: ==  !=  <  <=  >  >=
// Logical:    &&  ||  !
// Assignment: =  +=  -=  *=  /=  %=  &=  |=  ^=  <<=  >>=
// Increment/Decrement:  a++  a--`}
            language="text"
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
            <Terminal className="text-primary" size={24} /> Pipe Operator
            (|&gt;)
          </h3>
          <p className="opacity-80 mb-4">
            Passes the left-hand expression as the first argument to the
            right-hand function call. Chains evaluate strictly left-to-right.
          </p>
          <CodeBlock
            code={`"hello" |> mock_length() |> println();

int res = (true ? 100 : 200) |> processNumber();`}
          />
          <div className="mt-4 bg-surface/50 border border-border-custom rounded-xl p-6 shadow-sm">
            <h4 className="font-bold mb-2">Rules</h4>
            <ul className="list-disc list-inside opacity-80 leading-relaxed text-sm">
              <li>
                The right side must be a callable (function call or identifier).
              </li>
              <li>
                Type mismatch, arity mismatch, or void propagation causes a
                compile-time error.
              </li>
              <li>
                Precedence:{" "}
                <code className="text-primary">10 + 5 |&gt; process()</code>{" "}
                lowers to <code className="text-primary">process(15)</code>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },

  // 2. TYPES & LAYOUT
  {
    id: "types",
    title: "2. Types & Layout",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Types & Layout
          </h1>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Primitive Types</h3>
          <div className="w-full overflow-x-auto rounded-xl border border-border-custom shadow-sm bg-surface/30">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-foreground border-b border-border-custom">
                  <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                    Type
                  </th>
                  <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom">
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    int, long, char, short
                  </td>
                  <td className="py-4 px-6">Signed integers</td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    unsigned int, unsigned char, unsigned short
                  </td>
                  <td className="py-4 px-6">Unsigned integers</td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    float, double, half, quarter
                  </td>
                  <td className="py-4 px-6">Floating-point</td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    bool
                  </td>
                  <td className="py-4 px-6">Boolean (true / false)</td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    string
                  </td>
                  <td className="py-4 px-6">UTF-8 string</td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    usize, isize
                  </td>
                  <td className="py-4 px-6">
                    Platform-sized unsigned/signed integer
                  </td>
                </tr>
                <tr className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm text-primary">
                    any
                  </td>
                  <td className="py-4 px-6">
                    Dynamic type (holds any value at runtime)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Nullable Types</h3>
          <p className="opacity-80 mb-4">
            Append <code className="text-primary">?</code> to any type to make
            it nullable. Explicit unwrap is required — no implicit narrowing.
          </p>
          <CodeBlock
            code={`int? maybe = 42;
int? nothing = null;

// Explicit unwrap required; no implicit narrowing
int definite = maybe;          // TypeError: T? and T are distinct types
int unwrapped = maybe ?? 0;    // Null-coalescing operator`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Arrays</h3>
          <CodeBlock
            code={`// Fixed-size arrays (exact compile-time length required)
int[5] fixed = [1, 2, 3, 4, 5];
int[2][2] matrix = [[1, 0], [0, 1]];

// Dynamic arrays (slices)
int[] dynamic = [10, 20, 30];
string[] names = ["Alice", "Bob"];

// Array operations
dynamic.push(40);
dynamic.pop();
dynamic.insert(1, 15);
dynamic.remove(0);
dynamic.sort();
dynamic.reverse();
dynamic.fill(0);
int[] cloned = dynamic.clone();
int[] sliced = dynamic.slice(1, 3);
dynamic.clear();`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Tables (Maps)</h3>
          <CodeBlock
            code={`table<string, int> scores = {
    "Alice": 100,
    "Bob": 95
};

println(scores["Alice"]);

// Built-ins
scores.has("Alice");   // true
scores.length();        // 2
scores.remove("Bob");
scores.clear();`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Structs</h3>
          <p className="opacity-80 mb-4">
            Stack-allocated, C-compatible memory layout.
          </p>
          <CodeBlock
            code={`struct StandardHeader {
    int version;
    unsigned int id;
}

packed struct metadata {       // No padding between fields
    unsigned int sensor_id;
    int timestamp;
    unsigned char active;
}

align(4) struct aligned_data { // Custom alignment
    int value;
}`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Unions</h3>
          <p className="opacity-80 mb-4">
            Tagless memory overlays. Reading an inactive field is undefined
            behavior; requires <code className="text-primary">unsafe</code>.
          </p>
          <CodeBlock
            code={`union ValueOverlay {
    int int_val;
    float float_val;
}

unsafe {
    ValueOverlay data;
    data.int_val = 0x3F800000;  // Bit pattern for 1.0f
    float check = data.float_val;  // 1.0
}`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Bitfields</h3>
          <p className="opacity-80 mb-4">
            Width must not exceed the base integer type's bit width. Floats are
            not allowed as base types.
          </p>
          <CodeBlock
            code={`struct Flags {
    int present : 1;
    int mode    : 3;
    int type    : 4;
}`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Classes</h3>
          <CodeBlock
            code={`// Value class (stack-allocated by default)
class Vector2 {
    public int x;
    public int y;

    constructor(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

// Reference class (heap-allocated, ARC-managed)
ref class Player {
    public string name;

    constructor(string name) {
        this.name = name;
    }
}

Vector2 v = new Vector2(10, 20);        // Stack
Player p = new Player("Hero");          // Heap (ARC)
shared Vector2 heapV = new Vector2(30, 40);  // Forced heap (ARC)

// Zero-initialization: new with no args zeroes all fields
Vector2 zeroed = new Vector2();
println(zeroed.x); // 0`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Inheritance</h3>
          <p className="opacity-80 mb-4">
            Only <code className="text-primary">ref class</code> can inherit
            from <code className="text-primary">ref class</code>. Value classes
            cannot inherit from ref classes and vice versa.
          </p>
          <CodeBlock
            code={`ref class Entity {
    public string id;
    constructor(string id) { this.id = id; }
}

ref class Player(Entity) {
    public int health;
    constructor(string name, int hp) {
        super(name);
        this.health = hp;
    }
    void takeDamage(int amount) { this.health -= amount; }
}

// Generic inheritance
generic <T>
ref class Box(BaseBox) {
    public T item;
    constructor(int cap, T item) {
        super(cap);
        this.item = item;
    }
    T getItem() { return this.item; }
}`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Enums</h3>
          <p className="opacity-80 mb-4">
            Comparison and arithmetic require explicit cast.
          </p>
          <CodeBlock
            code={`enum DeviceState { IDLE, BUSY, ERROR, DISCONNECTED }
enum Status { Ready = 5, Busy = 10 }

Status s = Status.Ready;

// Comparison and arithmetic require explicit cast
if (cast<int>(s) == 5) { println("Match"); }
int offset = cast<int>(Status.Busy) + 2;  // 12`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">Generics</h3>
          <p className="opacity-80 mb-4">
            Generics are strictly <b>invariant</b> by default:{" "}
            <code className="text-primary">Box&lt;Dog&gt;</code> is not
            assignable to{" "}
            <code className="text-primary">Box&lt;Animal&gt;</code>.
          </p>
          <CodeBlock
            code={`generic Box<T> {
    T value;
    void update(T newValue) {
        this.value = newValue;
    }
}

Box<int> intBox = new Box<int>();
intBox.update(100);

Box<string> strBox = new Box<string>();
strBox.update("Hello!");`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-4">The `any` Type</h3>
          <p className="opacity-80 mb-4">
            A dynamic type that can hold any value at runtime.
          </p>
          <CodeBlock
            code={`any dyn_var;

dyn_var = null;
dyn_var = true;
dyn_var = 42;
dyn_var = 3.14;
dyn_var = "Hello";
dyn_var = [1, 2, 3];

// Casting from any back to concrete type
any val = 10;
int x = int(val);        // Runtime cast; tag mismatch causes CastException`}
          />
        </div>
      </div>
    ),
  },

  // 3. CONTROL FLOW
  {
    id: "controlflow",
    title: "3. Control Flow",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Control Flow
          </h1>
        </div>

        <h3 className="text-2xl font-bold">if / else</h3>
        <CodeBlock
          code={`if (condition) {
    // ...
} else if (otherCondition) {
    // ...
} else {
    // ...
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Ternary</h3>
        <CodeBlock code={`int result = (x > 10) ? x : 10;`} />

        <h3 className="text-2xl font-bold mt-4">switch</h3>
        <p className="opacity-80">
          Requires explicit <code className="text-primary">break</code> per case
          (no implicit fallthrough). Supports ranges and enum exhaustiveness
          checking. Empty cases fall through to the next case.
        </p>
        <CodeBlock
          code={`switch (val) {
    case 1: println("One"); break;
    case 10:20: println("Range 10 to 20"); break;  // Range syntax
    default: println("Other"); break;
}

// Enum switch with exhaustiveness
enum State { Start, Processing, End }
switch (state) {
    case State.Start:      println("Starting"); break;
    case State.Processing: println("Working"); break;
    case State.End:        println("Done"); break;
}

switch (state) {
    case DeviceState.IDLE:
        println("Ready");
        break;
    case DeviceState.BUSY:
    case DeviceState.ERROR:    // Falls through from BUSY
        println("Action required");
        break;
}`}
        />

        <h3 className="text-2xl font-bold mt-4">while</h3>
        <CodeBlock
          code={`while (condition) {
    // ...
}`}
        />

        <h3 className="text-2xl font-bold mt-4">for</h3>
        <CodeBlock
          code={`for (int i = 0; i < 10; i++) {
    println(i);
}`}
        />

        <h3 className="text-2xl font-bold mt-4">for-in</h3>
        <p className="opacity-80">
          Iteration behavior varies by collection type and variable count.
        </p>
        <p className="opacity-80 mt-2">
          <b>String</b> (1 variable only — yields characters):
        </p>
        <CodeBlock code={`for (char c in "ABC") { println(c); }  // A, B, C`} />

        <p className="opacity-80 mt-2">
          <b>Array</b> (1 variable = value, 2 variables = index + value):
        </p>
        <CodeBlock
          code={`int[] nums = [10, 20, 30];

// 1 variable: values only
for (int val in nums) { println(val); }        // 10, 20, 30

// 2 variables: index + value
for (int idx, int val in nums) { println(idx); } // 0, 1, 2`}
        />

        <p className="opacity-80 mt-2">
          <b>Table</b> (1 variable = key only, 2 variables = key + value):
        </p>
        <CodeBlock
          code={`table<string, int> scores = {"Alice": 90, "Bob": 85};

// 1 variable: keys only
for (string name in scores) { println(name); }        // Alice, Bob

// 2 variables: key + value
for (string key, any val in scores) { println(val); }  // 90, 85`}
        />

        <h3 className="text-2xl font-bold mt-4">break & continue</h3>
        <CodeBlock
          code={`while (true) {
    if (done) break;
    if (skip) continue;
}`}
        />

        <h3 className="text-2xl font-bold mt-4">defer</h3>
        <p className="opacity-80">
          Registers a cleanup statement that executes before the function
          returns, in LIFO (Last-In, First-Out) order. Also runs on early
          return.
        </p>
        <CodeBlock
          code={`void test_defer() {
    int x = 10;
    defer println("Second");   // Executes last
    defer println("First");    // Executes second
    println("Normal");         // Executes first

    // Also runs on early return
    if (x > 5) return;
    println("Unreachable");
}`}
        />

        <div className="mt-4 bg-surface/50 border border-border-custom rounded-xl p-6 shadow-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <GitBranch className="text-primary" size={20} /> Definite Assignment
          </h3>
          <p className="opacity-80 text-sm leading-relaxed">
            Variables must be definitely assigned on all paths before use. The
            compiler traces through control flow graphs including{" "}
            <code className="text-primary">if</code>,{" "}
            <code className="text-primary">switch</code>,{" "}
            <code className="text-primary">try/catch</code>, and loops.
          </p>
          <CodeBlock
            code={`int x;
if (cond) {
    x = 10;
} else {
    x = 20;
}
println(x);  // OK: assigned on all paths`}
          />
        </div>
      </div>
    ),
  },

  // 4. FUNCTIONS & CLOSURES
  {
    id: "functions",
    title: "4. Functions & Closures",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Functions & Closures
          </h1>
        </div>

        <h3 className="text-2xl font-bold">Function Declarations</h3>
        <CodeBlock
          code={`// Named function
int add(int a, int b) {
    return a + b;
}

// Void function
void greet(string name) {
    println(\`Hello, \${name}!\`);
}

// Default parameters
void processData(string data, int retries = 3, int timeout = 5000) {
    // ...
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Closures</h3>
        <p className="opacity-80">
          A closure is a fat pointer (function pointer + environment pointer)
          that captures variables from the enclosing scope. Closures are typed
          with the{" "}
          <code className="text-primary">closure(params...) -&gt; return</code>{" "}
          syntax and can be invoked like a function.
        </p>
        <CodeBlock
          code={`// Typed closure
closure(int, int) -> int addFunc = (int a, int b) => {
    return a + b;
};

// Short-form closure
closure() -> int counter = () => {
    return 42;
};

println(addFunc(50, 50));  // 100`}
        />

        <h3 className="text-2xl font-bold mt-4">Capture Modes</h3>
        <p className="opacity-80 mb-4">
          A closure can capture variables using one of four explicit capture
          modifiers, placed before the parameter list:
        </p>
        <div className="w-full overflow-x-auto rounded-xl border border-border-custom shadow-sm bg-surface/30 mb-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface text-foreground border-b border-border-custom">
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Modifier
                </th>
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Capture Mode
                </th>
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Semantics
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  (none)
                </td>
                <td className="py-4 px-6">Snapshot (by-value copy)</td>
                <td className="py-4 px-6 text-sm opacity-80">
                  Captured variables are copied into the environment at closure
                  creation. Later mutations of the outer variable do not affect
                  the closure, and vice versa.
                </td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  &amp;()
                </td>
                <td className="py-4 px-6">View (immutable borrow)</td>
                <td className="py-4 px-6 text-sm opacity-80">
                  Captured variables are borrowed read-only. The closure reads
                  the latest value; the outer scope cannot mutate the variable
                  while the closure is alive.
                </td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  &amp;mut ()
                </td>
                <td className="py-4 px-6">Mut (mutable borrow)</td>
                <td className="py-4 px-6 text-sm opacity-80">
                  Captured variables are borrowed mutably. The closure can read
                  and write the outer variable; the outer scope cannot access it
                  while the closure is alive.
                </td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  move ()
                </td>
                <td className="py-4 px-6">Move (ownership transfer)</td>
                <td className="py-4 px-6 text-sm opacity-80">
                  Ownership of captured variables is transferred into the
                  closure environment. The outer variable is moved and can no
                  longer be used after the closure is created.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={`void test_snapshot_capture() {
    int a = 10;
    // Snapshot: 'a' is copied into the environment at creation time.
    closure() -> int snap = () => { return a + 5; };
    a = 20; // Mutating 'a' outside does NOT affect the snapshot.
    println(snap()); // Expected: 15
}

void test_view_capture() {
    int b = 100;
    // View: 'b' is borrowed read-only. The closure reads the live value.
    closure() -> int view_closure = &() => { return b; };
    println(view_closure()); // Expected: 100
}

void test_mut_capture() {
    int c = 50;
    // Mut: 'c' is borrowed mutably; the closure can modify it.
    closure() -> void mut_closure = &mut () => { c = c + 10; };
    mut_closure();
    println(c); // Expected: 60
}

void test_move_capture() {
    string d = "Hello Moksha";
    // Move: ownership of 'd' transfers into the closure environment.
    closure() -> string move_closure = move () => { return d; };
    println(move_closure()); // Expected: Hello Moksha
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Capture Mode Rules</h3>
        <ul className="list-disc list-inside opacity-80 leading-8">
          <li>
            <b>Snapshot (default):</b> Captured primitives are copied by value.
            The closure and the outer scope operate on independent copies.
          </li>
          <li>
            <b>&amp;mut affects all captures from that scope:</b> all captures
            become mutable references rather than snapshots.
          </li>
          <li>
            <b>Borrow errors:</b> Mutating a captured variable from both the
            closure and the outer scope is a compile-time borrow error (enforced
            by NLL borrow checking). Multiple simultaneous{" "}
            <code className="text-primary">&amp;mut</code> closures over the
            same variable are rejected;{" "}
            <code className="text-primary">&amp;mut</code> and{" "}
            <code className="text-primary">&amp;</code> closures conflict.
          </li>
          <li>
            <b>Move closes over the variable:</b> the original variable is moved
            into the environment and is no longer usable in the outer scope.
          </li>
          <li>
            <b>Environment cleanup:</b> when a{" "}
            <code className="text-primary">move</code> closure goes out of
            scope, its environment (and captured objects it owns) is destroyed,
            running destructors.
          </li>
        </ul>
        <CodeBlock
          code={`void test_move_drop() {
    class Logger {
        public string name;
        constructor(string n) { this.name = n; }
        destructor() { println("Destroyed: " + this.name); }
    }

    Logger lg = new Logger("Resource1");
    // 'lg' is owned by the closure and destroyed with it.
    closure() -> void f = move () => {
        println("Using: " + lg.name);
    };
    f();
    // Expected output: Using: Resource1, Destroyed: Resource1
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Shared Environment</h3>
        <p className="opacity-80 mb-4">
          Multiple closures can capture the same variable with compatible borrow
          kinds, sharing a single environment.
        </p>
        <CodeBlock
          code={`void test_shared_env() {
    int x = 0;
    // Both closures capture the same 'x': one mutably, one immutably.
    closure() -> void inc = &mut () => { x = x + 1; };
    closure() -> int get = &() => { return x; };

    inc();
    inc();
    println(get()); // Expected: 2
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Closure Identity</h3>
        <p className="opacity-80 mb-4">
          Closures are compared by reference: equality requires both the same
          function pointer <b>and</b> the same environment pointer.
        </p>
        <CodeBlock
          code={`void test_closure_identity() {
    int x = 10;
    closure() -> int a = () => { return x; };
    closure() -> int b = () => { return x; };
    closure() -> int c = a;

    println(a == c); // Expected: true (same env)
    println(a == b); // Expected: false (different env allocations)
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Non-Capturing Closures</h3>
        <p className="opacity-80 mb-4">
          If a closure captures nothing, its environment pointer is{" "}
          <code className="text-primary">null</code>; it can be treated like a
          plain function pointer with zero environment overhead.
        </p>
        <CodeBlock
          code={`closure(int) -> int f = (int x) => { return x + 1; };
println(f(5)); // Expected: 6`}
        />

        <h3 className="text-2xl font-bold mt-4">Nested & Returning Closures</h3>
        <CodeBlock
          code={`void test_nested_mutation_layers() {
    int x = 1;
    // Outer closure returns an inner closure that mutates the shared capture.
    closure() -> closure() -> void outer = &mut () => {
        return &mut () => { x = x * 2; };
    };
    closure() -> void f = outer();
    f();
    println(x); // Expected: 2
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Operator Overloading</h3>
        <CodeBlock
          code={`class Vector2 {
    public int x;
    public int y;
    constructor(int x, int y) { this.x = x; this.y = y; }

    Vector2 operator+(Vector2 other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    bool operator==(Vector2 other) {
        return this.x == other.x && this.y == other.y;
    }

    Vector2 operator-() {  // Unary negation
        return new Vector2(-this.x, -this.y);
    }
}

Vector2 v3 = v1 + v2;
Vector2 neg = -v1;`}
        />

        <h3 className="text-2xl font-bold mt-4">Method Overloading</h3>
        <p className="opacity-80 mb-4">
          Methods can be overloaded by parameter types or count.
        </p>
        <CodeBlock
          code={`void process(int x) { println(x); }
void process(string s) { println(s); }

process(42);       // Calls int version
process("hello");  // Calls string version`}
        />

        <div className="mt-4 bg-surface/50 border border-border-custom rounded-xl p-6 shadow-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Code2 className="text-primary" size={20} /> Higher-Order Functions
            &amp; Recursion
          </h3>
          <p className="opacity-80 text-sm leading-relaxed mb-4">
            Functions are first-class citizens and can be passed as arguments or
            returned from other functions. Mutual recursion is supported.
          </p>
          <CodeBlock
            code={`int apply(int x, closure(int) -> int fn) {
    return fn(x);
}

int double(int x) { return x * 2; }

println(apply(5, double));  // 10`}
          />
        </div>
      </div>
    ),
  },

  // 5. MEMORY & OWNERSHIP
  {
    id: "memory",
    title: "5. Memory & Ownership",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Memory & Ownership
          </h1>
        </div>
        <p className="opacity-80">
          Moksha uses <b>Automatic Reference Counting (ARC)</b> paired with{" "}
          <b>Non-Lexical Lifetime (NLL) borrow checking</b> for deterministic
          memory management. There is no garbage collector.
        </p>

        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Key className="text-primary" size={24} /> Storage Qualifiers
        </h3>
        <CodeBlock
          code={`int x = 10;           // Mutable
lock int y = 30;      // Thread-safe (exclusive lock access)`}
        />

        <h3 className="text-2xl font-bold mt-4">Pointer Types</h3>
        <p className="opacity-80 mb-4">
          Pointers are immutable by default, but can be made mutable using{" "}
          <code className="text-primary">*mut</code>.
        </p>
        <div className="w-full overflow-x-auto rounded-xl border border-border-custom shadow-sm bg-surface/30">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface text-foreground border-b border-border-custom">
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Syntax
                </th>
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  *mut T
                </td>
                <td className="py-4 px-6">Mutable raw pointer</td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  *view T
                </td>
                <td className="py-4 px-6">
                  Immutable view pointer (read-only)
                </td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  *lock T
                </td>
                <td className="py-4 px-6">
                  Thread-safe pointer (exclusive lock)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={`int val = 42;
*mut int ptr = &val;

unsafe {
    *ptr = 100;
    println(*ptr);
}

*view int viewPtr = &val;     // Read-only
*lock int lockPtr = &val;     // Thread-safe`}
        />

        <h3 className="text-2xl font-bold mt-4">Reference Types</h3>
        <div className="w-full overflow-x-auto rounded-xl border border-border-custom shadow-sm bg-surface/30">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface text-foreground border-b border-border-custom">
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Syntax
                </th>
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  &amp;T
                </td>
                <td className="py-4 px-6">Immutable reference</td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  &amp;mut T
                </td>
                <td className="py-4 px-6">Mutable reference</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={`int val = 100;
*mut int mutPtr = &mut val;
*view int viewPtr = &val;`}
        />

        <div className="mt-4 bg-[#161616] p-6 rounded-xl border-l-4 border-red-500">
          <h3 className="text-lg font-bold text-red-500 mb-2 flex items-center gap-2">
            <Zap size={20} /> NLL Borrow Rules
          </h3>
          <ul className="list-disc list-inside opacity-80 text-sm leading-relaxed">
            <li>
              <b>Single-writer OR multiple-readers</b> at any given time (no
              overlapping <code>*mut</code> and <code>*view</code> on the same
              data).
            </li>
            <li>Borrows end at their last use, not at scope exit.</li>
            <li>Returning a pointer to a local variable is a compile error.</li>
            <li>
              Mutable pointers across <code>await</code> suspension points are
              rejected.
            </li>
          </ul>
          <CodeBlock
            code={`int data = 10;
*mut int m1 = &data;
*mut int m2 = &data;  // ERROR: second mutable borrow while m1 is alive`}
          />
        </div>

        <h3 className="text-2xl font-bold mt-4">Lock Blocks</h3>
        <p className="opacity-80 mb-4">
          <code className="text-primary">lock</code> blocks elevate a{" "}
          <code className="text-primary">*lock</code> pointer to{" "}
          <code className="text-primary">*mut</code> for the duration of the
          block. Reentrancy is forbidden: locking an already-locked pointer
          causes a compile error.
        </p>
        <CodeBlock
          code={`lock int shared_data = 300;
*lock int shared_ptr = &shared_data;

lock (shared_ptr) {
    *shared_ptr = *shared_ptr + 1;  // Elevated to *mut inside block
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Scope Release & Drop Order</h3>
        <p className="opacity-80 mb-4">
          Destructors and <code className="text-primary">defer</code> statements
          execute in reverse order (LIFO). NLL ensures resources are released at
          the point of last use.
        </p>
        <CodeBlock
          code={`void test_lifetime() {
    string s = "hello";
    *view string v = &s;
    int read = *v;   // v used here
    // v is no longer alive after this point
    consume(s);       // OK: s can be moved here
}`}
        />

        <h3 className="text-2xl font-bold mt-4">
          ARC (Automatic Reference Counting)
        </h3>
        <p className="opacity-80 mb-4">
          ARC manages the lifetime of heap-allocated objects. The compiler
          inserts retain/release calls. ARC optimizations include:
        </p>
        <ul className="list-disc list-inside opacity-80 leading-8">
          <li>
            <b>Pair elision:</b> adjacent retain+release pairs are optimized
            out.
          </li>
          <li>
            <b>Loop elision:</b> retain/release inside tight loops are hoisted.
          </li>
          <li>
            <b>Early return:</b> ARC correctly cleans up on early returns.
          </li>
          <li>
            <b>Exception paths:</b> ARC handles unwinding correctly.
          </li>
        </ul>
        <CodeBlock
          code={`// Shared heap value with ARC
shared Vector2 heapV = new Vector2(30, 40);`}
        />

        <h3 className="text-2xl font-bold mt-4">Weak References</h3>
        <p className="opacity-80 mb-4">
          <code className="text-primary">weak</code> prevents reference cycles
          in ARC graphs.
        </p>
        <CodeBlock
          code={`// Weak async references do not create strong reference cycles
weak async string fetchWeakData() {
    return "Weak Data";
}`}
        />
      </div>
    ),
  },

  // 6. CONCURRENCY & ASYNC
  {
    id: "concurrency",
    title: "6. Concurrency & Async",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Concurrency & Async
          </h1>
        </div>

        <h3 className="text-2xl font-bold text-primary">Async Functions</h3>
        <CodeBlock
          code={`async string fetchData() {
    return "Data fetched";
}

async void run() {
    string data = await fetchData();
    println(data);
}

run();`}
        />

        <h3 className="text-2xl font-bold text-primary mt-4">Weak Async</h3>
        <p className="opacity-80 mb-4">
          Weak async functions return promises that do not create strong
          reference cycles.
        </p>
        <CodeBlock
          code={`weak async string fetchWeakData() {
    return "Weak Data";
}`}
        />

        <h3 className="text-2xl font-bold text-primary mt-4">Threads</h3>
        <CodeBlock
          code={`new thread(() => {
    println("Background thread");
});

new weak thread(() => {
    println("Weak background thread");
});`}
        />

        <h3 className="text-2xl font-bold text-primary mt-4">
          Thread-Local Storage
        </h3>
        <CodeBlock
          code={`static thread_local int cpu_id = 0;
static thread_local int[10] kernel_gs_base;`}
        />

        <h3 className="text-2xl font-bold text-primary mt-4">Atomics</h3>
        <CodeBlock
          code={`unsigned int data = 0_u32;
*mut unsigned int ptr = &data;

atomic_store(ptr, 100_u32);
unsigned int val = atomic_load(ptr);

unsigned int old = atomic_add(ptr, 10_u32);
unsigned int current = atomic_cas(ptr, 110_u32, 200_u32);

atomic_fence_acquire();
atomic_fence_release();
atomic_fence_seqcst();`}
        />

        <h3 className="text-2xl font-bold text-primary mt-4">Lock Elevation</h3>
        <p className="opacity-80 mb-4">
          Inside a <code className="text-primary">lock</code> block,{" "}
          <code className="text-primary">*lock</code> pointers are elevated to{" "}
          <code className="text-primary">*mut</code> capabilities.
        </p>
        <CodeBlock
          code={`lock int shared_data = 100;
*lock int p = &shared_data;

lock (p) {
    *p = 200;              // Elevated to *mut
    *view int v = p;       // Safe to take a view inside the lock
}`}
        />

        <h3 className="text-2xl font-bold text-primary mt-4">Channels</h3>
        <CodeBlock
          code={`shared Channel<int> ch = new Channel<int>(2);  // Ring buffer, capacity 2
shared Channel<int> ch_alias = ch;

spawn(async () => {
    await ch_alias.send(100);
    await ch_alias.send(200);
});

int val1 = await ch.recv();  // Suspends if queue is empty
int val2 = await ch.recv();`}
        />

        <h3 className="text-2xl font-bold text-primary mt-4">
          Promises, Spawn, Join, Select
        </h3>
        <CodeBlock
          code={`// Spawn returns a promise
promise<void> t1 = spawn(async () => {
    await sleep(10);
});

promise<int> a = spawn(async () => { await sleep(100); return 1; });
promise<int> b = spawn(async () => { await sleep(10); return 2; });

// Join: wait for all promises
int[] results = await join(a, b);

// Select: wait for first promise to complete
int winner = await select(a, b);

// Cancel a running task
promise<void> task = spawn(infinite_task());
cancel(task);`}
        />

        <h3 className="text-2xl font-bold text-primary mt-4">Async Mutex</h3>
        <CodeBlock
          code={`AsyncMutex mtx = new AsyncMutex();
int shared_resource = 0;

spawn(async () => {
    async lock(mtx) {
        shared_resource = shared_resource + 1;
        await sleep(10);  // Safe to suspend while holding AsyncMutex
    }
});`}
        />

        <h3 className="text-2xl font-bold text-primary mt-4">
          Sleep, Yield, Timeout
        </h3>
        <CodeBlock
          code={`await sleep(50);     // Suspend for 50ms
await yield();       // Yield to scheduler (cooperative)

promise<int> result = await timeout(some_long_task(), 100);  // 100ms timeout`}
        />

        <div className="mt-4 bg-surface/50 border border-border-custom rounded-xl p-6 shadow-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Activity className="text-primary" size={20} /> Notes
          </h3>
          <p className="opacity-80 text-sm leading-relaxed">
            <code className="text-primary">async_scope</code> /{" "}
            <code className="text-primary">TaskGroup</code> and structured
            concurrency patterns are not yet implemented.
          </p>
        </div>
      </div>
    ),
  },

  // 7. EXCEPTIONS & PANICS
  {
    id: "exceptions",
    title: "7. Exceptions & Panics",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Exceptions & Panics
          </h1>
        </div>

        <h3 className="text-2xl font-bold text-primary">
          Throw & Try/Catch/Finally
        </h3>
        <p className="opacity-80">
          Throw any value. Catch by type.{" "}
          <code className="text-primary">any</code> is the catch-all.
        </p>
        <CodeBlock
          code={`void riskyOperation() {
    if (true) throw "Something went wrong";
}

try {
    riskyOperation();
} catch (string e) {
    println(\`Caught: \${e}\`);
} catch (int e) {
    println(\`Caught int: \${e}\`);
} catch (any e) {
    println(\`Caught any: \${e}\`);
} finally {
    println("Always executes");
}`}
        />

        <div className="mt-4 bg-surface/50 border border-border-custom rounded-xl p-6 shadow-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <ShieldAlert className="text-red-500" size={20} /> Rules
          </h3>
          <ul className="list-disc list-inside opacity-80 leading-relaxed text-sm">
            <li>
              <code className="text-primary">catch (any e)</code> must come
              last; placing it before more specific handlers is a compile error.
            </li>
            <li>
              Throwing inside a <code className="text-primary">finally</code>{" "}
              block overrides the in-flight exception.
            </li>
            <li>
              Double-fault (throwing while unwinding) causes an immediate
              runtime panic.
            </li>
            <li>
              Uncaught exceptions print a stack trace and exit with non-zero
              status.
            </li>
          </ul>
          <p className="opacity-80 text-sm mt-3">
            <b>Note:</b>{" "}
            <code className="text-primary">throw new Exception(...)</code> and{" "}
            <code className="text-primary">catch (Exception e)</code> are not
            yet implemented. Exceptions are thrown as plain values ({" "}
            <code className="text-primary">throw 404</code>,{" "}
            <code className="text-primary">throw "error"</code>) and caught by
            their runtime type.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-primary mt-4">Panic</h3>
        <p className="opacity-80 mb-4">
          Runtime panics trigger immediate termination with a diagnostic
          message.
        </p>
        <CodeBlock
          code={`// Index out of bounds
int[] arr = [1, 2, 3];
// arr[100];   // Runtime panic: index out of bounds

// Null pointer dereference
int?[] null_arr = null;
// null_arr[0];  // Runtime panic

// Key not found
table<string, int> scores = {"Alice": 100};
// scores["Unknown"];  // Runtime panic`}
        />

        <div className="mt-4 bg-surface/50 border border-border-custom rounded-xl p-6 shadow-sm">
          <h3 className="font-bold mb-2">Unhandled Async Rejections</h3>
          <p className="opacity-80 text-sm leading-relaxed">
            When an unawaited async promise is rejected and its ARC handle
            drops, the runtime panics with "Unhandled Promise Rejection".
          </p>
        </div>
      </div>
    ),
  },

  // 8. FFI & SYSTEM
  {
    id: "ffi",
    title: "8. FFI & System",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            FFI & System
          </h1>
        </div>

        <h3 className="text-2xl font-bold">External Function Binding</h3>
        <CodeBlock
          code={`// Link against the C standard library
extern "C" {
    int printf(char* fmt, ...);
    void* malloc(usize size);
    void free(void* ptr);
}

// Link against a specific library
extern "libcurl" {
    int curl_easy_init();
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Calling Conventions</h3>
        <CodeBlock
          code={`extern "C" void c_func();
extern "stdcall" void win32_func();
extern "fastcall" void perf_func();`}
        />

        <h3 className="text-2xl font-bold mt-4">Unsafe Blocks</h3>
        <p className="opacity-80 mb-4">
          Raw pointer dereferences and certain operations require{" "}
          <code className="text-primary">unsafe</code> blocks.
        </p>
        <CodeBlock
          code={`unsafe {
    *mut int ptr = cast<*mut int>(0x1000);
    *ptr = 42;
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Volatile Pointers</h3>
        <p className="opacity-80 mb-4">
          For memory-mapped I/O (MMIO) and hardware register access.
        </p>
        <CodeBlock
          code={`// Cast a hardware address to a volatile pointer
*mut volatile unsigned int uart0 = cast<*mut volatile unsigned int>(hardware_addr);
*uart0 = 0x01;  // Volatile write prevents compiler reordering

// Or volatile on the pointer itself
volatile *mut int hw_reg = cast<volatile *mut int>(0x40022000);
*hw_reg = 0x01;

// Volatile local variable with non-volatile pointer
volatile int target = 0;
*mut volatile int p_vol = &target;`}
        />

        <h3 className="text-2xl font-bold mt-4">Linker Attributes</h3>
        <CodeBlock
          code={`section(".text") void in_custom_section() {}

weak int optional_symbol = 0;

used void ensure_emitted() {}

pure int compute(int x) { return x * 2; }  // No side effects; optimizer can fold`}
        />

        <h3 className="text-2xl font-bold mt-4">
          Interrupt / ISR / Naked Functions
        </h3>
        <CodeBlock
          code={`interrupt void timer_isr() {
    // Interrupt handler body
}

naked void bare_entry() {
    asm("ret");
}

noreturn void halt() {
    while (true) {}
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Inline Assembly</h3>
        <CodeBlock
          code={`// Basic asm
asm("cli");
asm("1: hlt; jmp 1b");

// With clobbers
asm("mov $$42, %rax") clobber("rax", "rbx") volatile;

// With inout operands
int x = 10;
asm("add $$1, $0") inout("+r"(x)) clobber("cc") volatile;
println(x);  // 11

// With in-only operands
int in_val = 5;
int out_val = 0;
asm("mov $1, ($0)") in("r"(&out_val)) in("r"(in_val));
println(out_val);  // 5`}
        />

        <h3 className="text-2xl font-bold mt-4">Intrinsics</h3>
        <CodeBlock
          code={`unsigned int data = 0x000000FF_u32;
unsigned int reversed = bswap32(data);       // Byte-swap
int leading = clz(data);                     // Count leading zeros
usize size = sizeof(int);                    // Type size in bytes
float f = bitcast<float>(raw_bits);          // Reinterpret bits (no conversion)`}
        />

        <h3 className="text-2xl font-bold mt-4">Cross-Compilation</h3>
        <CodeBlock
          code={`mokshac source.mox -target x86_64-pc-linux-gnu -o output
mokshac source.mox -target aarch64-linux-android -o output_android
mokshac source.mox -target wasm32-wasi -o output.wasm`}
          language="bash"
        />
      </div>
    ),
  },

  // 9. MODULES & MACROS
  {
    id: "modules",
    title: "9. Modules & Macros",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Modules & Macros
          </h1>
        </div>

        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Box className="text-primary" size={24} /> Module Imports
        </h3>
        <p className="opacity-80">
          Moksha supports <b>four</b> import syntaxes, including Python-style{" "}
          <code className="text-primary">from ... import ...</code> and
          JavaScript-style destructured imports with{" "}
          <code className="text-primary">as</code> aliasing.
        </p>

        <p className="opacity-80 mt-2">
          <b>1. Full module import</b> (Python-style):
        </p>
        <CodeBlock
          code={`import test

void run() {
    println(test.test_multiplier);          // Access imported global via module namespace
    int r = test.calculate_magic(10, 20);   // Call imported function
    test.TestConfig cfg = new test.TestConfig(42); // Instantiate imported class
}`}
        />

        <p className="opacity-80 mt-2">
          <b>2. Full module import with alias</b> (
          <code className="text-primary">import module as alias</code>):
        </p>
        <CodeBlock
          code={`import test as t

void run() {
    println(t.test_multiplier);              // Expected: 5
    int r = t.calculate_magic(10, 20);       // Expected: 150
    t.TestConfig cfg = new t.TestConfig(42); // Expected: version = 42
}`}
        />

        <p className="opacity-80 mt-2">
          <b>3. Python-style destructured import</b> (
          <code className="text-primary">
            from "file" import &#123; a, b &#125;
          </code>
          ):
        </p>
        <CodeBlock
          code={`from "test" import { test_multiplier, calculate_magic, TestConfig }

void run() {
    println(test_multiplier);        // Imported symbols are used directly
    int r = calculate_magic(10, 20);
    TestConfig cfg = new TestConfig(42);
}`}
        />

        <p className="opacity-80 mt-2">
          <b>4. JavaScript-style destructured import</b> (
          <code className="text-primary">
            import &#123; a, b &#125; from "file"
          </code>
          ):
        </p>
        <CodeBlock
          code={`import { test_multiplier, calculate_magic, TestConfig } from "test"`}
        />

        <p className="opacity-80 mt-2">
          <b>5. Per-symbol aliasing</b> (
          <code className="text-primary">symbol as alias</code>) — both
          destructured forms support renaming:
        </p>
        <CodeBlock
          code={`// Python-style
from "test" import { test_multiplier as tm, calculate_magic as calc, TestConfig as TC }

// JavaScript-style
import { test_multiplier as tm, calculate_magic as calc, TestConfig as TC } from "test"

void run() {
    println(tm);            // Expected: 5
    int r = calc(10, 20);   // Expected: 150
    TC cfg = new TC(42);    // Expected: version = 42
}`}
        />

        <p className="opacity-80 mt-2">
          <b>6. Bare / side-effect import and cross-folder imports:</b>
        </p>
        <CodeBlock
          code={`// Bare import (module namespace available)
import "std/io"

// Cross-folder imports (relative paths)
import { Helper } from "../utils/helper"`}
        />

        <div className="w-full overflow-x-auto rounded-xl border border-border-custom shadow-sm bg-surface/30 mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface text-foreground border-b border-border-custom">
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Syntax
                </th>
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Style
                </th>
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Use
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  import test
                </td>
                <td className="py-4 px-6">Python</td>
                <td className="py-4 px-6">
                  Import whole module; access via test.
                </td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  import test as t
                </td>
                <td className="py-4 px-6">Python</td>
                <td className="py-4 px-6">Import whole module under alias t</td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  import &#123; a, b &#125; from "test"
                </td>
                <td className="py-4 px-6">JS</td>
                <td className="py-4 px-6">
                  Import selected symbols into scope
                </td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  from "test" import &#123; a, b &#125;
                </td>
                <td className="py-4 px-6">Python</td>
                <td className="py-4 px-6">
                  Import selected symbols into scope
                </td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  from "test" import &#123; a as x &#125;
                </td>
                <td className="py-4 px-6">Python</td>
                <td className="py-4 px-6">Import and rename a symbol</td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  import "std/io"
                </td>
                <td className="py-4 px-6">Bare</td>
                <td className="py-4 px-6">
                  Load module without binding its symbols
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold mt-4">Exporting Symbols</h3>
        <p className="opacity-80 mb-4">
          Mark symbols with <code className="text-primary">public</code> to make
          them importable.
        </p>
        <CodeBlock
          filename="test.mox"
          code={`public int test_multiplier = 5;

public int calculate_magic(int a, int b) {
    return (a + b) * test_multiplier;
}

public class TestConfig {
    public int version;
    constructor(int v) { this.version = v; }
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Visibility Modifiers</h3>
        <div className="w-full overflow-x-auto rounded-xl border border-border-custom shadow-sm bg-surface/30 mb-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface text-foreground border-b border-border-custom">
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Modifier
                </th>
                <th className="py-4 px-6 font-bold text-sm tracking-wide uppercase opacity-80">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  public
                </td>
                <td className="py-4 px-6">Accessible from any module</td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  protected
                </td>
                <td className="py-4 px-6">
                  Accessible only within the class and its subclasses
                </td>
              </tr>
              <tr className="hover:bg-surface/60 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-primary">
                  private
                </td>
                <td className="py-4 px-6">
                  Accessible only within the defining class
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={`ref class Base {
    public int publicField = 1;
    protected int protectedField = 2;
    private int privateField = 3;
}

ref class Derived(Base) {
    public void test() {
        println(this.publicField);     // OK
        println(this.protectedField);  // OK: visible to subclasses
        // this.privateField;          // ERROR: not visible
    }
}`}
        />

        <h3 className="text-2xl font-bold mt-4">Macros</h3>
        <p className="opacity-80 mb-4">
          Macros are hygienic text-transformations that run before semantic
          analysis. Internal variables are renamed to prevent name collisions
          with caller code.
        </p>
        <CodeBlock
          code={`macro setDouble(target, val) {
    int internal_temp = val;
    target = internal_temp * 2;
}

int result = 0;
setDouble(result, 5);
println(result);  // 10

// 'internal_temp' in the caller's scope is NOT affected
int internal_temp = 100;
println(internal_temp);  // 100`}
        />
        <div className="mt-4 bg-surface/50 border border-border-custom rounded-xl p-6 shadow-sm">
          <h4 className="font-bold mb-2">Macro rules</h4>
          <ul className="list-disc list-inside opacity-80 leading-relaxed text-sm">
            <li>
              Parameters must be raw identifiers (no types, no expressions).
            </li>
            <li>Duplicate parameter names are rejected.</li>
            <li>Bodies must form valid AST nodes.</li>
            <li>Recursive macros are caught at expansion time.</li>
            <li>
              Expanded bindings respect the block scope they expand into (no
              cross-arm leakage in <code className="text-primary">switch</code>
              ).
            </li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold mt-4">Enum & Macro Interaction</h3>
        <CodeBlock
          code={`macro swap(a, b) {
    any temp = a;
    a = b;
    b = temp;
}

enum Color { Red, Green, Blue }
Color x = Color.Red;
Color y = Color.Green;
swap(x, y);  // x is now Green, y is now Red`}
        />

        <h3 className="text-2xl font-bold mt-4">Command Line Arguments</h3>
        <p className="opacity-80">
          Moksha supports <b>two</b> styles for accessing command-line
          arguments.
        </p>

        <p className="opacity-80 mt-2">
          <b>Style 1: Explicit main(argc, argv)</b> (C++ style).{" "}
          <code className="text-primary">argc</code> is the argument count and{" "}
          <code className="text-primary">argv</code> is a null-terminated array
          of C strings (<code className="text-primary">**char</code>). Convert
          each entry with{" "}
          <code className="text-primary">cast&lt;string&gt;</code>.
        </p>
        <CodeBlock
          code={`void main(int argc, **char argv) {
    println("Total arguments received:");
    println(argc);

    for (int i = 0; i < argc; i = i + 1) {
        string arg_str = cast<string>(argv[i]);
        println(arg_str);
    }
}`}
        />
        <p className="opacity-80 text-sm">
          <b>Note:</b> When you declare an explicit{" "}
          <code className="text-primary">main</code>, you cannot mix it with
          top-level statements in the same file.
        </p>

        <p className="opacity-80 mt-4">
          <b>Style 2: Implicit argc / argv</b> (script mode). When a file
          contains only top-level statements (no explicit{" "}
          <code className="text-primary">main</code>), the compiler{" "}
          <b>injects</b> a{" "}
          <code className="text-primary">main(argc, argv)</code> wrapper
          automatically, making <code className="text-primary">argc</code> and{" "}
          <code className="text-primary">argv</code> available directly at the
          top level.
        </p>
        <CodeBlock
          code={`println("--- Script Mode CLI Test ---");

print("Total arguments received: ");
println(argc);

for (int i = 0; i < argc; i = i + 1) {
    print("Arg [");
    print(i);
    print("]: ");
    string arg_str = cast<string>(argv[i]);
    println(arg_str);
}`}
        />
        <p className="opacity-80 text-sm">
          <b>Both styles are equivalent at runtime:</b>{" "}
          <code className="text-primary">argc</code> includes the program name
          as <code className="text-primary">argv[0]</code>, and{" "}
          <code className="text-primary">argv</code> is a{" "}
          <code className="text-primary">**char</code> pointer to an array of C
          strings.
        </p>
      </div>
    ),
  },

  // 10. BUILT-IN FUNCTIONS
  {
    id: "builtins",
    title: "10. Built-in Functions",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Built-in Functions
          </h1>
        </div>
        <p className="opacity-80">
          All built-ins use standalone function-call syntax (not method syntax).
        </p>

        <div className="mt-4 bg-red-500/10 border border-red-500/50 rounded-xl p-6 flex flex-col md:flex-row gap-5 items-start shadow-sm">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <ShieldAlert size={24} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Built-in Shadowing Warning
            </h3>
            <p className="opacity-80 leading-relaxed text-sm md:text-base">
              Moksha <b>bans shadowing of built-in functions and constants</b>.
              You cannot declare a variable, parameter, function, or class
              member whose name collides with a reserved built-in (e.g.,{" "}
              <code className="text-primary">println</code>,{" "}
              <code className="text-primary">print</code>,{" "}
              <code className="text-primary">sqrt</code>,{" "}
              <code className="text-primary">pow</code>,{" "}
              <code className="text-primary">length</code>,{" "}
              <code className="text-primary">push</code>,{" "}
              <code className="text-primary">spawn</code>,{" "}
              <code className="text-primary">join</code>,{" "}
              <code className="text-primary">PI</code>,{" "}
              <code className="text-primary">E</code>,{" "}
              <code className="text-primary">TAU</code>,{" "}
              <code className="text-primary">seed</code>,{" "}
              <code className="text-primary">sleep</code>,{" "}
              <code className="text-primary">cancel</code>,{" "}
              <code className="text-primary">atomic_load</code>,{" "}
              <code className="text-primary">atomic_store</code>,{" "}
              <code className="text-primary">atomic_add</code>,{" "}
              <code className="text-primary">atomic_cas</code>, etc.).
              Attempting to do so produces a compile-time error. A small
              allowlist (<code className="text-primary">push</code>,{" "}
              <code className="text-primary">pop</code>,{" "}
              <code className="text-primary">insert</code>,{" "}
              <code className="text-primary">remove</code>,{" "}
              <code className="text-primary">clear</code>,{" "}
              <code className="text-primary">capacity</code>,{" "}
              <code className="text-primary">resize</code>,{" "}
              <code className="text-primary">extend</code>) exists for methods;
              all other names in the core built-in set are reserved.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Database className="text-primary" /> String Built-ins
        </h3>
        <CodeBlock
          code={`string s = "hello world";

at(s, 0);                        // 'h'
length(s);                        // 11
substring(s, 0, 5);              // "hello"
contains(s, "world");            // true
index(s, "world");               // 6
trim("  hello  ");               // "hello"
replace("a-b-c", "-", ":");     // "a:b:c"
split("a,b,c", ",");            // ["a", "b", "c"]
join(["x", "y", "z"], "-");     // "x-y-z"`}
        />

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Database className="text-primary" /> Char Built-ins
        </h3>
        <CodeBlock
          code={`char c = '5';
is_digit(c);       // true
is_alpha(c);       // false
is_whitespace(c);  // false`}
        />

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Database className="text-primary" /> Math Built-ins
        </h3>
        <CodeBlock
          code={`abs(-5.0);              // 5.0
sqrt(16.0);             // 4.0
floor(3.7);             // 3.0
ceil(3.2);              // 4.0
round(3.6);             // 4.0
sin(0.0);               // 0.0
cos(0.0);               // 1.0
log10(100.0);           // 2.0
log2(8.0);              // 3.0
is_close(sqrt(16.0), 4.0, 1e-6);  // true

// Constants
PI;    // 3.14159...
TAU;   // 6.28318... (2 * PI)
E;     // 2.71828...
NAN;
INF;`}
        />

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Database className="text-primary" /> Array Built-ins
        </h3>
        <CodeBlock
          code={`int[] arr = [1, 2, 3];

length(arr);            // 3
at(arr, 0);             // 1
push(arr, 10);          // arr is now [1, 2, 3, 10]
pop(arr);               // returns 10
insert(arr, 1, 15);     // [1, 15, 2, 3]
remove(arr, 0);         // returns 1
contains(arr, 3);       // true
sort(arr);              // sorted in-place
reverse(arr);           // reversed in-place
clear(arr);             // []`}
        />

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Database className="text-primary" /> Table (Map) Built-ins
        </h3>
        <CodeBlock
          code={`table<string, int> scores = {"Alice": 100, "Bob": 95};

has(scores, "Alice");       // true
length(scores);              // 2
remove(scores, "Bob");
clear(scores);`}
        />

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Database className="text-primary" /> File I/O
        </h3>
        <CodeBlock
          code={`// Low-level
any f = open("test.txt", WRITE | CREATE);
write(f, "data");
close(f);
any data = read(f);
int s = size(f);

// High-level text
writeText("hello.txt", "Hello\\n");
appendText("hello.txt", "World");
string content = readText("hello.txt");
string[] lines = readLines("hello.txt");

// High-level binary
writeBytes("data.bin", byte_array);
appendBytes("data.bin", more_bytes);
int[] bytes = readBytes("data.bin");

// Structured data
writeJson("config.json", obj);
any data = readJson("config.json");
writeCsv("data.csv", rows);
string[][] table = readCsv("data.csv");

// Filesystem
exists("data.txt");             // true
createDir("new_dir");
isDir("new_dir");               // true
copy("src.txt", "dst.txt");
move_file("old.txt", "new.txt");
remove("tmp.txt");
removeDir("dir_to_remove");
string[] files = listDir("some_dir");`}
        />

        <h3 className="text-xl font-bold flex items-center gap-2">
          <Key className="text-primary" /> Manual Memory Management
        </h3>
        <CodeBlock
          code={`unsafe {
    void* ptr = malloc(1024);
    void* zeroed = calloc(10, sizeof(int));
    void* resized = realloc(ptr, 2048);
    free(resized);
}`}
        />
      </div>
    ),
  },

  // 11. COMPILATION
  {
    id: "compilation",
    title: "11. Compilation",
    content: (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="border-b border-border-custom pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Compilation
          </h1>
        </div>
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Terminal className="text-primary" size={24} /> Quick Reference
        </h3>
        <CodeBlock
          code={`# Compile a source file
mokshac source.mox -o output

# Cross-compile
mokshac source.mox -target x86_64-pc-linux-gnu -o output_linux

# Optimize (uses moksha-opt)
mokshac source.mox -o output`}
          language="bash"
        />
        <p className="opacity-80">
          Moksha uses a custom multi-stage compilation pipeline. The compiler is
          invoked via <code className="text-primary">mokshac</code>, with{" "}
          <code className="text-primary">moksha-opt</code> as the optimization
          pass.
        </p>
      </div>
    ),
  },
];
