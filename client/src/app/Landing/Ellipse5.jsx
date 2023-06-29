import { memo } from "react";

const Ellipse5 = (props) => (
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 534 557"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse
      cx={267}
      cy={278.5}
      rx={267}
      ry={278.5}
      fill="url(#paint0_linear_16_883)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_16_883"
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

export default memo(Ellipse5);
