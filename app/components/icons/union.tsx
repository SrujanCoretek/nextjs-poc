import React from 'react';

export default function Union({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM8.5 16L13 12.5H18.5L14 17.5H7.5L6 12L10.5 7H16.5L8.5 16Z"
        fill="url(#paint0_linear_251_143)"
        fillOpacity={active ? '1' : '0.3'}
      />
      <defs>
        <linearGradient
          id="paint0_linear_251_143"
          x1="0.6"
          y1="5.39998"
          x2="23.8483"
          y2="5.58718"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4947FB" />
          <stop offset="1" stopColor="#2BB3FB" />
        </linearGradient>
      </defs>
    </svg>
  );
}
