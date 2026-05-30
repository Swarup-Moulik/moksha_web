import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import { docSections } from "../data/docsData";

function Documentation() {
  const [activeSection, setActiveSection] = useState(docSections[0].id);

  return (
    <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
      <Sidebar
        docSections={docSections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* MOBILE DROPDOWN NAVIGATION */}
      <div className="md:hidden p-5 border-b-2 border-border-custom bg-surface sticky top-16 z-20 shadow-sm">
        <select
          className="w-full bg-background text-foreground font-semibold border border-border-custom rounded-lg p-3 outline-none focus:border-primary transition-colors"
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
        >
          {docSections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>
      </div>

      <MainContent
        content={docSections.find((s) => s.id === activeSection)?.content}
      />
    </div>
  );
}

export default Documentation;
