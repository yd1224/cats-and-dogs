import React from "react";

export interface LabelProps {
  text: string;
  color: string;
  children: React.ReactNode;
}

export default function Label({ text, color, children }: LabelProps) {
  const colorClasses: { [key: string]: string } = {
    red: "bg-red-200 text-red-400",
    blue: "bg-blue-200 text-blue-400",
    orange: "bg-orange-200 text-orange-400",
    green: "bg-green-200 text-green-400",
    pink: "bg-pink-200 text-pink-400",
  };

  const colorClass = colorClasses[color] || "bg-gray-800 text-gray-200";

  return (
    <p className="text-gray-600 mb-2">
      <span className={`mr-1 font-medium px-2 py-1 rounded-lg ${colorClass}`}>
        {text}
      </span>
      {children}
    </p>
  );
}
