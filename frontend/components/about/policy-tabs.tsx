"use client";

import { useState } from "react";

interface PolicyTab {
  label: string;
  points: string[];
}

interface PolicyTabsProps {
  tabs: PolicyTab[];
}

export default function PolicyTabs({ tabs }: PolicyTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-2 w-fit mx-auto">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeIndex === index
                ? "bg-[#2d6a4f] text-white"
                : "bg-transparent text-primary hover:bg-gray-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`h-4 w-4 shrink-0 ${activeIndex === index ? "text-white" : "text-rose-500"}`}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.545 3.75 3.75 0 0 1 3.255 3.717Z"
                clipRule="evenodd"
              />
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <ul className="space-y-5">
          {tabs[activeIndex]?.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-primary">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2d6a4f]">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    d="M5 10.5L8.2 13.5L15 6.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
