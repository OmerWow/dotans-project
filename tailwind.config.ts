import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {},
  plugins: [require("@tailwindcss/forms")],
};
export default config;
