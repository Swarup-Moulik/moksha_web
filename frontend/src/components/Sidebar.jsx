import React, { useState } from "react";
import { Search } from "lucide-react";

const Sidebar = ({ docSections, activeSection, setActiveSection }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = docSections.filter((section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <aside className="hidden md:flex flex-col w-72 p-8 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar bg-background z-10">
      <h2 className="text-xs font-extrabold uppercase tracking-widest text-primary mb-4 opacity-90">
        Handbook
      </h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          type="text"
          placeholder="Search docs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface border border-border-custom/50 rounded-lg py-2 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-zinc-500"
        />
      </div>

      {/* Navigation List */}
      <nav className="flex flex-col border-l border-border-custom/30">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`text-left px-5 py-3 transition-all duration-200 text-sm font-semibold -ml-[1px] border-l-2 ${
                  isActive
                    ? "border-primary bg-surface text-primary"
                    : "border-transparent text-foreground opacity-60 hover:opacity-100 hover:border-border-custom hover:bg-surface/50"
                }`}
              >
                {section.title}
              </button>
            );
          })
        ) : (
          <p className="text-sm text-zinc-500 px-5 mt-4">No results found.</p>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
