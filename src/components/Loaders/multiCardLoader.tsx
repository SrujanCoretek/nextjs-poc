import React from "react";

export default function MultiCardLoader() {
  return (
    <div className="rounded-3xl">
      <div className="bg-gray-400 h-80 p-3 overflow-hidden animate-pulse w-full rounded-tr-3xl rounded-tl-3xl"></div>
      <div className="py-3">
        <div className="grid mt-2">
          <div className="h-8 w-full bg-gray-400 rounded animate-pulse"></div>
        </div>
        <div className="grid mt-2">
          <div className="h-8 w-full bg-gray-400 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="py-3">
        <div className="grid mt-2">
          <div className="h-8 w-full bg-gray-400 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="py-3">
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="h-8 w-full bg-gray-400 rounded animate-pulse"></div>
          <div className="h-8 w-full bg-gray-400 rounded animate-pulse"></div>
          <div className="h-8 w-full bg-gray-400 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
