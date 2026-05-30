import React from "react";

const MainContent = ({ content }) => {
  return (
    <main className="flex-1 p-6 md:p-12 lg:py-16 lg:px-20 overflow-y-auto">
      <article className="max-w-3xl mx-auto">{content}</article>
    </main>
  );
};

export default MainContent;
