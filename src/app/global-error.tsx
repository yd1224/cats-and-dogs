"use client";

export default function GlobalError() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-md text-center">
        <p className="text-xl font-bold mb-4">Something went wrong</p>
      </div>
    </div>
  );
}
