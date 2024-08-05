import type { Config } from "tailwindcss";

const config: Config = {
  daisyui: {
    themes: ["fantasy"],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#112D4E',
      }
    },
  },
  plugins: [require('daisyui')],
};
export default config;
