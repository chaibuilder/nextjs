import { registerChaiDataProvider } from "@chaibuilder/runtime";

registerChaiDataProvider("home", {
  name: "Home",
  description: "Home page",
  dataFn: async () => ({
    heading: "Welcome to Chai Builder 🚀",
    description:
      "Chai Builder is a tool to build chai tests. It is built on top of Chai and Chai Builder Blocks.",
  }),
});
