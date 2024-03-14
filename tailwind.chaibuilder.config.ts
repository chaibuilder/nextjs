import { chaiBuilderTailwindConfig } from "@chaibuilder/sdk/tailwind";

export default chaiBuilderTailwindConfig([
  "./custom-blocks/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
]);
