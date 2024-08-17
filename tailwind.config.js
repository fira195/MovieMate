/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#E69616",
        accent: "#005248",
        thrid: "#DFE0DF",
      },
      backgroundImage: {
        gradient: "linear-gradient(to top, #005248 , #E69616)",
        "gradient-2":
          "radial-gradient(circle, #005248, #216b43, #57822f, #999111, #e69616);",
      },
      boxShadow: {
        "my": "0 0px 2px 2px #005248",
      },
    },
  },
  plugins: [],
};
/* colors: {
        'main': '#E69616',
        'accent': '#005248',
        'thrid': '#DFE0DF'
      }, */
