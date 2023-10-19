import React from 'react';

export default function PlaceLand({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20V22H0V20H12ZM12.586 0.686035L20.364 8.46404L18.95 9.88004L17.89 9.52604L15.413 12L21.07 17.657L19.656 19.071L14 13.414L11.596 15.818L11.879 16.95L10.464 18.364L2.686 10.586L4.101 9.17204L5.231 9.45404L11.525 3.16104L11.172 2.10104L12.586 0.686035ZM13.293 4.22204L6.222 11.292L9.757 14.828L16.828 7.75804L13.293 4.22204V4.22204Z"
        fill="url(#paint0_linear_251_147)"
        fillOpacity={active ? '1' : '0.3'}
      />
      <defs>
        <linearGradient
          id="paint0_linear_251_147"
          x1="0.52675"
          y1="5.48167"
          x2="20.9368"
          y2="5.64413"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4947FB" />
          <stop offset="1" stopColor="#2BB3FB" />
        </linearGradient>
      </defs>
    </svg>
  );
}
