import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Mask,
  Path,
  Circle,
  G,
} from "react-native-svg";

const NoResultsSVG = (props) => (
  <Svg
    viewBox="0 0 157 170"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    height={250}
  >
    <Defs>
      <LinearGradient
        id="u"
        x1={126.83}
        x2={126.46}
        y1={161.6}
        y2={155.09}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#ffaa7d" offset={0} />
        <Stop stopColor="#bf272d" offset={1} />
      </LinearGradient>
      <LinearGradient
        id="t"
        x1={125.74}
        x2={127.19}
        y1={165.12}
        y2={160.2}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#576570" offset={0} />
        <Stop stopColor="#343c43" offset={1} />
      </LinearGradient>
      <LinearGradient
        id="s"
        x1={-233.31}
        x2={-259.91}
        y1={-3479.1}
        y2={-3749.2}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#ffaa7d" offset={0} />
        <Stop stopColor="#bf272d" offset={1} />
      </LinearGradient>
      <LinearGradient
        id="r"
        x1={103.6}
        x2={103.6}
        y1={115.75}
        y2={43.72}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} />
        <Stop stopOpacity={0} offset={1} />
      </LinearGradient>
      <LinearGradient
        id="q"
        x1={99.89}
        x2={99.89}
        y1={160.49}
        y2={147.01}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#ffaa7d" offset={0} />
        <Stop stopColor="#ec8365" offset={1} />
      </LinearGradient>
      <LinearGradient
        id="p"
        x1={68.03}
        x2={68.03}
        y1={121.4}
        y2={24.48}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} />
        <Stop stopOpacity={0} offset={1} />
      </LinearGradient>
      <LinearGradient
        id="o"
        x1={80.64}
        x2={51.12}
        y1={131.7}
        y2={104.09}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#ff7900" offset={0} />
        <Stop stopColor="#ff983a" offset={1} />
      </LinearGradient>
      <LinearGradient
        id="n"
        x1={81.77}
        x2={47.04}
        y1={130.14}
        y2={96.78}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} />
        <Stop stopOpacity={0} offset={1} />
      </LinearGradient>
      <LinearGradient
        id="m"
        x1={101.62}
        x2={101.62}
        y1={158.41}
        y2={115.62}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#ff983c" offset={0} />
        <Stop stopColor="#ff7900" offset={1} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={88.75}
        x2={39.12}
        y1={40.35}
        y2={-41.46}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#e6e9ea" offset={0} />
        <Stop stopColor="#e6e9ea" stopOpacity={0} offset={1} />
      </LinearGradient>
      <LinearGradient
        id="a"
        x1={110.79}
        x2={110.79}
        y1={59.52}
        y2={-40.89}
        gradientTransform="matrix(1 0 0 -1 0 172)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#cfd3d6" offset={0} />
        <Stop stopColor="#cfd3d6" stopOpacity={0} offset={1} />
      </LinearGradient>
      <Mask
        id="v"
        x={-29.2}
        y={-4.5}
        width={221.52}
        height={250.51}
        maskUnits="userSpaceOnUse"
      >
        <Path
          d="M157 91.5c0 43.35-35.14 78.5-78.5 78.5S0 134.85 0 91.5s78.15-96 121.5-96 35.5 52.65 35.5 96z"
          fill="#fff2e6"
        />
      </Mask>
    </Defs>
    <Circle cx={78.5} cy={91.5} r={78.5} fill="#fff2e6" />
    <G mask="url(#v)">
      <Path
        d="M127.36 13.71s.45-3.07.54-3.45c.09-.37-1.71.37-2.15 1.53s1.62 1.92 1.62 1.92z"
        fill="url(#u)"
      />
      <Path
        d="m138.8 2.24-25.01 7.61c-.76.26-1.15 1.32-.88 2.44s1.1 1.88 1.88 1.77l.1-.02 25.62-4.65-1.71-7.15z"
        fill="url(#t)"
      />
      <Path
        d="M140.38 9.43c.82-.2 1.1-1.96.63-3.94s-1.52-3.42-2.34-3.22-1.1 1.96-.63 3.94 1.52 3.42 2.34 3.22z"
        fill="#0e2332"
      />
      <Path
        d="M122.86 13.86s-.01-5.94 1.04-7.08 3.46 6.93 3.46 6.93-1.78 1.42-4.5.14z"
        fill="url(#s)"
      />
      <Path
        d="M49.14 64.48c-.26.03-5.8 8.07-6.09 8.68-.28.6 9.4-5.15 9.69-5.41s-.06-3.73-3.6-3.27z"
        fill="#ffaa7e"
      />
      <Path
        d="M50.3 68.47c-.23.16-1.65 2.8-1.38 3.36.28.57 3.64-3.43 4.06-4.57s-2.69 1.21-2.69 1.21z"
        fill="#ed8667"
      />
      <Path
        d="M110 127.27s.08 2.12 2.41 2.4c2.02.24 5.96-3.91 9.57 1.7 0 0-16.22 4.57-16.32 4.33-1.51-3.7-.89-8.05-.89-8.05l5.23-.38z"
        fill="#0e2332"
      />
      <Path
        d="M132.24 85.98c-.75 4-19.13 30.95-22.22 41.29-.59.46-1.27.78-2 .92-1.11.22-2.25.03-3.23-.54 0 0 1.59-4.73 2.25-18.44.85-17.74 13.62-19.91 7.26-23.48-6.36-3.56-20.44-2.83-29.27-12.99-8.83-10.17 11.47-17.17 15.85-16.45 0 0 1.12.92 2.93 2.36 4.47 3.55 13.16 10.23 19.63 13.91 9.09 5.17 9.3 10.79 8.81 13.42z"
        fill="#273947"
      />
      <Path
        d="M117.21 98.3c-3.6 6.9-9.8 20.81-9.21 29.89-1.11.22-2.25.03-3.23-.54 0 0 1.59-4.73 2.25-18.44.86-17.74 13.63-19.91 7.27-23.47s-20.44-2.83-29.27-12.99c-8.83-10.17 11.47-17.17 15.85-16.45 0 0 1.12.92 2.93 2.36.1 1.5-.2 3.57-2.29 4.56-3.49 1.66-5.69 6.21-4.36 8.27 1.34 2.06 24.45 6.26 26.71 10.45s-3.04 9.46-6.64 16.36z"
        fill="url(#r)"
        opacity={0.2}
        style={{
          isolation: "isolate",
        }}
      />
      <Path
        d="M100.94 20.64s.05 7.33.07 8.39l-9.31 2.59s3.24-10.15 4.1-13.01c.86-2.87 5.14 2.04 5.14 2.04z"
        fill="#e17753"
      />
      <Path d="M103.86 14.29s2.2-.74 2-3.18-14.9-2.95-14.62-.31.97 2.76 0 3.28-.04 3.57 3.01 5.29 9.61-5.08 9.61-5.08z" />
      <Path
        d="M102.85 11.51c.92.64 3.67 3.97 3.99 7.04 0 0-1.02.45-1.94.39 0 0 .75 2.55.08 5.03-.08.3-.26.57-.52.76a1.3 1.3 0 0 1-.87.26c-2.23-.11-6.26-2.4-8.66-4.62-2.86-2.64-2.1-3.55-.9-3.66 1.2-.11 3.06 1.19 3.06 1.19s-.08-2.66-1.31-4.46c0 .02 4.78.7 7.09-1.94z"
        fill="url(#q)"
      />
      <Path
        d="M41.7 146.62s.08 2.12 2.41 2.4c2.02.24 5.96-3.91 9.57 1.7 0 0-16.22 4.57-16.32 4.33-1.51-3.7-.65-8.5-.65-8.5l4.99.07z"
        fill="#0e2332"
      />
      <Path
        d="m98.39 57.8-.17.51c-.32.95-1.06 3.14-2.1 5.98-1.5 4.09-3.63 9.53-6 14.56-4.59 9.74-8.41 16.5-9.89 21.33-1.48 4.84-1.84 8.96-10.74 16.35-8.9 7.4-24.23 22.97-27.63 30.93 0 0-.64.18-1.83.06-1.16-.15-2.28-.48-3.33-.98 0 0 7.49-27.19 15.12-36.67s13.47-7.03 15.26-18.12-1.51-28.88 14.41-38.86c6.53-4.1 11.09-1.95 13.81.66 1.26 1.22 2.3 2.66 3.07 4.24z"
        fill="#273947"
      />
      <Path
        d="M99.33 63.45c0 .15-1.13.53-3.21.84-2 .28-4.02.43-6.04.44-5.86.07-9.96 1.14-10.6 3.84s-1.91 24.03-8.69 33.14c-6.46 8.67-25.86 23.65-30.74 45.81-1.16-.15-2.28-.48-3.33-.98 0 0 7.49-27.19 15.12-36.67s13.47-7.03 15.26-18.12-1.52-28.88 14.4-38.86c6.53-4.1 11.09-1.95 13.81.66 1.15 1.47 2.12 3.06 2.9 4.76.77 1.73 1.19 3.46 1.11 5.14z"
        fill="url(#p)"
        opacity={0.2}
        style={{
          isolation: "isolate",
        }}
      />
      <Path
        d="M92.11 29.44s.92-4.59 1.25-4.77c.34-.18 8.39.62 8.92.85s1.13 3.25 1.13 3.25l-11.31.66z"
        fill="#e2e2e2"
      />
      <Path
        d="M94.44 34.92c-2.65 5.29-7.85 9.58-7.85 9.58s-9.22 2.89-13.1 5.55c-3.87 2.65-20.76 17.71-20.76 17.71a9.956 9.956 0 0 1-2.28-1.68c-.5-.48-.94-1.01-1.32-1.59 3.04-4.76 20.14-24.11 22.61-25.53s23.73-12.52 23.73-12.52c1.03 2.79.33 5.77-1.03 8.48z"
        fill="url(#o)"
      />
      <Path
        d="M94.44 34.92c-2.65 5.29-7.85 9.58-7.85 9.58s-9.22 2.89-13.1 5.55c-3.87 2.65-20.76 17.71-20.76 17.71a9.956 9.956 0 0 1-2.28-1.68c4.66-5.1 18.53-20.15 22.11-22.19 4.3-2.47 18.11-9.53 18.11-9.53 1.27.1 2.53.29 3.77.57z"
        fill="url(#n)"
        opacity={0.05}
        style={{
          isolation: "isolate",
        }}
      />
      <Path
        d="M125.76 43.2s-5.54 3.4-16.58.59c-5.6-1.43-6.95-2.45-6.95-2.45s2.32 12.44.29 17.77c-2.26 5.94-12.05 6.02-27.24-1.16 0 0 .16-.25.45-.72 2.81-4.46 7.71-19.61 11.07-24.11 4.34-5.83 9.29-8.57 16.25-6.19 6.03 2.06 12.22 4.24 13.99 5.07 1.76.83 4.34-15.74 5.82-18.15 0 0 3.29-.5 4.5-.14 0 0 2.14 13.49-1.6 29.48z"
        fill="url(#m)"
      />
      <Path
        d="M144.76 157.17c-7.92 6.36 5.18 8.09-9.88 24.1-9.04 9.6-42.51 41.08-67.86 64.75H-29.2V173.6c46.29-13.09 167.04-47.25 206.81-58.18 6.28-1.72 10.53-2.87 12.17-3.26 1.55-.37 2.34-.23 2.52.34 0 .02.01.04.02.06v.05c.81 5.15-40.53 38.94-47.55 44.57z"
        fill="url(#c)"
      />
      <Path
        d="M144.77 157.17c-7.92 6.36 5.18 8.09-9.89 24.09-9.04 9.6-42.51 41.08-67.86 64.75H29.25c.53-.74.79-1.14.71-1.1 1.5-1 94.43-64.91 97.64-69.68 3.25-4.84-25.58-1.8-25.01-3.51s68.64-39.92 70.84-42c13.71-12.99 14.69-13.51 18.87-17.24 0 .02.01.04.02.06v.05c.81 5.16-40.53 38.94-47.55 44.58z"
        fill="url(#a)"
      />
    </G>
  </Svg>
);

export default NoResultsSVG;
