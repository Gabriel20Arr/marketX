import { memo } from "react";

const Ellipse6 = (props) => (
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 534 557"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M534 278.5C534 432.311 414.46 557 267 557C119.54 557 0 432.311 0 278.5C0 124.689 119.54 0 267 0C414.46 0 534 124.689 534 278.5Z"
      fill="url(#paint0_linear_16_884)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_16_884"
        x1={456.192}
        y1={76.1612}
        x2={115.407}
        y2={500.24}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.0320065} stopColor="#72E6ED" />
        <stop offset={1} stopColor="#576CBC" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(Ellipse6);
