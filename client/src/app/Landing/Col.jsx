import { memo } from "react";

const Col = (props) => (
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 30 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_15_423)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H30V31.25H0V0Z"
        fill="#FFE800"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 15.625H30V31.25H0V15.625Z"
        fill="#00148E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 23.4375H30V31.25H0V23.4375Z"
        fill="#DA0010"
      />
    </g>
    <defs>
      <clipPath id="clip0_15_423">
        <rect width={30} height={31.25} rx={15} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default memo(Col);
