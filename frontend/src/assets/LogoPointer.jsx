import React from "react";

const LogoPointer = ({ className = "w-10 h-10 text-primary" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Memory Nodes */}
      <circle cx="20" cy="80" r="5" fill="currentColor" />
      <circle cx="20" cy="35" r="5" fill="currentColor" />
      <circle cx="50" cy="65" r="5" fill="currentColor" />
      <circle cx="80" cy="35" r="5" fill="currentColor" />

      {/* Linked List / 'M' Structure */}
      <path d="M 20 75 L 20 40" />
      <path d="M 23 38 L 47 62" />
      <path d="M 53 62 L 77 38" />

      {/* The "Broken" Pointer / Escaping the Stack */}
      <path d="M 80 30 L 80 15" strokeDasharray="4 4" />
      <path d="M 70 25 L 80 15 L 90 25" />
    </svg>
  );
};

export default LogoPointer;
