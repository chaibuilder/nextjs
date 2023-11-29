"use client";

import { get } from "lodash";
import Script from "next/script";

export const StylesAndFonts = ({
  project,
  styles,
  classPrefix = "c-",
}: any) => {
  const headingFont = get(project, "brandingOptions.headingFont", "");
  const bodyFont = get(project, "brandingOptions.bodyFont", "");
  const favicon = get(project, "favicon", "");

  const isDifferentFont = headingFont !== bodyFont;

  return (
    <>
      {favicon && <link rel="icon" href={favicon} sizes="any" />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin={""}
      />
      <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      <style jsx global>
        {`
          @import url("https://fonts.googleapis.com/css2?family=${headingFont}:wght@300;400;500;600;700;800;900&display=swap");
          ${isDifferentFont
            ? `@import url("https://fonts.googleapis.com/css2?family=${bodyFont}:wght@300;400;500;600;700;800;900&display=swap");`
            : ""}

          body {
          }
          .${classPrefix.replace("-", "")} {
            visibility: visible !important;
          }
          ${styles}
        `}
      </style>
      <Script
        src="https://unpkg.com/aos@next/dist/aos.js"
        onLoad={() => {
          // @ts-ignore
          AOS.init({ once: true, easing: "ease-in-out" });
        }}
      />
    </>
  );
};
