import React from "react";

export default function Gallery({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
        {children}
      </div>
    </div>
  );
}
